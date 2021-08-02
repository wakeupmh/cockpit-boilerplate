/* eslint-disable no-undef */
const Bluebird = require('bluebird')
const handlerMethods = require('../../src/credential/handler')
const payloadMethods = require('../../src/credential/payload')
const { credential, credentialsWithoutCache } = require('./mock/repository')
const { fullFilled, unitsToAdd } = require('./mock/payload')
const { credentialSchema } = require('../../src/credential/schema')

const sutFactory = () => {
  const Logger = {
    info: jest.fn(),
    error: jest.fn()
  }

  const credentialRepository = {
    bootstrap: () => Bluebird.resolve(),
    findCredential: jest.fn(),
    filterCredential: jest.fn(),
    deleteCredential: jest.fn(),
    findExamTypes: jest.fn(),
    findOrCreateBrand: jest.fn(),
    findAllUnits: jest.fn(),
    bulkCreateUnit: jest.fn(),
    updateCredential: jest.fn(),
    updateBrand: jest.fn(),
    transactionCreateRoundTrip: jest.fn(),
    bulkUpdateUnit: jest.fn()
  }

  const cacheClient = {
    getCredentials: jest.fn(),
    setCredentials: jest.fn()
  }

  const credentialService = {
    sortCredential: jest.fn(credential => credential),
    unifyUnitInitials: jest.fn(),
    mountUnitsToUpdate: jest.fn()
  }

  return {
    sut: handlerMethods,
    cacheClient,
    credentialRepository,
    credentialService,
    Logger
  }
}

describe('Cockpit Credential handler', () => {
  it('Should return a list of exam types', async () => {
    const { sut, credentialRepository, Logger } = sutFactory()

    credentialRepository.findExamTypes.mockResolvedValueOnce([])

    const getExamTypes = sut.getExamTypesHandler({
      Logger,
      credentialRepository
    })

    const result = await getExamTypes(
      { body: '{}' },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(credentialRepository.findExamTypes).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({
      statusCode: 200,
      body: '[]',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  })

  it('Should return a exam types not found message', async () => {
    const { sut, credentialRepository, Logger } = sutFactory()

    credentialRepository.findExamTypes.mockReturnValueOnce(null)

    const getExamTypes = sut.getExamTypesHandler({
      Logger,
      credentialRepository
    })

    const result = await getExamTypes(
      {
        body: '{}',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(credentialRepository.findExamTypes).toHaveBeenCalledTimes(1)
    expect(Logger.info).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      statusCode: 404,
      body: '{"message":"Does not exist exam types"}',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  })

  it('Should return a credential when exists in database', async () => {
    const { sut, credentialRepository, Logger } = sutFactory()

    credentialRepository.findCredential.mockReturnValueOnce({})

    const getCredential = sut.getCredentialHandler({
      Logger,
      credentialRepository,
      payloadMethods
    })

    const result = await getCredential(
      {
        body: '{}',
        pathParameters: { id: '1' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(credentialRepository.findCredential).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual({
      statusCode: 200,
      body: '{}',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  })

  it('Should return a credential not found message', async () => {
    const { sut, credentialRepository, Logger } = sutFactory()
    credentialRepository.findCredential.mockReturnValueOnce(null)
    const getCredential = sut.getCredentialHandler({
      Logger,
      credentialRepository,
      payloadMethods
    })

    const result = await getCredential(
      {
        body: '{}',
        pathParameters: { id: '1' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(credentialRepository.findCredential).toHaveBeenCalledTimes(1)
    expect(Logger.info).toHaveBeenCalledTimes(1)
    expect(result).toEqual({
      statusCode: 404,
      body: '{"message":"Does not exist a credential with id 1"}',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  })

  it('Should delete a credential', async () => {
    const { sut, credentialRepository, Logger } = sutFactory()

    credentialRepository.deleteCredential.mockReturnValueOnce({ count: 1 })

    const deleteCredential = sut.deleteCredentialHandler({
      Logger,
      credentialRepository
    })

    const result = await deleteCredential(
      { body: '{}', pathParameters: { id: '1' } },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(result).toStrictEqual({
      statusCode: 200,
      body: '{"count":1}',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    expect(Logger.info).toHaveBeenCalledTimes(2)
    expect(credentialRepository.deleteCredential).toHaveBeenCalledTimes(1)
  })

  it('Should return a list of database credentials when there is no cache', async () => {
    const {
      sut,
      credentialRepository,
      cacheClient,
      credentialService,
      Logger
    } = sutFactory()

    cacheClient.getCredentials.mockResolvedValueOnce(null)
    credentialRepository.filterCredential.mockReturnValueOnce([credential])

    const filterCredential = sut.filterCredentialHandler({
      Logger,
      cacheClient,
      credentialService,
      credentialRepository,
      payloadMethods
    })

    const result = await filterCredential(
      {
        body: '{}',
        pathParameters: { id: '1' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(result).toStrictEqual(credentialsWithoutCache)
    expect(cacheClient.getCredentials).toHaveBeenCalledTimes(1)
    expect(credentialRepository.filterCredential).toHaveBeenCalledTimes(1)
  })

  it('Should create a new credential in database', async () => {
    const {
      sut,
      credentialRepository,
      cacheClient,
      credentialService,
      Logger
    } = sutFactory()

    const units = unitsToAdd

    credentialRepository.findAllUnits.mockResolvedValueOnce(units)

    const postCredential = await sut.postCredentialHandler({
      Logger,
      cacheClient,
      credentialService,
      credentialRepository,
      payloadMethods,
      schema: credentialSchema
    })

    const result = await postCredential(
      { body: JSON.stringify(fullFilled) },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(credentialRepository.findOrCreateBrand).toHaveBeenCalledWith(fullFilled)
    expect(credentialRepository.findAllUnits).toHaveBeenCalledWith(fullFilled)
    expect(credentialService.unifyUnitInitials).toHaveBeenCalledWith(
      fullFilled.unidades,
      units
    )
    expect(credentialRepository.transactionCreateRoundTrip)
      .toHaveBeenCalledWith(fullFilled)

    expect(result).toStrictEqual({
      statusCode: 201,
      body: JSON.stringify(
        payloadMethods.credentialPayload(fullFilled)
      ),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
  })

  it('Should update a credential', async () => {
    const {
      sut,
      credentialRepository,
      cacheClient,
      credentialService,
      Logger
    } = sutFactory()

    const putCredential = sut.putCredentialHandler({
      Logger,
      cacheClient,
      credentialService,
      credentialRepository,
      payloadMethods,
      schema: credentialSchema
    })

    const result = await putCredential(
      {
        body: JSON.stringify(fullFilled),
        pathParameters: { id: '1' },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify([payloadMethods.credentialPayload(fullFilled), null]),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    expect(credentialRepository.updateBrand).toHaveBeenCalledTimes(1)
    expect(credentialRepository.findAllUnits).toHaveBeenCalledTimes(1)
    expect(credentialService.unifyUnitInitials).toHaveBeenCalledTimes(1)
    expect(credentialRepository.bulkUpdateUnit).toHaveBeenCalledTimes(1)
    expect(credentialRepository.findCredential).toHaveBeenCalledTimes(1)
    expect(credentialService.mountUnitsToUpdate).toHaveBeenCalledTimes(1)
    expect(credentialRepository.updateCredential).toHaveBeenCalledTimes(1)
    expect(Logger.info).toHaveBeenCalledTimes(2)
  })

  it('Should not update a credential', async () => {
    const {
      sut,
      credentialRepository,
      cacheClient,
      credentialService,
      Logger
    } = sutFactory()

    jest.spyOn(credentialRepository, 'bootstrap')
      .mockImplementationOnce(() => Bluebird.reject(new Error()))

    const putCredential = sut.putCredentialHandler({
      Logger,
      cacheClient,
      credentialService,
      credentialRepository,
      payloadMethods,
      schema: credentialSchema
    })

    await putCredential(
      { body: JSON.stringify(fullFilled), pathParameters: { id: '1' } },
      { callbackWaitsForEmptyEventLoop: false }
    )

    expect(Logger.error).toHaveBeenCalledTimes(1)
    expect(credentialRepository.updateBrand).not.toHaveBeenCalled()
    expect(credentialRepository.findAllUnits).not.toHaveBeenCalled()
    expect(credentialService.unifyUnitInitials).not.toHaveBeenCalled()
    expect(credentialRepository.bulkUpdateUnit).not.toHaveBeenCalled()
    expect(credentialRepository.findCredential).not.toHaveBeenCalled()
  })
})
