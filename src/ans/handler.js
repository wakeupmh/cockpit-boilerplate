const { middlewareFactory } = require('../infrastructure')

const getAnsOperators = ({
  Logger,
  ansRepository
}) => event => {
  return ansRepository.bootstrap()
    .then(ansRepository.findAnsOperators)
    .then(dbResponse => {
      if (dbResponse) {
        return event.ok(dbResponse)
      }

      Logger.info('not found ans operators list')
      return event.notFound({
        message: 'Does not exist ans operators list'
      })
    })
}
const getAnsOperatorsHandler = middlewareFactory(getAnsOperators)

module.exports = {
  getAnsOperatorsHandler
}
