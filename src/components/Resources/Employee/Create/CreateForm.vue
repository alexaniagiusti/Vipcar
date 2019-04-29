<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <section>
        <label><i class="fa fa-lg fa-building"></i> Unidades</label>
        <div class="inline-group">
          <template v-for="tenant in availableTenants">
            <label class="checkbox">
              <input v-model="userTenants" :value="tenant.id" type="checkbox" name="checkbox-inline">
              <i></i> {{ tenant.tenant_name }}
            </label>
          </template>
        </div>
      </section>
      <div class="row">
        <template v-for="field in __fields">
          <component
          :is="field.component"
          :wrapper-class="field.wrapperClass"
          :data-vv-as="field.label"
          :select-options="field.selectOptions"
          :using-as-provider="field.usingAsProvider"
          :using-as-label="field.usingAsLabel"
          :mask="field.mask"
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
          this[prop + '_rule'] = rules[prop]
        })
      })
      this.$root.axios.get('tenants').then(({data}) => {
        this.availableTenants = data.data.data
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
        availableTenants: [],
        userTenants: [],
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
          console.log(this._data)
          this.api.create(this._data, ({ data }) => {
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
