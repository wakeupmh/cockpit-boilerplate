'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credencial', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ans_id: {
        type: Sequelize.STRING,
        references: { model: 'ans', key: 'id' },
        allowNull: false
      },
      tipo_exame_id: {
        type: Sequelize.INTEGER,
        references: { model: 'tipo_exame', key: 'id' },
        allowNull: true
      },
      marca_id: {
        type: Sequelize.INTEGER,
        references: { model: 'marca', key: 'id' },
        allowNull: false
      },
      codigo_prestador: {
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      descricao: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      ignorar_data_provider: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credencial')
  }
}
