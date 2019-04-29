let __fields = {
  name: {
    label: 'Nome',
    component: 'text-field',
    list: true,
    icon: 'user',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Nome',
    name: 'name'
  },
  profile_id: {
    label: 'Perfil',
    component: 'entity-field',
    usingAsProvider: '/profiles',
    usingAsLabel: 'description',
    resourceKey: 'profile',
    usingAsValue: 'id_key',
    list: true,
    orderBy: 'proiles.description',
    icon: 'tag',
    wrapperClass: 'col-lg-12',
    placeholder: 'Selecione o perfil',
    name: 'profile_id'
  },
  login: {
    label: 'Login',
    component: 'text-field',
    list: true,
    icon: 'address-card-o',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o login',
    name: 'login'
  },
  email: {
    label: 'Email',
    component: 'text-field',
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o email',
    name: 'email'
  },
  password: {
    label: 'Senha',
    component: 'text-field',
    list: false,
    icon: 'key',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha a senha',
    name: 'password'
  },
  active: {
    label: 'Ativo',
    component: 'select-field',
    selectOptions: [{value: 'true', label: 'SIM'}, {value: 'false', label: 'NÃO'}],
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Selecione se estiver ativo',
    name: 'active'
  }
}

let __defaultFieldList = []

let fields = Object.keys(__fields)

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultBasePath = 'employees'
let __defaultOrderBy = 'login'
let __defaultSortBy = 'asc'
let __defaultIcon = 'users'
let __defaultResourceLabel = 'Funcionários'
let __defaultSingularResource = 'Funcionário'
let __listSearchFields = 'name:ilike;login:ilike;email:ilike'
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
