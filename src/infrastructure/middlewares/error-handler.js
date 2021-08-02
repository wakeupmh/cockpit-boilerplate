const errorHandler = ({ Logger }) => ({
  onError: (handler, next) => {
    if (handler.error) {
      const statusCode = handler.error.statusCode || 500

      if (statusCode === 500) {
        Logger.error(JSON.stringify({ message: handler.error.message, stack: handler.error.stack }))
      }

      handler.response = {
        statusCode: statusCode,
        body: JSON.stringify(statusCode === 500 ? { message: 'Ocorreu um erro genérico, favor tente mais tarde' } : handler.error)
      }
    }

    return next()
  }
})

module.exports = errorHandler
