/* eslint-disable no-undef */
const cacheFactory = require('../../src/credential/cache')
const { fullFilled } = require('./mock/payload')

const sutFactory = () => {
  const redisClient = Promise.resolve({
    get: jest.fn(),
    set: jest.fn()
  })
  const redis = () => redisClient
  const Logger = {
    info: jest.fn()
  }
  const cacheClient = cacheFactory({
    redis,
    Logger
  })
  return {
    sut: cacheClient,
    redis,
    Logger
  }
}

describe('Cockpit Credential cache', () => {
  it('should sent a correct key to redis when requested to client', async () => {
    const filter = {
      ansId: 1,
      unidadeId: 2,
      marcaId: 2,
      tipoExameId: 1,
      wrongParam: 6
    }
    const correctKey = 'credentials#ansId=1#marcaId=2#tipoExameId=1#unidadeId=2#'

    const { sut, redis } = sutFactory()
    const client = await redis()

    await sut.setCredentials(filter, [])
    expect(client.set).toHaveBeenCalledWith(
      correctKey,
      JSON.stringify([]),
      expect.anything(),
      expect.anything()
    )

    await sut.getCredentials(filter)
    expect(client.get).toHaveBeenCalledWith(correctKey)
  })

  it('should store credentials in redis cache', async () => {
    const filter = { ansId: 1 }
    const credentials = [
      fullFilled,
      { id: 2, marca: { id: 2, nome: 'Lavoisier' } }
    ]
    const { sut, redis } = sutFactory()
    const client = await redis()

    await sut.setCredentials(filter, credentials)
    expect(client.set).toHaveBeenCalledWith(
      expect.anything(),
      JSON.stringify(credentials),
      'EX',
      expect.anything()
    )
  })

  it('should not be cached when the filter is empty', async () => {
    const filter = { }
    const { sut, redis } = sutFactory()
    const client = await redis()

    await sut.setCredentials(filter, [])
    expect(client.set).not.toBeCalled()
  })

  it('should not search the cache when the filter is empty', async () => {
    const filter = { }
    const { sut, redis } = sutFactory()
    const client = await redis()

    await sut.getCredentials(filter)
    expect(client.get).not.toBeCalled()
  })

  it('should not throw error when the cache fails', async () => {
    const filter = { ansId: 1 }
    const { sut, redis, Logger } = sutFactory()
    const client = await redis()
    client.get.mockImplementation(() => { throw new Error() })

    await sut.getCredentials(filter)
    expect(Logger.info).toBeCalledWith(expect.stringMatching(/Error/ig))
  })
})
