const ansRepository = ({ cockpitDb }) => {
  const bootstrap = () => cockpitDb.bootstrap()

  const findAnsOperators = () => cockpitDb.ans.findAll({})

  return {
    bootstrap,
    findAnsOperators
  }
}

module.exports = ansRepository
