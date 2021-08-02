const cache = ({ redis, Logger }) => {
  const setCredentials = (filter, credentialList) => {
    if (!Object.keys(filter).length) {
      return Promise.resolve()
    }
    const key = generateKey(limitFilters(filter))
    return set(key, credentialList)
  }

  const getCredentials = (filter) => {
    if (!Object.keys(filter).length) {
      return Promise.resolve()
    }
    const key = generateKey(limitFilters(filter))
    return get(key)
      .catch(err => {
        Logger.info(`Error fetching credential from cache ${err}`)
      })
  }

  const limitFilters = ({
    ansId,
    marcaId,
    unidadeId,
    tipoExameId,
    codigoPrestador
  }) => ({
    ansId,
    marcaId,
    unidadeId,
    tipoExameId,
    codigoPrestador
  })

  const get = (key) => redis().then(c => c.get(key))
    .then(data => JSON.parse(data || null))

  const set = (key, data, seconds = 900) =>
    redis().then(c => c.set(key, JSON.stringify(data), 'EX', seconds))

  const generateKey = (filter) =>
    Object.keys(filter).sort((a, b) => a > b ? 1 : -1)
      .reduce((redisKey, filterKey) => {
        let key = redisKey
        if (filter[filterKey]) {
          key = `${key}${filterKey}=${filter[filterKey]}#`
        }
        return key
      }, 'credentials#')

  return {
    setCredentials,
    getCredentials
  }
}

module.exports = cache
