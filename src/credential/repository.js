const credentialRepository = ({ cockpitDb }) => {
  const bootstrap = () => cockpitDb.bootstrap()

  const transaction = transactionInstance => cockpitDb.sequelize.transaction(transactionInstance)

  const findExamTypes = () => cockpitDb.tipo_exame.findAll({})

  const findCredential = id => cockpitDb.credencial.findOne({
    where: {
      id
    },
    include: [
      {
        model: cockpitDb.marca
      },
      {
        model: cockpitDb.ans,
        as: 'ans'
      },
      {
        model: cockpitDb.tipo_exame
      },
      {
        where: { ativo: true },
        model: cockpitDb.unidade,
        as: 'unidades',
        required: false,
        through: {
          where: { ativo: true }
        }
      }
    ]
  })
    .then(credencial => credencial.toJSON())

  const findAllUnits = ({ unidades }) => cockpitDb.unidade.findAll({
    where: {
      id: unidades.map(unit => unit.id)
    }
  })

  const filterCredential = filter => {
    const ativo = true
    const associateKeys = ['unidade_id']
    const validFilter = (param) => param && param.trim() !== ''

    const conditions = Object.keys(filter).reduce((condition, key) => {
      const modelKey = associateKeys.includes(key) ? 'unidade' : 'credencial'
      const regex = new RegExp(`${modelKey}_`, 'gi')
      /* istanbul ignore else */
      if (validFilter(filter[key])) {
        const name = associateKeys.includes(key) ? key.replace(regex, '') : key
        condition = {
          ...condition,
          [modelKey]: Object.assign(
            condition[modelKey],
            { [name]: filter[key] }
          )
        }
      }
      return condition
    }, { credencial: { ativo }, unidade: {} })

    return cockpitDb.credencial.findAll({
      attributes: ['id'],
      where: conditions.credencial,
      include: [{
        model: cockpitDb.unidade,
        as: 'unidades',
        attributes: ['id'],
        where: { ...conditions.unidade, ativo },
        required: !!Object.keys(
          conditions.unidade
        ).length
      }]
    })
      .then(credentials =>
        credentials.map(credential => credential.id)
      )
      .then(credentialIds => {
        if (credentialIds.length) {
          return cockpitDb.credencial.findAll({
            where: { id: credentialIds },
            include: [{
              where: { ativo },
              model: cockpitDb.unidade,
              as: 'unidades',
              required: false,
              through: {
                where: { ativo }
              }
            },
            {
              where: { ativo },
              model: cockpitDb.ans,
              as: 'ans'
            },
            {
              where: { ativo },
              model: cockpitDb.marca,
              as: 'marca'
            },
            {
              where: { ativo },
              model: cockpitDb.tipo_exame,
              as: 'tipo_exame'
            }]
          })
        }
        return credentialIds
      })
  }

  const bulkCreateUnit = payload => {
    if (payload.length) {
      return cockpitDb.unidade.bulkCreate(payload)
    }

    return Promise.resolve()
  }

  const bulkUpdateUnit = units => {
    if (units.length) {
      return cockpitDb.unidade.bulkCreate(units, {
        updateOnDuplicate: ['id', 'nome', 'sigla', 'ativo']
      })
    }

    return Promise.resolve()
  }

  const updateCredentialUnit = (unitsToUpdate, credentialId) => {
    const { unitsToAdd, unitsToRemove } = unitsToUpdate
    const promisesToUpdate = []

    const payloadUnit = (unit, credentialId) => ({
      unidade_id: unit.id,
      credencial_id: +credentialId
    })

    if (unitsToAdd.length) {
      const credentialUnitPayload = unitsToAdd.map(unit => ({
        ...payloadUnit(unit, credentialId)
      }))

      promisesToUpdate.push(cockpitDb.credencial_unidade.bulkCreate(credentialUnitPayload))
    }

    if (unitsToRemove.length) {
      promisesToUpdate.push(
        ...unitsToRemove.map(unit =>
          cockpitDb.credencial_unidade.update({
            ...payloadUnit(unit, credentialId),
            ativo: false
          }, {
            where: {
              ...payloadUnit(unit, credentialId)
            }
          })
        )
      )
    }

    return Promise.all(promisesToUpdate)
  }

  const findOrCreateBrand = ({ marca }) => cockpitDb.marca.findOrCreate({
    where: {
      id: marca.id
    },
    defaults: marca
  })
    .then(([result]) => result)

  const updateBrand = ({ marca }) => cockpitDb.marca.upsert(marca)
    .then(([result]) => result)

  const transactionCreateRoundTrip = ({ unidades }) => payload =>
    cockpitDb.sequelize.transaction(transactionInstance =>
      Promise.resolve(transactionInstance)
        .then(transaction => cockpitDb.credencial.create(payload, { transaction }))
        .then(({ dataValues: credencial }) => cockpitDb.credencial_unidade.bulkCreate(
          unidades.map(unidade => ({
            unidade_id: unidade.id,
            credencial_id: credencial.id
          })),
          { transaction: transactionInstance }
        )))

  const updateCredential = id => response => {
    const [payload, unitsToUpdate] = response

    return updateCredentialUnit(unitsToUpdate, id)
      .then(() => cockpitDb.credencial.update(payload, {
        where: {
          id
        }
      }))
  }

  const logicDelete = (condition, model) =>
    model.update(
      { ativo: false },
      { where: condition }
    )
  const deleteCredential = ({ id }) =>
    logicDelete(
      { credencial_id: id },
      cockpitDb.credencial_unidade
    )
      .then(() => logicDelete({ id }, cockpitDb.credencial))
      .then(([count]) => ({ count }))

  return {
    bootstrap,
    transaction,
    findExamTypes,
    findCredential,
    findAllUnits,
    filterCredential,
    bulkCreateUnit,
    bulkUpdateUnit,
    findOrCreateBrand,
    updateBrand,
    transactionCreateRoundTrip,
    deleteCredential,
    updateCredential
  }
}

module.exports = credentialRepository
