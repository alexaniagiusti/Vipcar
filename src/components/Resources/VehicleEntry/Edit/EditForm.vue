<template>
    <div>
      <form :id="'main-form-'+ this.group" class="smart-form">
        <fieldset>
          <legend>
            <i class="fa fa-list"></i> Dados Gerais
              <span v-if="sales.length > 0">
                <a v-if="typeof(sales[0].nf) === 'object'" style="padding: 4px;" @click.prevent="emitNFE" href="#" class="btn btn-primary pull-right">
                  Emitir Nota Fiscal
                </a>
                <a v-if="typeof(sales[0].nf) === 'string'" style="padding: 4px;" @click.prevent="emitNFE" href="#" class="btn btn-success pull-right">
                  Imprimir DANFE
                </a>
              </span>
        </legend>
          <template v-for="field in __fields">
            <component
              v-if="field.name !== 'mean_price' || (field.name == 'mean_price' && profile.map['vehicle-entries'].includes('show-acquisition-price'))"
              :is="checkComponentType(field)"
              :wrapper-class="field.wrapperClass"
              :data-vv-as="field.label"
              :lazy="field.lazy"
              :select-options="field.selectOptions"
              :using-as-provider="field.usingAsProvider"
              :using-as-label="field.usingAsLabel"
              :order-by="field.orderBy"
              :has-related="field.hasRelated"
              :related="field.related"
              :mask="field.mask"
              :using-as-value="field.usingAsValue"
              v-validate="$data[field['name'] + '_rule']"
              :name="field.name"
              v-model="$data[getKeyValue(field)]"
              :icon="field.icon"
              :label="field.label"
              :placeholder="field.placeholder"
              :readonly="getReadonlyStateField(field) || unidadesDiferentes"
              :custom-error="errors.first(field.name)"
              :valid="fields.valid(field.name)"
              :failed="fields.failed(field.name)">
            </component>
          </template>
        </fieldset>
        <!-- <fieldset>
          <legend><i class="fa fa-dollar"></i> Valores</legend>
          <template v-for="field in __defaultFieldAmountSection">
            <component
            :is="field.component"
            :wrapper-class="field.wrapperClass"
            :data-vv-as="field.label"
            :select-options="field.selectOptions"
            :using-as-provider="field.usingAsProvider"
            :using-as-label="field.usingAsLabel"
            :mask="field.mask"
            :lazy="field.lazy"
            :using-as-value="field.usingAsValue"
            :has-related="field.hasRelated"
            :related="field.related"
            v-validate="$data[field['name'] + '_rule']"
            :name="field.name"
            v-model="$data[field['name']]"
            :icon="field.icon"
            :label="field.label"
            :placeholder="field.placeholder"
            :readonly="readonly"
            :custom-error="errors.first(field.name)"
            :valid="fields.valid(field.name)"
            :failed="fields.failed(field.name)"
            ></component>
          </template>
        </fieldset> -->
      </form>
    </div>
</template>

<script>
  import jquery from 'jquery'
  import { map, filter } from 'lodash'
  import Api from './../Api'
  import { mapState } from 'vuex'
  import {
    __fields,
    __defaultBasePath,
    __defaultFieldAmountSection
  } from './../metadata'

  export default {
    props: {
      formReadonly: {
        type: Boolean,
        default: false
      },
      group: {
        type: Number
      }
    },
    watch: {
      full_name: function (v) {
        this.vehicle_fipe_id = v
      },
      '$route' (to, from) {
        this.$parent.refreshed = false
        this.createdFunction()
      }
    },
    computed: {
      unidadesDiferentes () {
        return Number(this.currentTenant) !== Number(this.in_tenant)
      },
      currentTenant () {
        return localStorage.getItem('current-tenant-idkey')
      },
      __defaultFieldAmountSection () {
        return __defaultFieldAmountSection
      },
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token,
        profile: state => state.user.profile
      }),
      basePath () {
        return __defaultBasePath
      },
      __fields () {
        return filter(__fields, el => !el.name.startsWith('detail'))
      }
    },
    created () {
      this.createdFunction()
    },
    data () {
      let dynamicData = {}
      map(__fields, (field) => {
        let ruleKey = `${field.name}_rule`
        dynamicData[field.name] = ''
        dynamicData[ruleKey] = ''
      })

      return {
        id: null,
        sales: [],
        readonly: false,
        full_name: null,
        in_tenant: undefined,
        lockStateId: false,
        ...dynamicData
      }
    },
    methods: {
      createdFunction () {
        this.$root.axios.get(`${this.basePath}/rules/update`).then(({ data }) => {
          let rules = data.data.rules

          Object.keys(rules).forEach((prop, index) => {
            if (prop !== 'vehicle_fipe_id') {
              this[prop + '_rule'] = rules[prop]
            }
          })
        })

        this.readonly = this.formReadonly
        this.api = new Api(this, this.basePath)
        this.id = this.$route.params.id || this.$route.query.x
        this.fetch()
      },
      getReadonlyStateField (field) {
        if (field.name === 'mean_price' || field.name === 'sale_price' || field.name === 'commission') {
          if (this.profile.map['vehicle-entries'].includes('edit-acquisition-price')) {
            return false
          } else {
            return true
          }
        }
      },
      checkComponentType (field) {
        if (field.editComponent) {
          return field.editComponent
        } else {
          return field.component
        }
      },
      emitNFE () {
        this.$root.axios.post('vehicle-sale/emit-nfe/' + this.id).then(({data}) => {
          if (data.error) {
            alert('Houve um erro ao emitir a nota fiscal.')
          } else {
            this.sales[0].nf = data.nf_id
            alert('Aguardando geração do DANFE. Consulte o Módulo Financeiro > Notas Fiscais para imprimir.')
          }
        })
      },
      getKeyValue (field) {
        if (field.name === 'vehicle_fipe_id') {
          return 'full_name'
        }
        return field['name']
      },
      // getModelField (field) {
      //   if (field.name === 'vehicle_fipe_id') {
      //     return this.$data['full_name']
      //   }
      //   return this.$data[field['name']]
      // },
      fetch () {
        this.api.find(this.id, ({ data, sales }) => {
          if (sales.length) {
            this.lockStateId = true
          }

          this.sales = sales
          Object.keys(data).forEach((key) => {
            this[key] = data[key]
            if (key === 'tenant_id') {
              this.in_tenant = data.tenant_id
            }
          })
          // console.log(this.$data)
          this.clearState()
          this.$parent.refreshed = true
        })
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
          this.$router.push(`/${this.basePath}`)
        })
      },
      disableEdit () {
        this.fetch()
        this.readonly = true
      },
      allowEdit () {
        new Promise((resolve, reject) => {
          this.readonly = false
          resolve(this.readonly)
        }).then((readonly) => {
          !readonly ? jquery(`#main-form-${this.group} [type=text]`).first().focus() : ''
        })
      }
    }
  }
</script>
