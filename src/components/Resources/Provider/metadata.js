let __fields = {
  name: {
    label: 'Fornecedor',
    component: 'text-field',
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o nome da Fornecedor',
    name: 'name'
  },
  cnpj_cpf: {
    label: 'CNPJ / CPF',
    component: 'masked-field',
    icon: 'address-card-o',
    wrapperClass: 'col-lg-6',
    list: true,
    placeholder: 'Preencha o CNPJ/CPF',
    mask: '11.111.111/1111-11',
    name: 'cnpj_cpf'
  },
  contact: {
    label: 'Contato',
    component: 'text-field',
    list: true,
    icon: 'user',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o Nome do Contato',
    name: 'contact'
  },
  cell_phone: {
    label: 'Celular',
    component: 'masked-field',
    icon: 'mobile-phone',
    wrapperClass: 'col-lg-4',
    list: true,
    mask: '(11) 1 1111-1111',
    placeholder: 'Preencha o Celular',
    name: 'cell_phone'
  },
  cell_phone_2: {
    label: 'Celular Adicional',
    component: 'masked-field',
    icon: 'mobile-phone',
    wrapperClass: 'col-lg-4',
    mask: '(11) 1 1111-1111',
    list: false,
    placeholder: 'Preencha o telefone celular adicional',
    name: 'cell_phone_2'
  },
  activity_branch: {
    label: 'Ramo de Atividade',
    component: 'text-field',
    icon: 'industry',
    wrapperClass: 'col-lg-4',
    list: false,
    placeholder: 'Preencha o ramo de atividade',
    name: 'activity_branch'
  },
  address: {
    label: 'Endereço',
    component: 'text-field',
    icon: 'map-marker',
    wrapperClass: 'col-lg-4',
    list: false,
    placeholder: 'Preencha o Endereço',
    name: 'address'
  },
  address_number: {
    label: 'Número Endereço',
    component: 'text-field',
    icon: 'map-o',
    wrapperClass: 'col-lg-2',
    list: false,
    placeholder: 'Preencha o Número do endereço',
    name: 'address_number'
  },
  address_complement: {
    label: 'Complemento',
    component: 'text-field',
    icon: 'map-signs',
    wrapperClass: 'col-lg-3',
    list: false,
    placeholder: 'Preencha o Complemento',
    name: 'address_complement'
  },
  neighborhood: {
    label: 'Bairro',
    component: 'text-field',
    icon: 'location-arrow',
    wrapperClass: 'col-lg-3',
    list: false,
    placeholder: 'Preencha o Bairro',
    name: 'neighborhood'
  },
  zipcode: {
    label: 'CEP',
    component: 'masked-field',
    icon: 'edit',
    mask: '11.111-111',
    wrapperClass: 'col-lg-3',
    list: false,
    placeholder: 'Preencha o CEP',
    name: 'zipcode'
  },
  state: {
    label: 'Estado',
    component: 'text-field',
    icon: 'location-arrow',
    wrapperClass: 'col-lg-3',
    list: false,
    placeholder: 'Preencha o Estado',
    name: 'state'
  },
  city: {
    label: 'Cidade',
    component: 'text-field',
    icon: 'location-arrow',
    wrapperClass: 'col-lg-3',
    list: false,
    placeholder: 'Preencha a Cidade',
    name: 'city'
  },
  phone: {
    label: 'Telefone',
    component: 'masked-field',
    icon: 'phone-square',
    wrapperClass: 'col-lg-3',
    mask: '1111-1111',
    list: false,
    placeholder: 'Preencha o telefone fixo',
    name: 'phone'
  },
  email: {
    label: 'Email',
    component: 'text-field',
    icon: 'at',
    wrapperClass: 'col-lg-12',
    list: false,
    placeholder: 'Preencha o email',
    name: 'email'
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

let __defaultBasePath = 'providers'
let __defaultOrderBy = 'name'
let __defaultSortBy = 'asc'
let __defaultIcon = 'industry'
let __defaultResourceLabel = 'Fornecedores'
let __defaultSingularResource = 'Fornecedor'
let __listSearchFields = 'name:ilike;cnpj_cpf:ilike;activity_branch:ilike;email:ilike;contact:ilike;cell_phone:ilike'
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
