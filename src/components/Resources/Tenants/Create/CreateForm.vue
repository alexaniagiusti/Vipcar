<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <text-field placeholder="Preencha a Razão Social" label="Razão Social" icon="building" v-validate="tenant_name_rule" :readonly="readonly" name="tenant_name" v-model="tenant_name" :custom-error="errors.first('tenant_name')" :valid="fields.valid('tenant_name')" :failed="fields.failed('tenant_name')">
        </text-field>
      </div>
      <div class="row">
        <text-field placeholder="Preencha o Nome Fantasia" label="Nome Fantasia" icon="address-book" v-validate="tenant_fancy_name_rule" :readonly="readonly" name="tenant_fancy_name" v-model="tenant_fancy_name" :custom-error="errors.first('tenant_fancy_name')" :valid="fields.valid('tenant_fancy_name')" :failed="fields.failed('tenant_fancy_name')">
        </text-field>
      </div>
      <div class="row">
        <text-field placeholder="Preencha o CNPJ" label="CNPJ" icon="address-card-o" v-validate="cnpj_rule" :readonly="readonly" name="cnpj" v-model="cnpj" :custom-error="errors.first('cnpj')" :valid="fields.valid('cnpj')" :failed="fields.failed('cnpj')">
        </text-field>
      </div>
      <div class="row">
        <text-field placeholder="Preencha o Endereço" label="Endereço" icon="map-signs" v-validate="address_rule" :readonly="readonly" name="address" v-model="address" :custom-error="errors.first('address')" :valid="fields.valid('address')" :failed="fields.failed('address')">
        </text-field>
      </div>
      <div class="row">
        <text-field placeholder="Preencha o Telefone" label="Telefone" icon="phone" v-validate="phone_number_rule" :readonly="readonly" name="phone_number" v-model="phone_number" :custom-error="errors.first('phone_number')" :valid="fields.valid('phone_number')" :failed="fields.failed('phone_number')">
        </text-field>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import TextField from '@/components/Fields/TextField'
  import URLMatcherService from '@/services/url/URLMatcherService'
  import jquery from 'jquery'
  import Api from '@/components/Resources/Tenants/Api'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    name: 'tenant-form',
    beforeCreate () {
      this.$root.axios.get('tenants/rules/create').then(({ data }) => {
        let rules = data.data.rules
        let keys = Object.keys(rules)
        keys.forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })
      })
    },
    created () {
      this.readonly = this.formEditable
      this.matcher = new URLMatcherService()
      this.api = new Api(this)
    },
    data () {
      return {
        tenant_name: '',
        address: '',
        tenant_fancy_name: '',
        phone_number: '',
        cnpj: '',
        readonly: false,
        tenant_name_rule: '',
        tenant_fancy_name_rule: '',
        phone_number_rule: '',
        cnpj_rule: '',
        address_rule: ''
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
            this.$router.push('/tenants')
          })
        }).catch(() => {})
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
          this.$router.push('/tenants')
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
      TextField
    }
  }
</script>
