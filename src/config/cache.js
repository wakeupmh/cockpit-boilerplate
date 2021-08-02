module.exports = Object.freeze({
  host: process.env.REDIS_HOST,
  db: 1,
  port: 6380,
  password: process.env.REDIS_PASSWORD,
  tls: true
})
