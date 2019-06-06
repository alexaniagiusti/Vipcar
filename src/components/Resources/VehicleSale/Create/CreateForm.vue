<template>
  <form id="main-form" class="smart-form form-inline">
    <fieldset>
      <div class="row">
        <entity-field
          label='Cliente'
          usingAsProvider='/customers'
          usingAsLabel='name'
          usingAsValue='id'
          orderBy='name'
          icon='user'
          wrapperClass='col-lg-12'
          placeholder='Selecione o Cliente'
          name='customer_id'
          :custom-error="errors.first('customer_id')"
          v-validate="'required'"
          :valid="fields.valid('customer_id')"
          :failed="fields.failed('customer_id')"
          v-model="customer_id"
          >
        </entity-field>
      </div>
      <div class="row">
        <entity-field
          label='Veículo'
          :usingAsProvider="'/entries-by-tenant/' + currentTenant + '?only-available=true'"
          usingAsLabel='fipe_vehicle_renavam_plate'
          usingAsValue='id_key'
          orderBy='fipe_vehicle'
          icon='car'
          wrapperClass='col-lg-12'
          placeholder='Selecione o Veículo'
          name='entry_id'
          v-model="entry_id"
          :custom-error="errors.first('entry_id')"
          v-validate="'required'"
          :valid="fields.valid('entry_id')"
          :failed="fields.failed('entry_id')"
          >
        </entity-field>
      </div>
      <section v-for="(payment_method, index) in payment_methods">
        <div class="col-md-12">
          <label>
              <input @change="selectPayment(index)" data-vv-name="payment_methods_selected" v-validate="'required'" type="checkbox" :disabled="!entry_id" :value="payment_method.id_key" name="payment_methods_selected" v-model="payment_methods_selected"> {{ payment_method.description }}
          </label>
        </div>
        <div>
          <label class="input col-md-2">
            <input placeholder="Valor" name="values_payments" v-if="payment_methods_selected.includes(payment_method.id_key)" v-model="values_payments[index]"/>

            <span v-if="payment_methods_selected.includes(payment_method.id_key) && typeof(values_payments[index]) !== 'undefined' && values_payments[index].match(/^-?\d*(.\d+,?\d*)?%?$/) === null">Valor inválido</span>
          </label>

          <label style="margin-left: 5px;" class="input col-md-2">
            <masked-input v-model="date_payments[index]" v-if="payment_methods_selected.includes(payment_method.id_key)" placeholder="Data" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
          </label>

          <label style="margin-left: 5px;" class="input col-md-7">
            <input v-model="details_payments[index]" placeholder="Observação" name="values_payments" v-if="payment_methods_selected.includes(payment_method.id_key)"/>
          </label>
        </div>
      </section>
      <section class="col-md-12">
      <span v-if="errors.has('payment_methods_selected')">
          <i class="fa fa-warning text-danger"></i> {{ errors.first('payment_methods_selected') }}
        </span>
        
      </section>
      <section class="col-md-8" style="margin-right: 20px;">
        <label class="label">
          <i class="fa fa-dollar"></i>
          <span>Total distribuído</span>
        </label>
        <label class="input">
          <input type="text" v-model="distributed_value" disabled="disabled">
          <span v-if="distributed_ok">Distribuição concluída com sucesso.</span>
          <span v-else>Total distribuído deve ser igual ou maior ao preço ({{ price }}) </span>
        </label>
        <span>&nbsp;</span>
      </section>
      <section class="col-md-8" style="margin-right: 20px;">
        <label class="label">
          <i class="fa fa-dollar"></i>
          <span>Preço</span>
        </label>
        <label class="input">
          <input type="text" v-model="sale_price_formatted" disabled="disabled">
        </label>
        <span>&nbsp;</span>
      </section>
      <section class="col-md-3">
        <label class="label">
          <i class="fa fa-dollar"></i>
          <span>Desconto <span v-if="entry_id">(máximo: {{ discount_max }})</span></span>
        </label>
        <label class="input">
            <input :disabled="!entry_id" @input="validateDiscount" type="text" v-model="discount">
        </label>
        <span v-if="invalid_discount">Valor do desconto inválido</span>
      </section>
      <section class="col-md-12">
        <label class="label">
          <i class="fa fa-dollar"></i>
          <span>Preço Final</span>
        </label>
        <label class="input">
            <input type="text" :value="final_price_label" disabled="disabled">
        </label>
        <span>&nbsp;</span>
      </section>
    </fieldset>
  </form>
</template>

<script>
  import TextField from '@/components/Fields/TextField'
  import URLMatcherService from '@/services/url/URLMatcherService'
  import jquery from 'jquery'
  import Api from '@/components/Resources/VehicleSale/Api'
  import { debounce } from 'lodash'
  import numeral from 'numeral'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      values_payments: function () {
        this.atualizaValorDistribuido()
      },
      discount: function () {
        this.atualizaValorFinal()
      },
      entry_id: function (newId) {
        if (newId === '') {
          this.sale_price_formatted = null
          this.discount_max = null
          return
        }
        this.$root.axios.get(`vehicle-entry/${newId}`).then(({data}) => {
          this.sale_price_formatted = data.data.sale_price_formatted
          this.final_price_label = this.sale_price_formatted
          this.price = data.data.sale_price
          this.discount_max = data.data.discount_margin_formatted
          this.discount_max_raw = data.data.discount_margin
        })
      }
    },
    name: 'tenant-form',
    computed: {
      distributed_ok () {
        var v1 = String(this.distributed_value).substr(0, String(this.distributed_value).indexOf(',')).replace('.', '').replace(',', '').replace('R$', '')
        var v2 = String(this.price).substr(0, String(this.price).indexOf(',')).replace('R$', '').replace(',', '').replace('.', '')
        var v3 = String(this.discount).replace('R$', '').replace(',', '').replace('.', '')
        // console.log(this.distributed_value)
        return (Number(v1) + Number(v3)) >= Number(v2)
      },
      currentTenant () {
        return window.localStorage.getItem('current-tenant-idkey')
      }
    },
    beforeCreate () {
      if (this.$route.params.entry_id) {
        this.$root.axios.get('/decrypt', {
          params: {
            payload: this.$route.params.entry_id
          }
        }).then(({data}) => {
          this.entry_id = data.key
        })
      }
      this.$root.axios.get('vehicle-sale/rules/create').then(({ data }) => {
        let rules = data.data.rules
        let keys = Object.keys(rules)
        keys.forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })
      })
      this.$root.axios.get('payment-method').then(({ data }) => {
        this.payment_methods = data.data.data
      })
    },
    created () {
      numeral.locale('pt-br')

      this.$emit('carregado')
      this.readonly = this.formEditable
      this.matcher = new URLMatcherService()
      this.api = new Api(this)
    },
    data () {
      return {
        customer_id: null,
        price: null,
        sale_price_formatted: null,
        entry_id: null,
        discount_max: null,
        discount_max_raw: null,
        discount: 0,
        invalid_discount: false,
        final_price_label: null,
        payment_methods: [],
        payment_methods_selected: [],
        values_payments: [],
        date_payments: [],
        details_payments: [],
        distributed_value: 0
      }
    },
    methods: {
      atualizaValorFinal () {
        if (this.price) {
          // if (this.discount) {
          var discount = String(this.discount).replace('R$', '').replace(',', '').replace('.', '')
          var total = this.distributed_value_raw - Number(discount)
          this.final_price_label = numeral(total).format('$ 0,0.00')
          // this.$root.axios('format-number/', {
          //   params: {
          //     number: total
          //   }
          // }).then(({data}) => {
          //   this.final_price_label = data.value
          // })
        }
      },
      atualizaValorDistribuido () {
        var values = []
        this.values_payments.forEach((item) => {
          values.push(Number(item.replace('.', '').replace(',', '.')))
        })
        var value = values.reduce((sum, current) => (sum + current), 0)
        if (!isNaN(value)) {
          debounce(() => {
            this.distributed_value = numeral(value).format('$ 0,0.00')
            this.distributed_value_raw = value
            this.atualizaValorFinal()

            // this.$root.axios.get('format-number', {
            //   params: {
            //     number: values.reduce((sum, current) => (sum + current), 0)
            //   }
            // }).then(({data}) => {
            //   this.distributed_value = data.value
            //   this.distributed_value_raw = values.reduce((sum, current) => (sum + current), 0)
            //   this.atualizaValorFinal()
            // })
          }, 1)()
        }
      },
      selectPayment (index) {
        this.values_payments[index] = ''
        this.date_payments[index] = null
        this.details_payments[index] = null
        this.atualizaValorDistribuido()
      },
      validateDiscount (event) {
        var discount = Number(event.target.value.replace('.', '').replace(',', '.'))

        if (discount > this.discount_max_raw.replace('.', '').replace(',', '.') || discount > this.distributed_value_raw) {
          this.invalid_discount = true
          this.discount = 0
          return
        }

        this.invalid_discount = false
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      create () {
        if (!this.discount) {
          this.discount = 0
        }
        var data = this._data
        data['values_payments'].map((item) => item.replace('.', '').replace(',', '.'))
        this.$validator.validateAll().then(() => {
          this.api.create(data, ({ data }) => {
            this.$router.push('/vehicle-sale')
          })
        }).catch((errors) => {
          // console.log(errors)
        })
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
          this.$router.push('/vehicle-sale')
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
