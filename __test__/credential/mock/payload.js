const faker = require('faker')

const fullFilled = {
  ans: {
    id: 1,
    nome: 'Bradesco'
  },
  marca: {
    id: 2,
    nome: 'Lavoisier'
  },
  unidades: [
    {
      id: 696,
      nome: 'ALPHAVILLE'
    },
    {
      id: 697,
      nome: 'ALTO DE PINHEIROS'
    }
  ],
  tipoExame: {
    id: 1,
    nome: 'RDI'
  },
  codigoPrestador: faker.random.number(),
  cpf: faker.random.number(),
  cnpj: faker.random.number(),
  usuario: faker.internet.userName(),
  senha: faker.internet.password(),
  ativo: faker.random.boolean(),
  descricao: faker.lorem.paragraph(),
  url: faker.internet.url(),
  ignorarDataProvider: faker.random.boolean()
}

const filterFullFilled = {
  ans_id: '1',
  marca_id: '1',
  unidade_id: '696',
  tipo_exame_id: '1',
  codigo_prestador: '1'
}

const formatedCredential = { ans_id: 1, marca_id: 3, tipo_exame_id: null, unidades: [{ id: 696, nome: 'ALPHAVILLE' }, { id: 697, nome: 'ALTO DE PINHEIROS' }, { id: 717, nome: 'CHÁCARA FLORA' }] }

const unitsToAdd = [{
  id: 696,
  nome: 'ALPHAVILLE',
  sigla: 'DAP',
  ativo: true,
  createdAt: '2020-12-03T14:00:32.439Z',
  updatedAt: '2020-12-03T14:00:32.439Z'
}]

const unitsToRemove = [{
  id: 698,
  nome: 'ALTOS DE SANTANA',
  sigla: 'DSN',
  ativo: true,
  createdAt: '2020-12-03T19:31:03.381Z',
  updatedAt: '2020-12-03T19:31:03.381Z'
}]

module.exports = {
  fullFilled,
  filterFullFilled,
  formatedCredential,
  unitsToAdd,
  unitsToRemove
}
