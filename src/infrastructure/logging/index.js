const { createLogger, transports } = require('winston')
const { combineLogFormats } = require('./format-levels')

const Logger = createLogger({
  level: 'info',
  defaultMeta: {
    projectLabel: 'Cockpit 🧰'
  },
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combineLogFormats()
    })
  ]
})

module.exports = { Logger }
