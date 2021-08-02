/* eslint-disable no-template-curly-in-string */
const yup = require('yup')
const {
  setLocale
} = yup

setLocale({
  mixed: {
    notType: 'o ${path} é obrigatório',
    required: 'o campo ${path} é obrigatório'
  }
})

const idNomeSchema = yup.object().shape({
  id: yup.number().required(),
  nome: yup.string()
})

const credentialSchema = yup.object().shape({
  ans: idNomeSchema,
  marca: idNomeSchema,
  tipoExame: yup.object().shape({
    id: yup.string(),
    nome: yup.string()
  }),
  unidades: yup.array(idNomeSchema),
  codigo_prestador: yup.string().nullable(),
  cpf: yup.string(),
  cnpj: yup.string().nullable(),
  senha: yup.string(),
  ativo: yup.bool(),
  descricao: yup.string(),
  url: yup.string(),
  ignorarDataProvider: yup.bool()
})

module.exports = {
  credentialSchema
}
