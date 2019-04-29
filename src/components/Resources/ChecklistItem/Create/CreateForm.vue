<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <template v-for="field in __fields">
          <component
          :is="field.component"
          :wrapper-class="field.wrapperClass"
          :using-as-provider="field.usingAsProvider"
          :using-as-label="field.usingAsLabel"
          :mask="field.mask"
          :using-as-value="field.usingAsValue"
          :data-vv-as="field.label"
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
