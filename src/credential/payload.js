const credentialPayload = ({
  ans,
  marca,
  tipoExame,
  unidades,
  codigoPrestador,
  cpf,
  cnpj,
  usuario,
  senha,
  ativo,
  descricao,
  url,
  ignorarDataProvider
}) => ({
  ans_id: ans.id,
  marca_id: marca.id,
  tipo_exame_id: tipoExame ? tipoExame.id : null,
  unidades,
  codigo_prestador: codigoPrestador || null,
  cpf,
  cnpj: cnpj || null,
  usuario,
  senha,
  ativo,
  descricao,
  url,
  ignorarDataProvider
})

module.exports = {
  credentialPayload
}
