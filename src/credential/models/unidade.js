module.exports = (sequelize, DataTypes) => {
  const Unidade = sequelize.define('unidade', {
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {
    tableName: 'unidade'
  })

  Unidade.associate = function (models) {
    Unidade.belongsToMany(models.credencial, {
      through: 'credencial_unidade',
      as: 'credenciais',
      foreignKey: 'unidade_id'
    })
  }

  return Unidade
}
