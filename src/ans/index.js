const { Logger, cockpitDb } = require('../infrastructure')

const {
  getAnsOperatorsHandler
} = require('./handler')

const ansRepositoryFactory = require('./repository')

const getAnsOperators = getAnsOperatorsHandler({
  Logger,
  ansRepository: ansRepositoryFactory({ cockpitDb })
})

module.exports = {
  getAnsOperators
}
