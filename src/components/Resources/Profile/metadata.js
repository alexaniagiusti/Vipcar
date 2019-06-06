let __fields = {
  description: {
    label: 'Descrição',
    component: 'text-field',
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Descrição',
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

let __defaultBasePath = 'profiles'
let __defaultOrderBy = 'description'
let __defaultSortBy = 'asc'
let __defaultIcon = 'tags'
let __defaultResourceLabel = 'Perfis'
let __defaultSingularResource = 'Perfil'
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
