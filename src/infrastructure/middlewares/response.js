const createResponse = status => (message = {}) => ({
  statusCode: status,
  body: typeof message === 'object' ? JSON.stringify(message) : message,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
})

const responseMiddleware = () => ({
  before (handler, next) {
    handler.event.ok = createResponse(200)
    handler.event.created = createResponse(201)
    handler.event.notFound = createResponse(404)
    handler.event.badRequest = createResponse(400)
    next()
  }
})

module.exports = responseMiddleware
