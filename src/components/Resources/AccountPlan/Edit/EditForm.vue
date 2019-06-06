<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <text-field placeholder="Preencha o nome" label="Nome" icon="edit" v-validate="name_rule" :readonly="readonly" name="name" v-model="name" :custom-error="errors.first('name')" :valid="fields.valid('name')" :failed="fields.failed('name')">
        </text-field>
      </div>
      <div class="row">
        <text-field placeholder="Preencha o Sigla" label="Sigla" icon="edit" v-validate="abbreviation_rule" :readonly="readonly" name="abbreviation" v-model="abbreviation" :custom-error="errors.first('abbreviation')" :valid="fields.valid('abbreviation')" :failed="fields.failed('abbreviation')">
        </text-field>
      </div>
      <div class="row">
        <select-field label="Tipo" icon="edit" v-validate="type_rule" :readonly="readonly" name="type" v-model="typeKey" :select-options="type_options" :custom-error="errors.first('type')" :valid="fields.valid('type')" :failed="fields.failed('type')">
        </select-field>
      </div>
      <div class="row">
        <select-field label="Ativo" icon="edit" v-validate="active_rule" :readonly="readonly" name="isActive" v-model="isActive" :select-options="active_options" :custom-error="errors.first('isActive')" :valid="fields.valid('isActive')" :failed="fields.failed('isActive')">
        </select-field>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import TextField from '@/components/Fields/TextField'
  import SelectField from '@/components/Fields/SelectField'
  import URLMatcherService from '@/services/url/URLMatcherService'
  import jquery from 'jquery'
  import Api from '@/components/Resources/AccountPlan/Api'
  export default {
    props: {
      formReadonly: {
        type: Boolean,
        default: false
      }
    },
    name: 'tenant-form',
    beforeCreate () {
      this.$root.axios.get('account-plans/rules/update').then(({ data }) => {
        let rules = data.data.rules
        let keys = Object.keys(rules)
        keys.forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })
      })
    },
    created () {
      this.readonly = this.formReadonly
      this.matcher = new URLMatcherService()
      this.api = new Api(this)
      this.id = this.$route.params.id
      this.fetch()
    },
    data () {
      return {
        id: '',
        name: '',
        abbreviation: '',
        type: '',
        typeKey: '',
        active: '',
        isActive: false,
        created_at: '',
        updated_at: '',
        readonly: false,
        name_rule: '',
        abbreviation_rule: '',
        type_rule: '',
        active_rule: '',
        type_options: [
          {value: 'E', label: 'Entrada'},
          {value: 'S', label: 'Saída'}
        ],
        active_options: [
          {value: 'true', label: 'SIM'}, {value: 'false', label: 'NÃO'}
        ]
      }
    },
    methods: {
      fetch () {
        this.api.find(this.id, ({ data }) => {
          let keys = Object.keys(data)

          keys.forEach((key) => {
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
          let data = this._data

          /** API reads the correct values to fields */
          data.type = this._data.typeKey
          data.active = this._data.isActive

          this.api.update(this.id, data, () => {
            this.$router.push('/account-plans')
          })
        }).catch(() => {})
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
          this.$router.push('/account-plans')
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
    },
    components: {
      TextField, SelectField
    }
  }
</script>
