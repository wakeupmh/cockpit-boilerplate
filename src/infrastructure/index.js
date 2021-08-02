module.exports = {
  ...require('./logging'),
  ...require('./middlewares/factory'),
  ...require('./http'),
  cockpitDb: require('./storage/db'),
  redis: require('./storage/redis')
}
