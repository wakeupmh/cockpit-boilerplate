const createError = require('http-errors')
const validation = ({
  schema
}) => ({
  before (handler) {
    const throwBadRequest = ({
      errors
    }) => {
      throw createError(400, {
        message: 'ocorreu um erro na validação dos dados',
        error: errors
      })
    }
    if (!schema) {
      return Promise.resolve()
    }
    return schema.validate(handler.event.body, {
      abortEarly: false
    })
      .then(() => Promise.resolve())
      .catch((err) => {
        console.log(err)
        return throwBadRequest(err)
      })
  }
})
module.exports = validation
