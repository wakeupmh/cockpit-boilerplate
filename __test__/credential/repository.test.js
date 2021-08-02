/* eslint-disable no-undef */
const credentialRepository = require('../../src/credential/repository')
const payloadMock = require('./mock/payload')
const repositoryMock = require('./mock/repository')

const makeCockpitDb = () => ({
  unidade: {
    findAll: async () =>
      await new Promise(resolve => resolve(repositoryMock.allUnits)),
    bulkCreate: async (payload) =>
      await new Promise(resolve => resolve(payload))
  },
  marca: {
    findOrCreate: async () =>
      await new Promise(resolve => resolve(repositoryMock.brand)),
    upsert: async () =>
      await new Promise(resolve => resolve(repositoryMock.brand))
  },
  bootstrap: async () => new Promise(resolve => resolve()),
  sequelize: {
    transaction: async () => new Promise(resolve => resolve())
  },
  credencial: {
    create: async () =>
      await new Promise(resolve => resolve({ dataValues: repositoryMock.credential })),
    findOne: async () =>
      await new Promise(resolve => resolve(repositoryMock.credential)),
    update: async () =>
      await new Promise(resolve => resolve([1])),
    findAll: async () =>
      await new Promise(resolve => resolve(repositoryMock.filteredCredentials))
  },
  credencial_unidade: {
    update: async () =>
      await new Promise(resolve => resolve([1])),
    bulkCreate: async () => await new Promise(resolve => resolve(payloadMock.formatedCredential))
  },
  tipo_exame: {
    findAll: async () =>
      await new Promise(resolve => resolve(repositoryMock.allExamTypes))
  }

})

const sutFactory = () => {
  const cockpitDbStub = makeCockpitDb()
  const credentialRepositoryFactoryFn = credentialRepository({
    cockpitDb: cockpitDbStub
  })
  return {
    sut: credentialRepositoryFactoryFn,
    cockpitDbStub
  }
}

describe('Cockpit Credential repository', () => {
  describe('Instrumentation methods', () => {
    it('should bootstrap the cockiptDb', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const bootstrapSpy = jest.spyOn(cockpitDbStub, 'bootstrap')

      await sut.bootstrap()

      expect(bootstrapSpy).toHaveBeenCalledTimes(1)
    })

    it('should transaction the cockiptDb', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const transactionSpy = jest.spyOn(cockpitDbStub.sequelize, 'transaction')

      await sut.transaction({})

      expect(transactionSpy).toHaveBeenCalledTimes(1)
      expect(transactionSpy).toHaveBeenCalledWith({})
    })
  })
  describe('Exam types methods', () => {
    it('should find all exam types', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const spyFindAll = jest.spyOn(cockpitDbStub.tipo_exame, 'findAll')

      const examTypes = await sut.findExamTypes()

      expect(examTypes).toStrictEqual(repositoryMock.allExamTypes)
      expect(spyFindAll).toHaveBeenCalledTimes(1)
    })
  })
  describe('Unit repository methods', () => {
    it('should find all units from payload', async () => {
      const { sut } = sutFactory()
      const allUnits = await sut.findAllUnits(payloadMock.fullFilled)

      expect(allUnits).toBe(repositoryMock.allUnits)
    })

    it('should bulk create units', async () => {
      const { sut, cockpitDbStub } = sutFactory()
      jest.spyOn(cockpitDbStub.unidade, 'bulkCreate').mockReturnValueOnce(payloadMock.fullFilled.unidades)

      const insertedUnits = await sut.bulkCreateUnit(payloadMock.fullFilled.unidades)

      expect(insertedUnits).toBe(payloadMock.fullFilled.unidades)
      expect(cockpitDbStub.unidade.bulkCreate).toHaveBeenCalledTimes(1)
    })

    it('should not bulk create units', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      jest.spyOn(cockpitDbStub.unidade, 'bulkCreate').mockReturnValueOnce([])

      const insertedUnits = await sut.bulkCreateUnit([])

      expect(insertedUnits).toBe(undefined)
      expect(cockpitDbStub.unidade.bulkCreate).not.toHaveBeenCalled()
    })

    it('should bulk update units', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      jest.spyOn(cockpitDbStub.unidade, 'bulkCreate').mockReturnValueOnce(payloadMock.fullFilled.unidades)

      const insertedUnits = await sut.bulkUpdateUnit(payloadMock.fullFilled.unidades)

      expect(insertedUnits).toBe(payloadMock.fullFilled.unidades)
      expect(cockpitDbStub.unidade.bulkCreate).toHaveBeenCalledTimes(1)
    })

    it('should not bulk create units', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      jest.spyOn(cockpitDbStub.unidade, 'bulkCreate').mockReturnValueOnce([])

      const insertedUnits = await sut.bulkUpdateUnit([])

      expect(insertedUnits).toBe(undefined)
      expect(cockpitDbStub.unidade.bulkCreate).not.toHaveBeenCalled()
    })
  })

  describe('Brand repository methods', () => {
    it('should findOrCreate brand', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const findOrCreateSpy = jest.spyOn(cockpitDbStub.marca, 'findOrCreate')
      const brand = await sut.findOrCreateBrand(payloadMock.fullFilled)

      expect(brand).toBe(repositoryMock.brand[0])
      expect(findOrCreateSpy).toHaveBeenCalledTimes(1)
    })

    it('should upsert brand', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const upsertSpy = jest.spyOn(cockpitDbStub.marca, 'upsert')

      const brand = await sut.updateBrand(payloadMock.fullFilled)

      expect(brand).toBe(repositoryMock.brand[0])
      expect(upsertSpy).toHaveBeenCalledTimes(1)
      expect(upsertSpy).toHaveBeenCalledWith(payloadMock.fullFilled.marca)
    })
  })

  describe('Credential methods', () => {
    it('should find a credential', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const findOneSpy = jest.spyOn(cockpitDbStub.credencial, 'findOne')
      const credencial = await sut.findCredential(payloadMock.credential)

      expect(credencial).toStrictEqual(repositoryMock.credential.toJSON())
      expect(findOneSpy).toHaveBeenCalledTimes(1)
    })

    it('should delete a credential', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const deleteSpy = jest.spyOn(cockpitDbStub.credencial, 'update')
      const rowsAffected = await sut.deleteCredential({ id: 20 })

      expect(rowsAffected).toEqual({ count: 1 })
      expect(deleteSpy).toHaveBeenCalledTimes(1)
    })

    it('should returns filtered credentials', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const filterSpy = jest.spyOn(cockpitDbStub.credencial, 'findAll')

      const filteredCredentials = await sut.filterCredential(payloadMock.filterFullFilled)

      expect(filteredCredentials).toStrictEqual(repositoryMock.filteredCredentials)
      expect(filterSpy).toHaveBeenCalledTimes(2)
    })

    it('should not returns filtered credentials', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      jest.spyOn(cockpitDbStub.credencial, 'findAll')
        .mockImplementationOnce(() => Promise.resolve([]))

      const filteredCredentials = await sut.filterCredential(payloadMock.filterFullFilled)

      expect(filteredCredentials).toStrictEqual([])
      expect(cockpitDbStub.credencial.findAll).toHaveBeenCalledTimes(1)
    })

    it('should transactionCreateRoundTrip sucessfully', async () => {
      const { sut, cockpitDbStub } = sutFactory()
      jest.spyOn(cockpitDbStub.credencial, 'create')
        .mockReturnValueOnce({ dataValues: repositoryMock.credential.toJSON() })

      jest.spyOn(cockpitDbStub.sequelize, 'transaction')
        .mockImplementationOnce(payload => {
          payload()
          return Promise.resolve()
        })

      await sut
        .transactionCreateRoundTrip(payloadMock.fullFilled)(payloadMock.formatedCredential)

      expect(cockpitDbStub.sequelize.transaction).toHaveBeenCalledTimes(1)
      expect(cockpitDbStub.credencial.create).toHaveBeenCalledTimes(1)
    })

    it('should update a credential with units to add and units to remove', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const {
        unitsToAdd,
        unitsToRemove,
        fullFilled
      } = payloadMock

      const spyCredentialUnitBulkCreate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'bulkCreate')

      const spyCredentialUnitUpdate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'update')

      const spyCredentialUpdate = jest
        .spyOn(cockpitDbStub.credencial, 'update')

      await sut.updateCredential('1')([
        fullFilled,
        {
          unitsToAdd,
          unitsToRemove
        }
      ])

      expect(spyCredentialUnitBulkCreate).toHaveBeenCalledTimes(1)
      expect(spyCredentialUnitUpdate).toHaveBeenCalledTimes(1)
      expect(spyCredentialUpdate).toHaveBeenCalledTimes(1)
    })

    it('should update a credential with only units to add', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const {
        unitsToAdd,
        fullFilled
      } = payloadMock

      const spyCredentialUnitBulkCreate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'bulkCreate')

      const spyCredentialUnitUpdate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'update')

      const spyCredentialUpdate = jest
        .spyOn(cockpitDbStub.credencial, 'update')

      await sut.updateCredential('1')([
        fullFilled,
        {
          unitsToAdd,
          unitsToRemove: []
        }
      ])

      expect(spyCredentialUnitBulkCreate).toHaveBeenCalledTimes(1)
      expect(spyCredentialUnitUpdate).not.toHaveBeenCalled()
      expect(spyCredentialUpdate).toHaveBeenCalledTimes(1)
    })

    it('should update a credential with only units to remove', async () => {
      const { sut, cockpitDbStub } = sutFactory()

      const {
        unitsToRemove,
        fullFilled
      } = payloadMock

      const spyCredentialUnitBulkCreate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'bulkCreate')

      const spyCredentialUnitUpdate = jest
        .spyOn(cockpitDbStub.credencial_unidade, 'update')

      const spyCredentialUpdate = jest
        .spyOn(cockpitDbStub.credencial, 'update')

      await sut.updateCredential('1')([
        fullFilled,
        {
          unitsToAdd: [],
          unitsToRemove
        }
      ])

      expect(spyCredentialUnitBulkCreate).not.toHaveBeenCalled()
      expect(spyCredentialUnitUpdate).toHaveBeenCalledTimes(1)
      expect(spyCredentialUpdate).toHaveBeenCalledTimes(1)
    })
  })
})
