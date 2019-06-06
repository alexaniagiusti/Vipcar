let __fields = {
  description: {
    label: 'Conta de Movimentação',
    component: 'text-field',
    list: true,
    icon: 'external-link',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha a Conta de Movimentação',
    name: 'description'
  },
  account_mov_type_id: {
    label: 'Tipo de Conta',
    component: 'entity-field',
    usingAsProvider: '/account-mov-type',
    usingAsLabel: 'account_mov_type',
    resourceKey: 'relation_account_mov_type',
    usingAsValue: 'id_key',
    list: true,
    orderBy: 'account_mov_types.account_mov_type',
    icon: 'external-link',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Tipo de Conta',
    name: 'account_mov_type_id'
  },
  bank_name: {
    label: 'Nome do Banco',
    component: 'text-field',
    icon: 'institution',
    wrapperClass: 'col-lg-6',
    list: true,
    placeholder: 'Preencha o Nome do banco',
    name: 'bank_name'
  },
  agency: {
    label: 'Agência',
    component: 'text-field',
    icon: 'home',
    wrapperClass: 'col-lg-6',
    list: true,
    placeholder: 'Preencha a Agência',
    name: 'agency'
  },
  account: {
    label: 'Conta Corrente',
    component: 'text-field',
    icon: 'credit-card',
    wrapperClass: 'col-lg-6',
    list: false,
    placeholder: 'Preencha a Conta Corrente',
    name: 'account'
  },
  initial_balance: {
    label: 'Saldo Inicial',
    component: 'monetary-field',
    icon: 'dollar',
    wrapperClass: 'col-lg-6',
    list: false,
    placeholder: 'Preencha o Saldo Inicial',
    name: 'initial_balance'
  }
}

let __defaultFieldList = []

let fields = Object.keys(__fields)

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultBasePath = 'account-mov'
let __defaultOrderBy = 'description'
let __defaultSortBy = 'asc'
let __defaultIcon = 'exchange'
let __defaultResourceLabel = 'Conta de Movimentação'
let __defaultSingularResource = 'Conta de Movimentação'
let __listSearchFields = 'description:ilike'
export { __fields }
export { __defaultBasePath }
export { __defaultOrderBy }
export { __defaultSortBy }
export { __defaultIcon }
export { __defaultResourceLabel }
export { __defaultSingularResource }
export { __listSearchFields }
export { __defaultFieldList }
export default {}
