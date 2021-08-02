const { middlewareFactory } = require('../infrastructure')

const getCredential = ({
  Logger,
  credentialRepository
}) => event => {
  return credentialRepository.bootstrap()
    .then(() => event.pathParameters.id)
    .then(credentialRepository.findCredential)
    .then(dbResponse => {
      if (dbResponse) {
        return event.ok(dbResponse)
      }

      Logger.info(`not found credentials with id ${event.pathParameters.id}`)
      return event.notFound({
        message: `Does not exist a credential with id ${event.pathParameters.id}`
      })
    })
}

const postCredential = ({
  Logger,
  credentialRepository,
  credentialService,
  payloadMethods
}) => event => {
  const { body } = event

  return credentialRepository.bootstrap()
    .tap(() => {
      Logger.info(`Oraculo Payload - ${JSON.stringify(body)}`)
    })
    .tap(() => credentialRepository.findOrCreateBrand(body))
    .then(() => credentialRepository.findAllUnits(body))
    .then(results => credentialService.unifyUnitInitials(body.unidades, results))
    .then(credentialRepository.bulkCreateUnit)
    .then(() => payloadMethods.credentialPayload(body))
    .tap(payload => {
      Logger.info(`Payload to insert into Integration - ${JSON.stringify(payload)}`)
    })
    .then(credentialRepository.transactionCreateRoundTrip(body))
    .tap(() => {
      Logger.info('Transaction commited')
    })
    .then(event.created)
}

const putCredential = ({
  Logger,
  credentialRepository,
  credentialService,
  payloadMethods
}) => event => {
  const { pathParameters: { id }, body } = event
  Logger.info(`Oraculo Payload to Put - Id ${id}`)

  return credentialRepository.bootstrap()
    .tap(() => {
      Logger.info(`Oraculo Payload - ${JSON.stringify(body)}`)
    })
    .tap(() => credentialRepository.updateBrand(body))
    .then(() => credentialRepository.findAllUnits(body))
    .then(results => credentialService.unifyUnitInitials(body.unidades, results))
    .then(credentialRepository.bulkUpdateUnit)
    .then(() => credentialRepository.findCredential(id))
    .then(credentialService.mountUnitsToUpdate(body))
    .then(mountedUnits => Promise.all([payloadMethods.credentialPayload(body), mountedUnits]))
    .then(credentialRepository.updateCredential(id))
    .then(event.ok)
    .catch(err => {
      const message = `Does not possible to edit credential with ${id}`

      Logger.error(`${message} - ${err}`)
      event.notFound({ message })
    })
}

const deleteCredential = ({
  Logger,
  credentialRepository
}) => event => {
  const { id } = event.pathParameters
  Logger.info(`Oraculo Payload - Id ${id}`)
  return credentialRepository.bootstrap()
    .then(() => credentialRepository.deleteCredential({ id }))
    .tap(count => {
      Logger.info(`Affecteds - ${JSON.stringify(count)}`)
    })
    .then(event.ok)
}

const filterCredential = ({
  Logger,
  credentialRepository,
  cacheClient,
  credentialService
}) => event => {
  const {
    ansId,
    marcaId,
    unidadeId,
    tipoExameId,
    codigoPrestador
  } = event.queryStringParameters || {}

  Logger.info(`Oraculo Payload - Filter ${JSON.stringify(event.queryStringParameters)}`)

  const fetchCredentialsFromDb = () => credentialRepository.bootstrap()
    .then(() => credentialRepository.filterCredential({
      ans_id: ansId ? ansId.padStart(6, '0') : ansId,
      marca_id: marcaId,
      unidade_id: unidadeId,
      tipo_exame_id: tipoExameId,
      codigo_prestador: codigoPrestador
    }))
    .tap((credentials) => cacheClient.setCredentials(
      event.queryStringParameters || {},
      credentials.map(c => c.toJSON())
    ))
    .tap(credentials => {
      Logger.info(`Credentials fetched from the database - ${credentials.length}`)
    })

  return cacheClient.getCredentials(
    event.queryStringParameters || {}
  )
    .then((cacheList) => cacheList || fetchCredentialsFromDb())
    .then(credentials => credentials.sort(credentialService.sortCredential))
    .then(event.ok)
}

const getExamTypes = ({
  Logger,
  credentialRepository
}) => event => {
  return credentialRepository.bootstrap()
    .then(credentialRepository.findExamTypes)
    .then(dbResponse => {
      if (dbResponse) {
        return event.ok(dbResponse)
      }

      Logger.info('not found exam types')
      return event.notFound({
        message: 'Does not exist exam types'
      })
    })
}

const getAnsOperatorsWithCredential = ({
  Logger,
  credentialRepository,
  credentialService
}) => event => {
  return credentialRepository.bootstrap()
    .then(() => credentialRepository.filterCredential({}))
    .then(dbResponse => {
      if (dbResponse) {
        const ansOperatorList = dbResponse.map(credential => {
          return credential.ans
        })
        const uniqAnsOperators = credentialService.removeDuplicatedItems({ list: ansOperatorList, attr: 'id' })
        return event.ok(uniqAnsOperators)
      }

      Logger.info('Ans Operators with credential not found')
      return event.notFound({
        message: 'There isnt Ans Operators with credential registered'
      })
    })
}

const getBrandsByAnsOperator = ({
  Logger,
  credentialRepository,
  credentialService
}) => event => {
  const { id } = event.pathParameters

  if (!id) return event.badRequest({ message: 'AnsId is required' })

  return credentialRepository.bootstrap()
    .then(() => credentialRepository.filterCredential({
      ans_id: id
    }))
    .then(dbResponse => {
      if (dbResponse) {
        const brandList = dbResponse.map(credential => {
          return credential.marca
        })
        const uniqBrands = credentialService.removeDuplicatedItems({ list: brandList, attr: 'id' })
        return event.ok(uniqBrands)
      }

      Logger.info('Brands not found')
      return event.notFound({
        message: 'There isnt Brands for the Ans Operator informed'
      })
    })
}

const getCredentialHandler = middlewareFactory(getCredential)
const putCredentialHandler = middlewareFactory(putCredential)
const filterCredentialHandler = middlewareFactory(filterCredential)
const postCredentialHandler = middlewareFactory(postCredential)
const deleteCredentialHandler = middlewareFactory(deleteCredential)
const getExamTypesHandler = middlewareFactory(getExamTypes)
const getAnsOperatorsWithCredentialHandler = middlewareFactory(getAnsOperatorsWithCredential)
const getBrandsByAnsOperatorHandler = middlewareFactory(getBrandsByAnsOperator)

module.exports = {
  getExamTypesHandler,
  getCredentialHandler,
  putCredentialHandler,
  filterCredentialHandler,
  postCredentialHandler,
  deleteCredentialHandler,
  getAnsOperatorsWithCredentialHandler,
  getBrandsByAnsOperatorHandler
}
