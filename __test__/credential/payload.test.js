/* eslint-disable no-undef */
const payloadMethods = require('../../src/credential/payload')
const payloadMock = require('./mock/payload')

describe('Credential payload methods', () => {
  describe('credentialPayload', () => {
    it('Should return a valid payload', () => {
      const mockPayloadMethod = payloadMethods.credentialPayload(payloadMock.fullFilled)

      expect(mockPayloadMethod.ans_id).toBeTruthy()
      expect(mockPayloadMethod.marca_id).toBeTruthy()
      expect(mockPayloadMethod.unidades).toBeTruthy()
    })

    it('Should return a valid payload with tipoExame null', () => {
      payloadMock.fullFilled.tipoExame = null
      const mockPayloadMethod = payloadMethods.credentialPayload(payloadMock.fullFilled)

      expect(mockPayloadMethod.tipo_exame_id).toBe(null)
    })
  })
})
