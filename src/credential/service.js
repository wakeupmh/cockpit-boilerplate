const Bluebird = require('bluebird')

module.exports = ({ request }) => {
  const requestInitials = ({ id }) =>
    request.get(`/unidades/${id}/origem`)
      .then(({ data: { idUnidadeOrigem } }) => idUnidadeOrigem)

  const mountInitials = item => requestInitials(item)
    .then(idUnidadeOrigem => ({
      ...item,
      sigla: idUnidadeOrigem
    }))

  const exclusiveRightJoin = (leftArray, rightArray) => leftArray.filter(
    left => !rightArray || !rightArray.some(right => left.id === right.id)
  )

  const unifyUnitInitials = (unidades, results) =>
    Bluebird.map(exclusiveRightJoin(unidades, results), mountInitials)

  const mountUnitsToUpdate = body => credentialData => {
    const { unidades: unitsBody } = body
    const { unidades: unitsData } = credentialData

    const unitsToAdd = exclusiveRightJoin(unitsBody, unitsData)
    const unitsToRemove = exclusiveRightJoin(unitsData, unitsBody)

    return { unitsToAdd, unitsToRemove }
  }

  const sortCredential = (credA, credB) => {
    let order = 0
    if (credA.ans.nome > credB.ans.nome) {
      order = 1
    }
    if (credB.ans.nome > credA.ans.nome) {
      order = -1
    }
    if (credA.ans.nome === credB.ans.nome) {
      if (credA.marca.nome > credB.marca.nome) {
        order = 1
      }
      if (credB.marca.nome > credA.marca.nome) {
        order = -1
      }
    }
    return order
  }

  const removeDuplicatedItems = ({ list, attr }) => {
    const uniqList = list.reduce((acc, current) => {
      if (!acc.find(item => current[attr] === item[attr])) acc.push(current)
      return acc
    }, [])
    return uniqList
  }

  return {
    unifyUnitInitials,
    mountUnitsToUpdate,
    sortCredential,
    removeDuplicatedItems
  }
}
