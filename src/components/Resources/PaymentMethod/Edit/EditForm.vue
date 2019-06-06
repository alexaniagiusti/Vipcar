<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <template v-for="field in __fields">
          <component
          :is="field.component"
          :wrapper-class="field.wrapperClass"
          :data-vv-as="field.label"
          :using-as-provider="field.usingAsProvider"
          :using-as-label="field.usingAsLabel"
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
  import { map } from 'lodash'
  import Api from './../Api'
  import {
    __fields,
    __defaultBasePath
  } from './../metadata'

  export default {
    props: {
      formReadonly: {
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
      this.$root.axios.get(`${this.basePath}/rules/update`).then(({ data }) => {
        let rules = data.data.rules

        Object.keys(rules).forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })
      })

      this.readonly = this.formReadonly
      this.api = new Api(this, this.basePath)
      this.id = this.$route.params.id
      this.fetch()
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
      fetch () {
        this.api.find(this.id, ({ data }) => {
          Object.keys(data).forEach((key) => {
            this[key] = data[key]
          })

          this.clearState()
        })
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      update () {
        this.$validator.validateAll().then(() => {
          this.api.update(this.id, this._data, () => {
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
