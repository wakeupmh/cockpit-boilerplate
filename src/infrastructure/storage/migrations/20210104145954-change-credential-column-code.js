module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'credencial',
        'codigo_prestador',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'credencial',
        'codigo_prestador', {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      )
    ])
  }
}
