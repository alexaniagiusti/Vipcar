import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
import Axios from 'axios'
import VeeValidate from 'vee-validate'
import store from '@/store'
import TextField from '@/components/Fields/TextField'
import SelectField from '@/components/Fields/SelectField'
import EntityField from '@/components/Fields/EntityField'
import PercentField from '@/components/Fields/PercentField'
import MaskedField from '@/components/Fields/MaskedField'
import MonetaryField from '@/components/Fields/MonetaryField'
import CheckboxField from '@/components/Fields/CheckboxField'
import TextAreaField from '@/components/Fields/TextAreaField'
import moment from 'moment'
var numeral = require('numeral')
import MaskedInput from 'vue-masked-input'
Vue.config.productionTip = false
Vue.use(VeeValidate, {
  delay: 300
})

var language = {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'mil',
    million: 'milhões',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return 'º'
  },
  currency: {
    symbol: 'R$'
  }
}

numeral.register('locale', 'pt-br', language)

Vue.component('text-field', TextField)
Vue.component('select-field', SelectField)
Vue.component('entity-field', EntityField)
Vue.component('percent-field', PercentField)
Vue.component('checkbox-field', CheckboxField)
Vue.component('masked-input', MaskedInput)
Vue.component('monetary-field', MonetaryField)
Vue.component('masked-field', MaskedField)
Vue.component('textarea-field', TextAreaField)

var bus = new Vue()

var API_ENDPOINT

if (process.env.NODE_ENV === 'development') {
  API_ENDPOINT = 'http://vendas.vipcarseminovos.com.br/api/v1/'// 'http://localhost:8040/api/v1/'
} else {
  API_ENDPOINT = 'http://vendas.vipcarseminovos.com.br/api/v1/'
}

var axios = Axios.create({
  baseURL: API_ENDPOINT
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data () {
    return {
      axios: axios,
      bus: bus,
      API_ENDPOINT,
      numeral
    }
  },
  created () {
    this.$validator.extend('float', {
      getMessage: field => `O campo ${field} está inválido. (Ex: 40,00)`,
      validate: (value) => {
        return value.match(/^-?\d*(.\d+,?\d*)?%?$/) !== null
      }
    })

    this.$validator.extend('integer', {
      getMessage: field => `O campo ${field} deve ser um número inteiro. (Ex: 40)`,
      validate: (value) => {
        return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)) // eslint-disable-line eqeqeq
      }
    })

    this.$validator.extend('date_format', {
      getMessage: field => `O campo ${field} está inválido.`,
      validate: (value) => {
        return moment(value).isValid()
      }
    })
  },
  template: '<App/>',
  components: { App }
})
