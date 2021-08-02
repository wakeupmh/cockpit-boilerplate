const dataProviderInitialSource = {
  data: {
    idUnidadeOrigem: 'DPI'
  }
}

const unitsToUpdateResponse = {
  unitsToAdd: [
    { id: 696, nome: 'ALPHAVILLE' },
    { id: 697, nome: 'ALTO DE PINHEIROS' }
  ],
  unitsToRemove: [
    {
      createdAt: '2020-12-04T20:44:06.852Z',
      updatedAt: '2020-12-04T20:44:06.852Z',
      id: 700,
      nome: 'BRAZ LEME',
      sigla: 'DBZ',
      ativo: true
    }
  ]
}

const credentials = [
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
      nome: 'Amil',
      ativo: true,
      createdAt: '2020-12-03T13:58:59.139Z',
      updatedAt: '2020-12-03T13:58:59.139Z'
    },
    marca: {
      id: 3,
      nome: 'Alta',
      ativo: true,
      createdAt: '2020-12-03T18:09:11.570Z',
      updatedAt: '2020-12-03T18:09:11.570Z'
    }
  },
  {
    id: 1,
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
    createdAt: '2020-12-03T14:00:32.447Z',
    updatedAt: '2020-12-03T14:00:32.447Z',
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
          credencial_id: 1,
          createdAt: '2020-12-03T14:00:32.447Z',
          updatedAt: '2020-12-03T14:00:32.447Z',
          ativo: true
        }
      }
    ],
    ans: {
      id: 1,
      nome: 'Bradesco',
      ativo: true,
      createdAt: '2020-12-03T13:58:59.139Z',
      updatedAt: '2020-12-03T13:58:59.139Z'
    },
    marca: {
      id: 2,
      nome: 'Lavoisier',
      ativo: true,
      createdAt: '2020-12-03T14:00:29.817Z',
      updatedAt: '2020-12-03T14:00:29.817Z'
    }
  },
  {
    id: 2,
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
    createdAt: '2020-12-03T15:21:38.696Z',
    updatedAt: '2020-12-03T15:21:38.696Z',
    unidades: [],
    ans: {
      id: 1,
      nome: 'Amil',
      ativo: true,
      createdAt: '2020-12-03T13:58:59.139Z',
      updatedAt: '2020-12-03T13:58:59.139Z'
    },
    marca: {
      id: 2,
      nome: 'Lavoisier',
      ativo: true,
      createdAt: '2020-12-03T14:00:29.817Z',
      updatedAt: '2020-12-03T14:00:29.817Z'
    }
  },
  {
    id: 3,
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
    createdAt: '2020-12-03T15:22:15.394Z',
    updatedAt: '2020-12-03T15:22:15.394Z',
    unidades: [],
    ans: {
      id: 1,
      nome: 'Amil',
      ativo: true,
      createdAt: '2020-12-03T13:58:59.139Z',
      updatedAt: '2020-12-03T13:58:59.139Z'
    },
    marca: {
      id: 2,
      nome: 'Delboni',
      ativo: true,
      createdAt: '2020-12-03T14:00:29.817Z',
      updatedAt: '2020-12-03T14:00:29.817Z'
    }
  }
]

const sortedCredentials = [{ id: 4, ans_id: 1, marca_id: 3, tipo_exame_id: 1, codigo_prestador: null, cpf: null, cnpj: null, usuario: null, senha: null, ativo: true, descricao: null, url: null, ignorar_data_provider: null, createdAt: '2020-12-03T18:09:55.914Z', updatedAt: '2020-12-03T18:09:55.914Z', unidades: [{ id: 696, nome: 'ALPHAVILLE', sigla: 'DAP', ativo: true, createdAt: '2020-12-03T14:00:32.439Z', updatedAt: '2020-12-03T14:00:32.439Z', credencial_unidade: { unidade_id: 696, credencial_id: 4, createdAt: '2020-12-03T18:09:55.914Z', updatedAt: '2020-12-03T18:09:55.914Z', ativo: true } }], ans: { id: 1, nome: 'Amil', ativo: true, createdAt: '2020-12-03T13:58:59.139Z', updatedAt: '2020-12-03T13:58:59.139Z' }, marca: { id: 3, nome: 'Alta', ativo: true, createdAt: '2020-12-03T18:09:11.570Z', updatedAt: '2020-12-03T18:09:11.570Z' } }, { id: 3, ans_id: 1, marca_id: 2, tipo_exame_id: null, codigo_prestador: null, cpf: null, cnpj: null, usuario: null, senha: null, ativo: true, descricao: null, url: null, ignorar_data_provider: null, createdAt: '2020-12-03T15:22:15.394Z', updatedAt: '2020-12-03T15:22:15.394Z', unidades: [], ans: { id: 1, nome: 'Amil', ativo: true, createdAt: '2020-12-03T13:58:59.139Z', updatedAt: '2020-12-03T13:58:59.139Z' }, marca: { id: 2, nome: 'Delboni', ativo: true, createdAt: '2020-12-03T14:00:29.817Z', updatedAt: '2020-12-03T14:00:29.817Z' } }, { id: 2, ans_id: 1, marca_id: 2, tipo_exame_id: null, codigo_prestador: null, cpf: null, cnpj: null, usuario: null, senha: null, ativo: true, descricao: null, url: null, ignorar_data_provider: null, createdAt: '2020-12-03T15:21:38.696Z', updatedAt: '2020-12-03T15:21:38.696Z', unidades: [], ans: { id: 1, nome: 'Amil', ativo: true, createdAt: '2020-12-03T13:58:59.139Z', updatedAt: '2020-12-03T13:58:59.139Z' }, marca: { id: 2, nome: 'Lavoisier', ativo: true, createdAt: '2020-12-03T14:00:29.817Z', updatedAt: '2020-12-03T14:00:29.817Z' } }, { id: 1, ans_id: 1, marca_id: 2, tipo_exame_id: null, codigo_prestador: null, cpf: null, cnpj: null, usuario: null, senha: null, ativo: true, descricao: null, url: null, ignorar_data_provider: null, createdAt: '2020-12-03T14:00:32.447Z', updatedAt: '2020-12-03T14:00:32.447Z', unidades: [{ id: 696, nome: 'ALPHAVILLE', sigla: 'DAP', ativo: true, createdAt: '2020-12-03T14:00:32.439Z', updatedAt: '2020-12-03T14:00:32.439Z', credencial_unidade: { unidade_id: 696, credencial_id: 1, createdAt: '2020-12-03T14:00:32.447Z', updatedAt: '2020-12-03T14:00:32.447Z', ativo: true } }], ans: { id: 1, nome: 'Bradesco', ativo: true, createdAt: '2020-12-03T13:58:59.139Z', updatedAt: '2020-12-03T13:58:59.139Z' }, marca: { id: 2, nome: 'Lavoisier', ativo: true, createdAt: '2020-12-03T14:00:29.817Z', updatedAt: '2020-12-03T14:00:29.817Z' } }]

module.exports = {
  dataProviderInitialSource,
  unitsToUpdateResponse,
  credentials,
  sortedCredentials
}
