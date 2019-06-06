let __fields = {
  name: {
    label: 'Nome',
    group: 1,
    component: 'text-field',
    list: true,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Nome',
    name: 'name'
  },
  father: {
    label: 'Nome Pai',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o nome do Pai',
    name: 'father'
  },
  mother: {
    label: 'Nome Mãe',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o nome da Mãe',
    name: 'mother'
  },
  cpf: {
    label: 'CPF/CNPJ',
    group: 1,
    component: 'masked-field',
    mask: '111.111.111-11',
    list: true,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o CPF/CNPJ',
    name: 'cpf'
  },
  rg: {
    label: 'RG',
    group: 1,
    component: 'text-field',
    list: true,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o RG',
    name: 'rg'
  },
  expedition_date: {
    label: 'Data de Expedição',
    group: 1,
    component: 'masked-field',
    mask: '11/11/1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a data de expedição',
    name: 'expedition_date'
  },
  state_expedition: {
    label: 'UF Expedição',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o UF de expedição',
    name: 'state_expedition'
  },
  birthday: {
    label: 'Data de Nascimento',
    group: 1,
    component: 'masked-field',
    mask: '11/11/1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha a data de nascimento',
    name: 'birthday'
  },
  gender: {
    label: 'Sexo',
    group: 1,
    component: 'select-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o Sexo',
    name: 'gender',
    selectOptions: [{label: 'Masculino', value: 'M'}, {label: 'Feminino', value: 'F'}]
  },
  naturalness: {
    label: 'Naturalidade',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Naturalidade',
    name: 'naturalness'
  },
  civil_state: {
    label: 'Estado Civil',
    group: 1,
    component: 'select-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Estado Civil',
    name: 'civil_state',
    selectOptions: [
      {label: 'Solteiro(a)', value: 'S'},
      {label: 'Viúvo(a)', value: 'V'},
      {label: 'Casado(a)', value: 'C'},
      {label: 'Divorciado(a)', value: 'D'},
      {label: 'Separado(a)', value: 'SP'}
    ]
  },
  cnh: {
    label: 'CNH',
    group: 1,
    component: 'select-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Possui CNH ?',
    name: 'cnh',
    selectOptions: [
      {label: 'SIM', value: true},
      {label: 'NÃO', value: false}
    ]
  },
  residential_address: {
    label: 'Endereço Residência',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o Endereço',
    name: 'residential_address'
  },
  city: {
    label: 'Cidade',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha a Cidade',
    name: 'city'
  },
  neighborhood: {
    label: 'Bairro',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o Bairro',
    name: 'neighborhood'
  },
  zipcode: {
    label: 'CEP',
    group: 1,
    component: 'masked-field',
    list: false,
    icon: '',
    mask: '11.111-111',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o CEP',
    name: 'zipcode'
  },
  residence_time: {
    label: 'Tempo na residência',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o tempo na residência',
    name: 'residence_time'
  },
  phone: {
    label: 'Telefone Fixo',
    group: 1,
    component: 'masked-field',
    mask: '1111-1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Telefone fixo',
    name: 'phone'
  },
  phone_type: {
    label: 'Tipo do telefone',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o tipo do telefone',
    name: 'phone_type',
    selectOptions: [
      {label: 'Principal', value: 'P'},
      {label: 'Recado', value: 'R'}
    ]
  },
  cell_phone: {
    label: 'Telefone Celular',
    group: 1,
    component: 'masked-field',
    mask: '(11) 1 1111-1111',
    list: true,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o telefone celular',
    name: 'cell_phone'
  },
  residence_type: {
    label: 'Tipo de residência',
    group: 1,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o tipo de residência',
    name: 'residence_type'
  },
  obs: {
    label: 'Observações',
    group: 1,
    component: 'textarea-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Observações',
    name: 'obs'
  },
  company_name: {
    label: 'Nome da empresa',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Nome da empresa',
    name: 'company_name'
  },
  company_cnpj: {
    label: 'CNPJ',
    group: 2,
    component: 'masked-field',
    mask: '11.111.111/1111-11',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o CNPJ',
    name: 'company_cnpj'
  },
  company_accountant: {
    label: 'Nome Contador',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o Nome do contador',
    name: 'company_accountant'
  },
  company_address: {
    label: 'Endereço',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Endereço da empresa',
    name: 'company_address'
  },
  company_neighborhood: {
    label: 'Bairro',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Bairro da empresa',
    name: 'company_neighborhood'
  },
  company_zipcode: {
    label: 'CEP',
    group: 2,
    component: 'masked-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o CEP',
    mask: '11.111-111',
    name: 'company_zipcode'
  },
  company_city: {
    label: 'Cidade',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Cidade',
    name: 'company_city'
  },
  company_role: {
    label: 'Função',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o Função',
    name: 'company_role'
  },
  company_work_time: {
    label: 'Tempo na empresa',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o tempo na empresa',
    name: 'company_work_time'
  },
  company_income: {
    label: 'Renda',
    group: 2,
    component: 'monetary-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a renda',
    name: 'company_income'
  },
  compony_income_others: {
    label: 'Outras Rendas',
    group: 2,
    component: 'monetary-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha as Outras Rendas',
    name: 'compony_income_others'
  },
  company_bank: {
    label: 'Banco',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Nome do Banco',
    name: 'company_bank'
  },
  company_agency: {
    label: 'Agência',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Agência',
    name: 'company_agency'
  },
  company_account: {
    label: 'Conta Corrente',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Conta Corrente',
    name: 'company_account'
  },
  company_time: {
    label: 'Tempo',
    group: 2,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Tempo',
    name: 'company_time'
  },
  guarantor_name: {
    label: 'Nome Avalista/Conjuge',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Nome do Avalista/Conjuge',
    name: 'guarantor_name'
  },
  guarantor_cpf: {
    label: 'CPF',
    group: 3,
    component: 'masked-field',
    mask: '111.111.111-11',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o CPF',
    name: 'guarantor_cpf'
  },
  guarantor_rg: {
    label: 'RG',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o RG',
    name: 'guarantor_rg'
  },
  guarantor_expedition_date: {
    label: 'Data de Expedição',
    group: 3,
    component: 'masked-field',
    mask: '11/11/1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Data de Expedição',
    name: 'guarantor_expedition_date'
  },
  guarantor_birthday: {
    label: 'Data de nascimento',
    group: 3,
    component: 'masked-field',
    mask: '11/11/1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a data de nascimento',
    name: 'guarantor_birthday'
  },
  guarantor_dependents: {
    label: 'Nº Dependentes',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o Nº Dependentes',
    name: 'guarantor_dependents'
  },
  guarantor_father: {
    label: 'Nome do Pai',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o nome do Pai',
    name: 'guarantor_father'
  },
  guarantor_mother: {
    label: 'Nome da Mãe',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o Nome da mãe',
    name: 'guarantor_mother'
  },
  guarantor_company: {
    label: 'Nome da Empresa',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o Nome da empresa',
    name: 'guarantor_company'
  },
  guarantor_company_address: {
    label: 'Endereço da Empresa',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o Endereço da Empresa',
    name: 'guarantor_company_address'
  },
  guarantor_neighborhood: {
    label: 'Bairro',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Bairro',
    name: 'guarantor_neighborhood'
  },
  guarantor_zipcode: {
    label: 'CEP',
    group: 3,
    component: 'masked-field',
    mask: '11.111-111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o CÈP',
    name: 'guarantor_zipcode'
  },
  guarantor_city: {
    label: 'Cidade',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a Cidade',
    name: 'guarantor_city'
  },
  guarantor_role: {
    label: 'Função',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-5',
    placeholder: 'Preencha a Função',
    name: 'guarantor_role'
  },
  guarantor_company_work_time: {
    label: 'Tempo na Empresa',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o tempo na empresa',
    name: 'guarantor_company_work_time'
  },
  guarantor_cell_phone_company: {
    label: 'Telefone Empresa',
    group: 3,
    component: 'text-field',
    mask: '1111-1111',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Telefone da empresa',
    name: 'guarantor_cell_phone_company'
  },
  guarantor_income: {
    label: 'Renda',
    group: 3,
    component: 'monetary-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha a Renda',
    name: 'guarantor_income'
  },
  guarantor_profession: {
    label: 'Profissão',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha a profissão',
    name: 'guarantor_profession'
  },
  guarantor_bank: {
    label: 'Banco',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o Banco',
    name: 'guarantor_bank'
  },
  guarantor_agency: {
    label: 'Agência',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o número da agência',
    name: 'guarantor_agency'
  },
  guarantor_account: {
    label: 'Conta Corrente',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha o número da conta',
    name: 'guarantor_account'
  },
  guarantor_time: {
    label: 'Tempo',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o tempo',
    name: 'guarantor_time'
  },
  guarantor_reference_name: {
    label: 'Referência ',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Nome da Referência',
    name: 'guarantor_reference_name'
  },
  guarantor_reference_phone: {
    label: 'Contato da Referência',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Telefone da Referência',
    name: 'guarantor_reference_phone'
  },
  guarantor_reference2_name: {
    label: 'Referência Adicional',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Nome da Referência Adicional',
    name: 'guarantor_reference2_name'
  },
  guarantor_reference2_phone: {
    label: 'Contato da Referência Adicional',
    group: 3,
    component: 'text-field',
    list: false,
    icon: '',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o Telefone da Referência Adicional',
    name: 'guarantor_reference2_phone'
  }
}

let __defaultFieldList = []

let fields = Object.keys(__fields)

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultBasePath = 'customers'
let __defaultOrderBy = 'name'
let __defaultSortBy = 'asc'
let __defaultIcon = 'group'
let __defaultResourceLabel = 'Pessoas'
let __defaultSingularResource = 'Pessoa'
let __listSearchFields = 'name:ilike;cpf:ilike;rg:ilike;cell_phone:ilike;'
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
