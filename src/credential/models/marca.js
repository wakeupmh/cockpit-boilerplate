module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define('marca', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    tableName: 'marca'
  })

  Marca.associate = function (models) {
    Marca.hasMany(models.credencial, {
      foreignKey: 'marca_id'
    })
  }

  return Marca
}
