module.exports = (sequelize, DataTypes) => {
  const credencialUnidade = sequelize.define('credencial_unidade', {
    unidade_id: DataTypes.INTEGER,
    credencial_id: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    ativo: DataTypes.BOOLEAN
  },
  {
    tableName: 'credencial_unidade'
  })

  return credencialUnidade
}
