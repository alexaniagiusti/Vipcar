let __fields = {
  account_mov_type: {
    label: 'Tipo Conta Movimentação',
    component: 'text-field',
    list: true,
    icon: 'tag',
    placeholder: 'Preencha a Conta de Movimentação',
    name: 'account_mov_type'
  }
}
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
let __defaultFieldList = []

let fields = Object.keys(__fields)

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultBasePath = 'account-mov-type'
let __defaultOrderBy = 'account_mov_type'
let __defaultSortBy = 'asc'
let __defaultIcon = 'tag'
let __defaultResourceLabel = 'Tipo de Conta de Movimentação'
let __defaultSingularResource = 'Tipo de Conta'
let __listSearchFields = 'account_mov_type:ilike'
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
