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
    <label class="checkbox">
      <i class="fa fa-lg fa-tag"></i> Marcar Todos
          <input :disabled="formEditable" @click="checkallmodules" :checked="allSelected()" type="checkbox" name="checkbox-inline">
          <i></i>
    </label>
    </fieldset>
      <template v-for="(details, module) in map">
        <div style="height:640px;" class="col-md-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="2" class="text-center">
                  <label class="checkbox">
                  <i class="fa fa-lg fa-tag"></i> {{ details.name.toUpperCase() }}
                      <input :disabled="formEditable" @click="checkall(module)" :checked="allModuleSelected(module)" type="checkbox" name="checkbox-inline">
                      <i></i>
                  </label>
              </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(action, actionKey) in details.actions">
                <tr>
                  <!-- <td>{{ action.description }}</td> -->
                  <td>
                    <label class="checkbox">
                      <input :disabled="formEditable" v-model="selectedPermissions" :value="module + '|' + actionKey" type="checkbox" name="checkbox-inline">
                      <i></i> {{ action.description }}
                      </label>
                    </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
    <!-- </div> -->
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
      this.$root.axios.get('profiles/get-map').then(({data}) => {
        this.map = data.data
      })

      this.$root.axios.get(`${this.basePath}/rules/update`).then(({ data }) => {
        let rules = data.data.rules

        Object.keys(rules).forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })

        this.readonly = this.formReadonly
        this.api = new Api(this, this.basePath)
        this.id = this.$route.params.id
        this.fetch()
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
        readonly: false,
        selectedPermissions: [],
        map: [],
        ...dynamicData
      }
    },
    methods: {
      fetch () {
        this.api.find(this.id, ({ data }) => {
          Object.keys(data).forEach((key) => {
            if (key !== 'map') {
              this[key] = data[key]
            } else {
              Object.keys(data[key]).forEach((module) => {
                data[key][module].forEach((action) => {
                  this.selectedPermissions.push(module + '|' + action)
                })
              })
            }
          })

          // this.clearState()
        })
      },
      allSelected () {
        var total = 0
        // console.log('teste')
        map(this.map, (item, index) => {
          total += Object.keys(item.actions).length
        })

        return this.selectedPermissions.length === total
      },
      allModuleSelected (module) {
        var total = Object.keys(this.map[module].actions)
        let selected = this.selectedPermissions.filter(e => e.includes(module))
        return total.length === selected.length
        // var actions = map(this.map, (item) => {
        //   if (item.name === module) {
        //     return item.actions
        //   }
        // })
        // var keys = Object.keys(item.actions)
        //     let selected = this.selectedPermissions.filter(e => e.includes(module))
        //     console.log(selected.length, keys.length)
        // console.log(actions)
      },
      checkallmodules () {
        map(this.map, (item, index) => this.checkall(index))
      },
      checkall (module) {
        map(this.map, (item, index) => {
          if (index === module) {
            var keys = Object.keys(item.actions)
            keys.forEach((k) => {
              if (this.selectedPermissions.find(e => module + '|' + k === e)) {
                this.selectedPermissions = this.selectedPermissions.filter(e => module + '|' + k !== e)
              } else {
                this.selectedPermissions.push(module + '|' + k)
              }
            })
          }
        })
      },
      clearState () {
        // this.errors.clear()
        // this.fields.reset()
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
