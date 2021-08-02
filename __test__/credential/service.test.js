/* eslint-disable no-undef */
const credentialService = require('../../src/credential/service')
const {
  dataProviderInitialSource,
  unitsToUpdateResponse,
  credentials,
  sortedCredentials
} = require('./mock/service')
const { someUnits } = require('./mock/repository')
const { fullFilled } = require('./mock/payload')

const mockCockpitRequest = () => ({
  get: async () =>
    await new Promise(resolve => resolve(dataProviderInitialSource))
})

const sutFactory = () => {
  const requestStub = mockCockpitRequest()
  const credentialServiceFactory = credentialService({
    request: requestStub
  })

  return {
    sut: credentialServiceFactory,
    requestStub
  }
}

describe('Cockpit Credential Service', () => {
  it('should unifyUnitInitials', async () => {
    const { sut, requestStub } = sutFactory()

    const spyRequest = jest.spyOn(requestStub, 'get')

    const unifiedUnitInitial = await sut.unifyUnitInitials(fullFilled.unidades, someUnits)

    expect(unifiedUnitInitial)
      .toStrictEqual([{ id: 697, nome: 'ALTO DE PINHEIROS', sigla: 'DPI' }])

    expect(spyRequest).toHaveBeenCalledTimes(1)
  })

  it('should mountUnitsToUpdate', async () => {
    const { sut } = sutFactory()

    const unitsMock = {
      unidades: [{
        createdAt: '2020-12-04T20:44:06.852Z',
        updatedAt: '2020-12-04T20:44:06.852Z',
        id: 700,
        nome: 'BRAZ LEME',
        sigla: 'DBZ',
        ativo: true
      }]
    }

    const unitsToUpdate = sut.mountUnitsToUpdate(fullFilled)(unitsMock)

    expect(unitsToUpdate).toStrictEqual(unitsToUpdateResponse)
  })

  it('should sort credentials by units name', () => {
    const { sut } = sutFactory()

    const sortedSut = credentials.sort(sut.sortCredential)

    expect(sortedSut).toStrictEqual(sortedCredentials)
  })
})
