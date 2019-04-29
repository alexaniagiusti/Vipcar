<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <section class="col col-lg-12">
          <label class="label">
            <i class="fa fa-user"></i> Tipo de cadastro
          </label>

          <label>
            <input type="radio" v-model="type" value="pf" checked="checked" autocomplete="off" name="type"> Pessoa Física
          </label>
          <label>
            <input type="radio" v-model="type" value="pj" autocomplete="off" name="type">
Pessoa Jurídica
              <span> &nbsp; <span style="display: none;"> </span> </span>
          </label>
        </section>
        <template v-for="field in __fields">
          <component
          :is="field.component"
          :wrapper-class="field.wrapperClass"
          :data-vv-as="field.label"
          :select-options="field.selectOptions"
          :using-as-provider="field.usingAsProvider"
          :using-as-label="field.usingAsLabel"
          :mask="
          field['name'] === 'cpf' && type === 'pf' ? field.mask : 
          field['name'] === 'cpf' && type === 'pj' ? '11.111.111/1111-11' : field.mask"
          :using-as-value="field.usingAsValue"
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
          >
        </component>
      </template>
    </div>
  </fieldset>
</form>
</template>

<script>
  import jquery from 'jquery'
  import Api from './../Api'
  import { map } from 'lodash'
  import {
    __fields,
    __defaultBasePath
  } from './../metadata'

  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      basePath () {
        return __defaultBasePath
      },
      __fields () {
        return __fields
      }
    },
    created () {
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)

      this.$root.axios.get(`${this.basePath}/rules/create`).then(({ data }) => {
        let rules = data.data.rules
        let keys = Object.keys(rules)
        keys.forEach((prop, index) => {
          if (rules[prop].indexOf('d/m/Y') < 0) {
            this[prop + '_rule'] = rules[prop]
          }
        })
      })
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
        readonly: false,
        cpf: undefined,
        type: undefined,
        ...dynamicData
      }
    },
    methods: {
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      create () {
        this.$validator.validateAll().then(() => {
          this.api.create(this._data, ({ data }) => {
            if (data.duplicated) {
              alert('CPF/CNPJ Já cadastrado no sistema')
              return
            }

            this.$router.push(`/${this.basePath}`)
          })
        }).catch(() => {})
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
          !readonly ? jquery('#main-form [type=text]').first().focus() : ''
        })
      }
    }
  }
</script>
