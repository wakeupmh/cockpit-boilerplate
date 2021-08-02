const { Logger, request, cockpitDb, redis } = require('../infrastructure')

const { credentialSchema } = require('./schema')

const {
  getExamTypesHandler,
  getCredentialHandler,
  putCredentialHandler,
  filterCredentialHandler,
  postCredentialHandler,
  deleteCredentialHandler,
  getAnsOperatorsWithCredentialHandler,
  getBrandsByAnsOperatorHandler
} = require('./handler')

const payloadMethods = require('./payload')
const credentialRepositoryFactory = require('./repository')
const credentialCacheFactory = require('./cache')
const credentialServiceFactory = require('./service')

const getExamTypes = getExamTypesHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  payloadMethods
})

const getCredential = getCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  payloadMethods
})

const filterCredential = filterCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({
    request
  }),
  cacheClient: credentialCacheFactory({ redis, Logger })
})

const putCredential = putCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({
    request
  }),
  payloadMethods,
  schema: credentialSchema
})

const postCredential = postCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({
    request
  }),
  payloadMethods,
  schema: credentialSchema
})

const deleteCredential = deleteCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({
    request
  })
})

const getAnsOperatorsWithCredential = getAnsOperatorsWithCredentialHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({
    request
  })
})

const getBrandsByAnsOperator = getBrandsByAnsOperatorHandler({
  Logger,
  credentialRepository: credentialRepositoryFactory({ cockpitDb }),
  credentialService: credentialServiceFactory({ request })
})

module.exports = {
  getExamTypes,
  getCredential,
  putCredential,
  filterCredential,
  postCredential,
  deleteCredential,
  getAnsOperatorsWithCredential,
  getBrandsByAnsOperator
}
