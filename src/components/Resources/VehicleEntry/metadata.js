let __fields = {
  state_id: {
    label: 'Situação',
    component: 'select-field',
    selectOptions: [{value: '1', label: 'Disponível'}, {value: '2', label: 'Indisponível'}],
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Selecione se estiver disponível',
    name: 'state_id',
    readonly: true,
    group: 1
  },
  tenant_id: {
    label: 'Unidade',
    component: 'entity-field',
    usingAsProvider: '/available-tenants-to-transfer',
    usingAsLabel: 'tenant_fancy_name',
    resourceKey: 'tenant',
    usingAsValue: 'tenant_id',
    list: true,
    orderBy: 'tenants.tenant_fancy_name',
    icon: 'external-link',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha a Unidade',
    name: 'tenant_id'
  },
  brand: {
    label: 'Marca',
    component: 'entity-field',
    editComponent: 'text-field',
    usingAsProvider: '/vehicle-brands',
    usingAsLabel: 'brand',
    // resourceKey: 'vehicle_fipe',
    usingAsValue: 'brand',
    hasRelated: true,
    related: {
      formField: 'model',
      searchFieldAs: 'brand.brand'
    },
    list: true,
    icon: 'tags',
    wrapperClass: 'col-lg-6',
    placeholder: '',
    name: 'brand',
    disableEdit: false,
    group: 1
  },
  model: {
    label: 'Modelo',
    component: 'entity-field',
    editComponent: 'text-field',
    usingAsProvider: '/vehicle-models',
    // resourceKey: 'model',
    usingAsLabel: 'description',
    usingAsValue: 'description',
    hasRelated: true,
    related: {
      formField: 'year',
      searchFieldAs: 'model.description'
    },
    lazy: true,
    list: true,
    icon: 'certificate',
    wrapperClass: 'col-lg-6',
    placeholder: '',
    name: 'model',
    disableEdit: false,
    group: 1
  },
  year: {
    label: 'Ano',
    component: 'entity-field',
    editComponent: 'text-field',
    usingAsProvider: '/vehicle-years',
    usingAsLabel: 'description',
    usingAsValue: 'description',
    lazy: true,
    list: true,
    icon: 'calendar',
    wrapperClass: 'col-lg-6',
    placeholder: '',
    name: 'year',
    disableEdit: false,
    group: 1
  },
  vehicle_fipe_id: {
    label: 'Veículo',
    component: 'entity-field',
    editComponent: 'text-field',
    usingAsProvider: '/vehicle-fipes',
    usingAsLabel: 'full_name',
    usingAsValue: 'id_key',
    lazy: true,
    list: false,
    icon: 'car',
    wrapperClass: 'col-lg-6',
    placeholder: '',
    name: 'vehicle_fipe_id',
    disableEdit: false,
    group: 1
  },
  km: {
    label: 'KM',
    component: 'text-field',
    list: false,
    icon: 'tachometer',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha o KM do veículo',
    name: 'km',
    group: 1
  },
  color: {
    label: 'Cor',
    component: 'text-field',
    list: true,
    icon: 'paint-brush',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a cor do veículo',
    name: 'color',
    group: 1
  },
  fabrication_year: {
    label: 'Ano Fab/Ano Modelo',
    component: 'masked-field',
    mask: '1111/1111',
    list: false,
    icon: 'industry',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o ano de fabricação/modelo',
    name: 'fabrication_year',
    group: 1
  },
  commutation: {
    label: 'Câmbio',
    component: 'text-field',
    list: false,
    icon: 'edit',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha o câmbio do veículo',
    name: 'commutation',
    group: 1
  },
  number_ports: {
    label: 'Quantidade de Portas',
    component: 'text-field',
    list: false,
    icon: 'circle',
    wrapperClass: 'col-lg-6',
    placeholder: 'Preencha a quantidade de portas',
    name: 'number_ports',
    group: 1
  },
  plate: {
    label: 'Placa',
    component: 'text-field',
    list: true,
    icon: 'address-card',
    wrapperClass: 'col-lg-4',
    placeholder: 'Preencha a placa',
    name: 'plate',
    group: 1
  },
  renavam: {
    label: 'Renavam',
    component: 'text-field',
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-8',
    placeholder: 'Preencha o renavam',
    name: 'renavam',
    group: 1
  },
  chassi: {
    label: 'Chassi',
    component: 'text-field',
    list: false,
    icon: 'tags',
    wrapperClass: 'col-lg-12',
    placeholder: 'Preencha o chassi',
    name: 'chassi',
    group: 1
  },
  _detail_full_name: {
    label: 'Descrição',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'car',
    wrapperClass: 'col-lg-8',
    details: true,
    placeholder: '',
    name: 'detail_full_name',
    group: 1
  },
  _detail_year: {
    label: 'Ano do Modelo',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'calendar',
    wrapperClass: 'col-lg-4',
    details: true,
    placeholder: '',
    name: 'detail_year',
    group: 1
  },
  _detail_brand: {
    label: 'Marca',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tags',
    wrapperClass: 'col-lg-4',
    details: true,
    placeholder: '',
    name: 'detail_brand',
    group: 1
  },
  _detail_model: {
    label: 'Modelo',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'certificate',
    wrapperClass: 'col-lg-4',
    details: true,
    placeholder: '',
    name: 'detail_model',
    group: 1
  },
  detail_fipe_code: {
    label: 'Código FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'key',
    wrapperClass: 'col-lg-4',
    details: true,
    placeholder: '',
    name: 'detail_fipe_code',
    group: 1
  },
  detail_reference_month: {
    label: 'Referência',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'calendar',
    wrapperClass: 'col-lg-6',
    details: true,
    placeholder: '',
    name: 'detail_reference_month',
    group: 1
  },
  detail_amount: {
    label: 'Preço médio',
    component: 'monetary-field',
    lazy: true,
    list: false,
    icon: 'dollar',
    wrapperClass: 'col-lg-6',
    details: true,
    placeholder: '',
    name: 'detail_amount',
    group: 1
  },
  detail_fuel: {
    label: 'Combustível',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tachometer',
    wrapperClass: 'col-lg-6',
    details: true,
    placeholder: '',
    name: 'detail_fuel',
    group: 1
  },
  detail_vehicle_type: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-6',
    details: true,
    placeholder: '',
    name: 'detail_vehicle_type',
    group: 1
  },
  consigned: {
    label: 'Veículo Consignado?',
    component: 'select-field',
    selectOptions: [{value: 0, label: 'Não'}, {value: 1, label: 'Sim'}],
    list: true,
    icon: 'edit',
    wrapperClass: 'col-lg-12',
    placeholder: 'Selecione se estiver disponível',
    name: 'consigned',
    group: 2
  },
  provider_id: {
    label: 'Fornecedor',
    component: 'entity-field',
    usingAsProvider: '/customers',
    usingAsLabel: 'name',
    resourceKey: 'name',
    usingAsValue: 'id_key',
    list: false,
    group: 2,
    orderBy: 'customers.name',
    icon: 'industry',
    wrapperClass: 'col-lg-12',
    placeholder: 'Selecione o forneceodr',
    name: 'provider_id'
  },
  acquisition_date: {
    label: 'Data de aquisição',
    group: 2,
    component: 'masked-field',
    mask: '11/11/1111',
    list: false,
    icon: 'calendar',
    wrapperClass: 'col-lg-3',
    placeholder: 'Preencha a data de aquisição',
    name: 'acquisition_date'
  },
  mean_price: {
    label: 'Valor de aquisição',
    component: 'monetary-field',
    lazy: true,
    list: false,
    icon: 'dollar',
    wrapperClass: 'col-lg-3',
    placeholder: 'Valor de aquisição',
    name: 'mean_price',
    group: 2
  },
  sale_price: {
    label: 'Preço de Venda',
    component: 'monetary-field',
    lazy: true,
    list: true,
    icon: 'dollar',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha o preço de venda',
    name: 'sale_price',
    group: 2
  },
  commission: {
    label: 'Comissão de venda',
    component: 'monetary-field',
    lazy: true,
    list: false,
    icon: 'dollar',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha a comissão de venda (em R$)',
    name: 'commission',
    group: 2
  },
  discount_margin: {
    label: 'Margem de Desconto (R$)',
    component: 'monetary-field',
    lazy: true,
    list: false,
    icon: 'dollar',
    wrapperClass: 'col-lg-2',
    placeholder: 'Preencha a margem de desconto (em R$)',
    name: 'discount_margin',
    group: 2
  },
  detail_vehicle_type2s: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },
  detail_vehicle_type2s1: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },
  detail_vehicle_type2s222: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },
  detail_vehicle_type2s123123: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },
  detail_vehicle_type2s12: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },
  detail_vehicle_type2s23: {
    label: 'Tipo de Veículo FIPE',
    component: 'text-field',
    lazy: true,
    list: false,
    icon: 'tag',
    wrapperClass: 'col-lg-4',
    placeholder: '',
    name: 'detail_vehicle_type2s',
    group: 3
  },

  /**
   * ICMS
   */
  icms_rate: {
    label: 'Taxa de Imposto (%)',
    component: 'percent-field',
    list: false,
    wrapperClass: 'col-lg-2',
    placeholder: 'Taxa de Imposto',
    name: 'icms_rate',
    group: 4
  },
  icms_basetax_st_reduction: {
    label: 'Base Tax ST Reduction',
    component: 'percent-field',
    list: false,
    wrapperClass: 'col-lg-2',
    placeholder: 'Base Tax ST Reduction',
    name: 'icms_basetax_st_reduction',
    group: 4
  },
  icms_basetax_modality: {
    label: 'ICMS Base Tax Modality',
    component: 'text-field',
    list: false,
    wrapperClass: 'col-lg-2',
    placeholder: 'ICMS Base Tax Modality',
    name: 'icms_basetax_modality',
    group: 4
  },
  icms_cst: {
    label: 'ICMS CST',
    component: 'text-field',
    list: false,
    wrapperClass: 'col-lg-3',
    placeholder: 'ICMS CST',
    name: 'icms_cst',
    group: 4
  },
  icms_origin: {
    label: 'Origem ICMS',
    component: 'text-field',
    list: false,
    wrapperClass: 'col-lg-3',
    placeholder: 'Origem ICMS',
    name: 'icms_origin',
    group: 4
  },

  /**
   * PIS
   */
  pis_rate: {
    label: 'PIS RATE',
    component: 'percent-field',
    list: false,
    wrapperClass: 'col-lg-6',
    placeholder: 'Taxa de Imposto',
    name: 'pis_rate',
    group: 5
  },
  pis_cst: {
    label: 'PIS CST',
    component: 'text-field',
    list: false,
    wrapperClass: 'col-lg-6',
    placeholder: 'Base Tax ST Reduction',
    name: 'pis_cst',
    group: 5
  },

  /**
   * COFINS
   */
  cofins_rate: {
    label: 'COFINS Rate',
    component: 'percent-field',
    list: false,
    wrapperClass: 'col-lg-6',
    placeholder: 'ICMS Base Tax Modality',
    name: 'cofins_rate',
    group: 6
  },
  cofins_cst: {
    label: 'COFINS CST',
    component: 'text-field',
    list: false,
    wrapperClass: 'col-lg-6',
    placeholder: 'ICMS CST',
    name: 'cofins_cst',
    group: 6
  }
}

let __defaultFieldList = []

let fields = Object.keys(__fields)

let __defaultFieldAmountSection = []

fields.forEach(field => {
  if (__fields[field].group === 2) {
    __defaultFieldAmountSection.push(__fields[field])
  }
})

fields.forEach(field => {
  if (__fields[field].list === true) {
    __defaultFieldList.push(__fields[field])
  }
})

let __defaultFieldsDetail = []

fields.forEach(field => {
  if (__fields[field].details === true) {
    __defaultFieldsDetail.push(__fields[field])
  }
})

let __defaultFieldICMSSection = []

fields.forEach(field => {
  if (__fields[field].group === 4) {
    __defaultFieldICMSSection.push(__fields[field])
  }
})

let __defaultFieldPISSection = []

fields.forEach(field => {
  if (__fields[field].group === 5) {
    __defaultFieldPISSection.push(__fields[field])
  }
})

let __defaultFieldCOFINSSection = []

fields.forEach(field => {
  if (__fields[field].group === 6) {
    __defaultFieldCOFINSSection.push(__fields[field])
  }
})

let __defaultBasePath = 'vehicle-entry'
let __defaultOrderBy = 'fipe_brand'
let __defaultSortBy = 'asc'
let __defaultIcon = 'car'
let __defaultResourceLabel = 'Entrada de Veículos'
let __defaultSingularResource = 'Entrada de Veículo'
let __listSearchFields = 'fipe_brand:ilike;fipe_model:ilike;color:ilike;fabrication_year:ilike;plate:ilike'
export { __fields }
export { __defaultBasePath }
export { __defaultOrderBy }
export { __defaultSortBy }
export { __defaultIcon }
export { __defaultResourceLabel }
export { __defaultSingularResource }
export { __listSearchFields }
export { __defaultFieldList }
export { __defaultFieldsDetail }
export { __defaultFieldAmountSection }
export { __defaultFieldICMSSection }
export { __defaultFieldPISSection }
export { __defaultFieldCOFINSSection }
export default {}
