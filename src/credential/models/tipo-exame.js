module.exports = (sequelize, DataTypes) => {
  const TipoExame = sequelize.define('tipo_exame', {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  },
  {
    tableName: 'tipo_exame'
  })

  TipoExame.associate = function (models) {
    TipoExame.hasMany(models.credencial, {
      foreignKey: 'tipo_exame_id'
    })
  }

  return TipoExame
}
