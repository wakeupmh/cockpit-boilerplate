const bodyParser = () => ({
  before: (handler, next) => {
    handler.event.body = JSON.parse(handler.event.body)
    next()
  }
})

module.exports = bodyParser
