const allUnits = [
  {
    id: 696,
    nome: 'ALPHAVILLE',
    sigla: 'DAP',
    ativo: true,
    createdAt: '2020-12-03T19:31:03.381Z',
    updatedAt: '2020-12-03T19:31:03.381Z'
  },
  {
    id: 697,
    nome: 'ALTO DE PINHEIROS',
    sigla: 'DPI',
    ativo: true,
    createdAt: '2020-12-03T19:31:03.381Z',
    updatedAt: '2020-12-03T19:31:03.381Z'
  },
  {
    id: 698,
    nome: 'ALTOS DE SANTANA',
    sigla: 'DSN',
    ativo: true,
    createdAt: '2020-12-03T19:31:03.381Z',
    updatedAt: '2020-12-03T19:31:03.381Z'
  }
]

const someUnits = [{
  id: 696,
  nome: 'ALPHAVILLE',
  sigla: 'DAP',
  ativo: true,
  createdAt: '2020-12-03T19:31:03.381Z',
  updatedAt: '2020-12-03T19:31:03.381Z'
},
{
  id: 698,
  nome: 'ALTOS DE SANTANA',
  sigla: 'DSN',
  ativo: true,
  createdAt: '2020-12-03T19:31:03.381Z',
  updatedAt: '2020-12-03T19:31:03.381Z'
}]

const brand = [{
  id: 2,
  nome: 'Lavoisier',
  ativo: true,
  createdAt: '2020-12-03T19:31:03.381Z',
  updatedAt: '2020-12-03T19:31:03.381Z'
}]

const credential = {
  toJSON: () => ({
    id: 20,
    ans_id: 1,
    marca_id: 2,
    tipo_exame_id: null,
    codigo_prestador: null,
    cpf: null,
    cnpj: null,
    usuario: null,
    senha: null,
    ativo: true,
    descricao: null,
    url: null,
    ignorar_data_provider: null,
    createdAt: '2020-12-03T19:40:58.724Z',
    updatedAt: '2020-12-04T14:20:45.586Z',
    marca: {
      id: 2,
      nome: 'Lavoisier',
      ativo: true,
      createdAt: '2020-12-03T14:37:39.264Z',
      updatedAt: '2020-12-03T14:50:32.968Z'
    },
    ans: {
      id: 1,
      nome: 'Bradesco',
      ativo: true,
      createdAt: '2020-12-03T14:08:50.207Z',
      updatedAt: '2020-12-03T14:08:50.207Z'
    },
    tipo_exame: null,
    unidades: [
      {
        id: 696,
        nome: 'ALPHAVILLE',
        sigla: 'DAP',
        ativo: true,
        createdAt: '2020-12-03T19:31:03.381Z',
        updatedAt: '2020-12-03T19:31:03.381Z',
        credencial_unidade: {
          unidade_id: 696,
          credencial_id: 20,
          createdAt: '2020-12-03T19:40:58.724Z',
          updatedAt: '2020-12-03T19:40:58.724Z',
          ativo: true
        }
      },
      {
        id: 717,
        nome: 'CHÁCARA FLORA',
        sigla: 'DCF',
        ativo: true,
        createdAt: '2020-12-04T14:16:04.313Z',
        updatedAt: '2020-12-04T14:16:04.313Z',
        credencial_unidade: {
          unidade_id: 717,
          credencial_id: 20,
          createdAt: '2020-12-04T14:16:04.348Z',
          updatedAt: '2020-12-04T14:16:04.348Z',
          ativo: true
        }
      },
      {
        id: 697,
        nome: 'ALTO DE PINHEIROS',
        sigla: 'DPI',
        ativo: true,
        createdAt: '2020-12-03T19:31:03.381Z',
        updatedAt: '2020-12-03T19:31:03.381Z',
        credencial_unidade: {
          unidade_id: 697,
          credencial_id: 20,
          createdAt: '2020-12-04T14:20:45.582Z',
          updatedAt: '2020-12-04T14:20:45.582Z',
          ativo: true
        }
      }
    ]
  })
}

const filteredCredentials = [
  {
    id: 4,
    ans_id: 1,
    marca_id: 3,
    tipo_exame_id: 1,
    codigo_prestador: null,
    cpf: null,
    cnpj: null,
    usuario: null,
    senha: null,
    ativo: true,
    descricao: null,
    url: null,
    ignorar_data_provider: null,
    createdAt: '2020-12-03T18:09:55.914Z',
    updatedAt: '2020-12-03T18:09:55.914Z',
    unidades: [
      {
        id: 696,
        nome: 'ALPHAVILLE',
        sigla: 'DAP',
        ativo: true,
        createdAt: '2020-12-03T14:00:32.439Z',
        updatedAt: '2020-12-03T14:00:32.439Z',
        credencial_unidade: {
          unidade_id: 696,
          credencial_id: 4,
          createdAt: '2020-12-03T18:09:55.914Z',
          updatedAt: '2020-12-03T18:09:55.914Z',
          ativo: true
        }
      }
    ],
    ans: {
      id: 1,
      nome: 'Operadora',
      ativo: true,
      createdAt: '2020-12-03T13:58:59.139Z',
      updatedAt: '2020-12-03T13:58:59.139Z'
    },
    marca: {
      id: 3,
      nome: 'Amil',
      ativo: true,
      createdAt: '2020-12-03T18:09:11.570Z',
      updatedAt: '2020-12-03T18:09:11.570Z'
    }
  }
]

const allExamTypes = [
  {
    id: 1,
    nome: 'AC',
    ativo: true,
    createdAt: '2020-12-03T19:40:58.000Z',
    updatedAt: '2020-12-03T19:40:58.000Z'
  },
  {
    id: 2,
    nome: 'RDI',
    ativo: true,
    createdAt: '2020-12-03T19:40:58.000Z',
    updatedAt: '2020-12-03T19:40:58.000Z'
  },
  {
    id: 3,
    nome: 'AC e RDI',
    ativo: true,
    createdAt: '2020-12-03T19:40:58.000Z',
    updatedAt: '2020-12-03T19:40:58.000Z'
  }
]

const credentialsWithoutCache = {
  statusCode: 200,
  body: JSON.stringify([{ id: 20, ans_id: 1, marca_id: 2, tipo_exame_id: null, codigo_prestador: null, cpf: null, cnpj: null, usuario: null, senha: null, ativo: true, descricao: null, url: null, ignorar_data_provider: null, createdAt: '2020-12-03T19:40:58.724Z', updatedAt: '2020-12-04T14:20:45.586Z', marca: { id: 2, nome: 'Lavoisier', ativo: true, createdAt: '2020-12-03T14:37:39.264Z', updatedAt: '2020-12-03T14:50:32.968Z' }, ans: { id: 1, nome: 'Bradesco', ativo: true, createdAt: '2020-12-03T14:08:50.207Z', updatedAt: '2020-12-03T14:08:50.207Z' }, tipo_exame: null, unidades: [{ id: 696, nome: 'ALPHAVILLE', sigla: 'DAP', ativo: true, createdAt: '2020-12-03T19:31:03.381Z', updatedAt: '2020-12-03T19:31:03.381Z', credencial_unidade: { unidade_id: 696, credencial_id: 20, createdAt: '2020-12-03T19:40:58.724Z', updatedAt: '2020-12-03T19:40:58.724Z', ativo: true } }, { id: 717, nome: 'CHÁCARA FLORA', sigla: 'DCF', ativo: true, createdAt: '2020-12-04T14:16:04.313Z', updatedAt: '2020-12-04T14:16:04.313Z', credencial_unidade: { unidade_id: 717, credencial_id: 20, createdAt: '2020-12-04T14:16:04.348Z', updatedAt: '2020-12-04T14:16:04.348Z', ativo: true } }, { id: 697, nome: 'ALTO DE PINHEIROS', sigla: 'DPI', ativo: true, createdAt: '2020-12-03T19:31:03.381Z', updatedAt: '2020-12-03T19:31:03.381Z', credencial_unidade: { unidade_id: 697, credencial_id: 20, createdAt: '2020-12-04T14:20:45.582Z', updatedAt: '2020-12-04T14:20:45.582Z', ativo: true } }] }]),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

module.exports = {
  allExamTypes,
  allUnits,
  someUnits,
  brand,
  credential,
  filteredCredentials,
  credentialsWithoutCache
}
