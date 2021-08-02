module.exports = (sequelize, DataTypes) => {
  const Credencial = sequelize.define('credencial', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ans_id: DataTypes.INTEGER,
    marca_id: DataTypes.INTEGER,
    tipo_exame_id: DataTypes.INTEGER,
    codigo_prestador: DataTypes.STRING,
    cpf: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    usuario: DataTypes.STRING,
    senha: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    descricao: DataTypes.STRING,
    url: DataTypes.STRING,
    ignorar_data_provider: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    }
  }, {
    tableName: 'credencial'
  })

  Credencial.associate = function (models) {
    Credencial.belongsToMany(models.unidade, {
      through: 'credencial_unidade',
      as: 'unidades',
      foreignKey: 'credencial_id'
    })

    Credencial.belongsTo(models.marca, {
      foreignKey: 'marca_id'
    })

    Credencial.belongsTo(models.tipo_exame, {
      foreignKey: 'tipo_exame_id'
    })

    Credencial.belongsTo(models.ans, {
      foreignKey: 'ans_id',
      as: 'ans'
    })
  }

  return Credencial
}
