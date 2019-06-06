let __fields = {
  description: {
    label: 'Nome',
    component: 'text-field',
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o nome do item do checklist',
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

let __defaultBasePath = 'checklist-items'
let __defaultOrderBy = 'description'
let __defaultSortBy = 'asc'
let __defaultIcon = 'tag'
let __defaultResourceLabel = 'Itens do Checklist'
let __defaultSingularResource = 'Item do checklist'
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
