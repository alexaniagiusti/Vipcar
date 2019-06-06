let __fields = [
  {
    label: 'Nome - Operadora de Cartão',
    component: 'text-field',
    list: true,
    icon: 'edit',
    placeholder: 'Nome - Operadora de Cartão',
    name: 'description'
  },
  // DEBIT
  {
    label: 'Taxa cobrada à vista',
    component: 'percent-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha a taxa cobrada À VISTA',
    name: 'debit_percent_in_cash'
  },
  // DEBIT
  {
    label: 'Tipo de Repasse',
    component: 'select-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha o tipo de repasse',
    name: 'debit_pass_through_type'
  },
  // DEBIT
  {
    label: 'Dia repasse',
    component: 'text-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha o dia de repasse',
    name: 'debit_pass_through_day'
  },
  // CREDIT
  {
    label: 'Taxa cobrada À VISTA',
    component: 'percent-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha a taxa cobrada À VISTA',
    name: 'credit_percent_in_cash'
  },
  // CREDIT
  {
    label: 'Taxa cobrada PARCELADO LOJA',
    component: 'percent-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha a taxa cobrada PARCELADO LOJA',
    name: 'credit_in_installment_store'
  },
  // CREDIT
  {
    label: 'Taxa cobrada PARCELADO ADMINISTRADORA',
    component: 'percent-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha a taxa cobrada PARCELADO ADMINISTRADORA',
    name: 'credit_in_installment_administrator'
  },
  // CREDIT
  {
    label: 'Tipo de Repasse',
    component: 'select-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha o tipo de repasse',
    name: 'credit_pass_through_type'
  },
  // CREDIT
  {
    label: 'Dia repasse',
    component: 'text-field',
    list: false,
    icon: 'edit',
    placeholder: 'Preencha o dia de repasse',
    name: 'credit_pass_through_day'
  },
  {
    label: 'Ativo',
    component: 'select-field',
    list: true,
    icon: 'edit',
    placeholder: 'Selecione se estiver ativo',
    name: 'active'
  }
]

// let __fields = [
//   {
//     label: 'Conta de Movimentação',
//     component: 'text-field',
//     list: true,
//     icon: 'external-link',
//     placeholder: 'Preencha a Conta de Movimentação',
//     name: 'account_mov_name'
//   },
//   {
//     label: 'Tipo de Conta',
//     component: 'select-field',
//     icon: 'clone',
//     list: true,
//     placeholder: 'Preencha a Conta de Movimentação',
//     name: 'account_mov_name'
//   },
//   {
//     label: 'Nome do Banco',
//     component: 'text-field',
//     icon: 'institution',
//     list: true,
//     placeholder: 'Preencha o Nome do banco',
//     name: 'bank_name'
//   },
//   {
//     label: 'Agência',
//     component: 'text-field',
//     icon: 'home',
//     list: true,
//     placeholder: 'Preencha a Agência',
//     name: 'agency_name'
//   },
//   {
//     label: 'Conta Corrente',
//     component: 'text-field',
//     icon: 'credit-card',
//     list: false,
//     placeholder: 'Preencha a Conta Corrente',
//     name: 'checking_account'
//   },
//   {
//     label: 'Saldo Inicial',
//     component: 'text-field',
//     icon: 'dollar',
//     list: false,
//     placeholder: 'Preencha o Saldo Inicial',
//     name: 'initial_balance'
//   }
// ]

let __defaultBasePath = 'card-operators'
let __defaultOrderBy = 'description'
let __defaultSortBy = 'asc'
let __defaultIcon = 'credit-card'
let __defaultResourceLabel = 'Operadores de Cartão'
let __defaultSingularResource = 'Operadora de cartão'
let __listSearchFields = 'description:ilike'
export { __fields }
export { __defaultBasePath }
export { __defaultOrderBy }
export { __defaultSortBy }
export { __defaultIcon }
export { __defaultResourceLabel }
export { __defaultSingularResource }
export { __listSearchFields }
export default {}
