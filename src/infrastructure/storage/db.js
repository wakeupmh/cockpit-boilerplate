/* istanbul ignore file */
const fs = require('fs')
const path = require('path')
const config = require('../../config')
const resolvedPath = path.resolve('src', 'credential', 'models')
const Bluebird = require('bluebird')
const Sequelize = require('sequelize')

const readdir = Bluebird.promisify(fs.readdir)
let sequelize = null
let connected = false

if (!sequelize) {
  sequelize = new Sequelize(
    config.cockpitDb.database,
    config.cockpitDb.username,
    config.cockpitDb.password,
    {
      host: config.cockpitDb.host,
      port: config.cockpitDb.port,
      dialect: config.cockpitDb.dialect,
      logging: config.cockpitDb.logging,
      pool: config.cockpitDb.pool
    }
  )
}

const importModels = file => {
  const model = require(path.join(`${resolvedPath}/${file}`))(sequelize, Sequelize.DataTypes)
  db[model.name] = model

  return model
}

const db = {
  Sequelize,
  sequelize,
  bootstrap () {
    if (connected) {
      return Bluebird.resolve()
    }
    return readdir(`${resolvedPath}`)
      .map(data => importModels(data))
      .tap(() => {
        Object.keys(db).forEach((modelName) => {
          if (db[modelName].associate) {
            db[modelName].associate(db)
          }
        })
      })
      .then(() => db.sequelize.authenticate())
      .tap(() => {
        connected = true
      })
  }
}

module.exports = db
