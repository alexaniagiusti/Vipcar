let __fields = {
  description: {
    label: 'Descrição',
    component: 'text-field',
    list: true,
    icon: 'external-link',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha a Descrição',
    name: 'description'
  }
}

let __defaultFieldList = []

let fields = Object.keys(__fields)

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultBasePath = 'payment-method'
let __defaultOrderBy = 'description'
let __defaultSortBy = 'asc'
let __defaultIcon = 'credit-card'
let __defaultResourceLabel = 'Tipos de Pagamento'
let __defaultSingularResource = 'Tipo de Pagamento'
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
