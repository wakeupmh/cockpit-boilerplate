module.exports = (sequelize, DataTypes) => {
  const Ans = sequelize.define('ans', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
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
  }, {
    tableName: 'ans'
  })

  Ans.associate = function (models) {
    Ans.hasMany(models.credencial, {
      foreignKey: 'ans_id',
      as: 'ans'
    })
  }

  return Ans
}
