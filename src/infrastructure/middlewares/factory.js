const middy = require('@middy/core')
const doNotWaitForEmptyEventLoop = require('@middy/do-not-wait-for-empty-event-loop')
const validation = require('./validation')
const bodyParser = require('./body-parser')
const errorHandler = require('./error-handler')
const registerResponses = require('./response')

const middlewareFactory = handler => dependencies => {
  return middy(handler(dependencies))
    .use(doNotWaitForEmptyEventLoop())
    .use(registerResponses())
    .use(bodyParser())
    .use(validation(dependencies))
    .use(errorHandler(dependencies))
}

module.exports = {
  middlewareFactory
}
