
module.exports = Object.freeze({
  cockpitDb: require('./database'),
  cache: require('./cache'),
  dataProviderConfig: {
    baseURL: process.env.DATA_PROVIDER_URL,
    apikey: process.env.DATA_PROVIDER_API_KEY
  }
})
