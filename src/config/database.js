/* eslint-disable no-secrets/no-secrets */
module.exports = Object.freeze({
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  logging: false,
  pool: {
    min: 0,
    max: 1,
    idle: 1000
  }
  // ssl: true,
  // dialectOptions: {
  //   ssl: true,
  //   useUTC: true
  // }
})
