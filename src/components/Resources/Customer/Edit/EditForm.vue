<template>
  <form :id="'main-form-'+ this.group" class="smart-form">
    <!-- <fieldset> -->
    <!-- {{ errors }} -->
      <!-- <div class="row"> -->
        <section class="col col-lg-12">
          <label class="label">
            <i class="fa fa-user"></i> Tipo de cadastro
          </label>

          <label>
            <input type="radio" v-model="type" value="pf" checked="checked" autocomplete="off" name="type"> Pessoa Física
          </label>
          <label>
            <input type="radio" v-model="type" value="pj" autocomplete="off" name="type">Pessoa Jurídica
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
          :mask="field['name'] === 'cpf' && type === 'pf' ? field.mask : 
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
    <!-- </div> -->
  <!-- </fieldset> -->
</form>
</template>

<script>
  import jquery from 'jquery'
  import { map, filter, debounce } from 'lodash'
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
      },
      group: {
        type: Number
      }
    },
    computed: {
      basePath () {
        return __defaultBasePath
      },
      __fields () {
        return filter(__fields, el => el.group === this.group)
      }
    },
    created () {
      this.$root.axios.get(`${this.basePath}/rules/update`).then(({ data }) => {
        let rules = data.data.rules
        Object.keys(rules).forEach((prop, index) => {
          if (!rules[prop].indexOf('d/m/Y')) {
            this[prop + '_rule'] = rules[prop]
          }
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
        ...dynamicData,
        cpf: undefined,
        type: 'pf',
        cpf_changed: false
      }
    },
    watch: {
      cpf (v) {
        if (this.group === 1 && !this.cpf_changed) {
          let len = v.length === 18 ? 'pj' : 'pf'
          let f = debounce(() => {
            this.type = len
            this.cpf_changed = true
          }, 1000)
          f()
        }
      }
    },
    methods: {
      fetch () {
        this.api.find(this.id, ({ data }) => {
            // this.type = data[key].length === 18 ? 'pj' : 'pf'
          Object.keys(data).forEach((key) => {
            if (key === 'cpf' && this.group === 1) {
              this[key] = data[key]
              // console.log('data[key]: ' + data[key])
              // console.log('this[key]: ' + this[key])
              // console.log('this[key]: ' + this[key])
            } else {
              this[key] = data[key]
            }
            // console.log(key, this[key])
            // console.log(data[key])
          })

          this.clearState()
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
