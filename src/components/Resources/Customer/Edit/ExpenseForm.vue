<template>
  <div>
    <form @submit.prevent id="main-form" class="smart-form">
      <fieldset>
        <div v-if="profile.map['customers'].includes('create-account-customer') || profile.map['customers'].includes('edit-account-customer')" class="row">
          <template v-for="field in __fields">
            <component
            :is="field.component"
            :wrapper-class="field.wrapperClass"
            :data-vv-as="field.label"
            :select-options="field.selectOptions"
            :using-as-provider="field.usingAsProvider"
            :using-as-label="field.usingAsLabel"
            :has-related="field.hasRelated"
            :related="field.related"
            :mask="field.mask"
            :using-as-value="field.usingAsValue"
            v-validate="'required'"
            :name="field.name"
            v-model="$data[field['name']]"
            :icon="field.icon"
            :label="field.label"
            :order-by="field.orderBy"
            :placeholder="field.placeholder"
            :readonly="readonly"
            :custom-error="errors.first(field.name)"
            :valid="fields.valid(field.name)"
            :failed="fields.failed(field.name)"
            ></component>
          </template>
          <div class="col col-md-4 pull-right">
            <button v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('create-account-customer')" @click="create" style="padding: 4px 14px" class="btn btn-success">
            <i class="fa fa-check-circle"></i> Criar novo item
            </button>
            <button v-else-if="typeof(private_id) !== 'undefined' && profile.map['customers'].includes('edit-account-customer')" @click="create" style="padding: 4px 14px" class="btn btn-primary">
            <i class="fa fa-edit"></i> Editar Item
            </button>
            <button v-if="profile.map['customers'].includes('create-account-customer') || profile.map['customers'].includes('edit-account-customer')" @click="reset" style="padding: 4px 14px" class="btn btn-default">
                <span v-if="typeof(private_id) === 'undefined'">
                  <i class="fa fa-eraser"></i> Limpar
                </span>
                <span v-else>
                  <i class="fa fa-times"></i> Cancelar Edição
                </span>
              </button>
          </div>
        </div>
      </fieldset>
      <br/>
      <!-- <div class="pull-right">
          <h4>Despesas: {{ numeral(totalAmountExpenses).format('$ 0,0.00') }}</h4>
          <h5 class="text-success">Pago: {{ numeral(totalAmountPago).format('$ 0,0.00') }}</h5>
          <h5 class="text-danger">A pagar: {{ numeral(totalAmountPendente).format('$ 0,0.00') }}</h5>
      </div> -->
      <div v-if="profile.map['customers'].includes('show-account-customer')" class="tab-pane active" id="hr2">

        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#iss1" data-toggle="tab">
              <i class="fa fa-warning text-danger"></i> Pendencias ({{pendente.length}})
            </a>
          </li>
          <li class="">
            <a href="#iss2" data-toggle="tab">
              <i class="fa fa-calendar"></i> Histórico({{pago.length}})
            </a>
          </li>
        </ul>
        <div class="tab-content padding-10">
          <div class="tab-pane active" id="iss1">
            <table class="table">
              <thead>
                <tr>
                  <th width="1%">#</th>
                  <th width="15%">Tipo</th>
                  <th width="10%">Número</th>
                  <th width="19%">Valor</th>
                  <th width="19%">Data de Vencimento</th>
                  <th width="40%">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(expense, index) in pendente">
                  <td>{{ ++index }}</td>
                  <td>
                    <router-link :to="`/payment-method/${expense.payment_method.id}/edit`">
                      <i class="fa fa-credit-card"></i> {{ expense.payment_method.description }}
                    </router-link>
                  </td>
                  <td>{{ expense.number }}</td>
                  <td>R$ {{ expense.value }}</td>
                  <td>{{ expense.due }}</td>
                  <td>
                    <!-- <a @click="markAsPaid(expense)" v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('edit-account-customer')" class="btn btn-default padding-5">
                      <i class="fa fa-edit"></i> Marcar como Pago
                    </a> -->

                    <a v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('edit-account-customer')" @click="edit(expense)" class="btn btn-default padding-5">
                      <i class="fa fa-edit"></i> Editar
                    </a>
                    <a v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('delete-account-customer')" href="#" @click.prevent="destroy(expense.id)" class="btn btn-danger padding-5">
                      <i class="fa fa-trash"></i> Excluir
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="iss2">
            <table class="table">
              <thead>
                <tr>
                  <th width="1%">#</th>
                  <th width="15%">Tipo</th>
                  <th width="10%">Number</th>
                  <th width="19%">Valor</th>
                  <th width="19%">Data de Vencimento</th>
                  <th width="40%">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(expense, index) in pago">
                  <td>{{ ++index }}</td>
                  <td>
                    <router-link :to="`/payment-method/${expense.payment_method.id}/edit`">
                      <i class="fa fa-credit-card"></i> {{ expense.payment_method.description }}
                    </router-link>
                  </td>
                  <td>{{ expense.number }}</td>
                  <td>R$ {{ expense.value }}</td>
                  <td>{{ expense.due }}</td>
                  <td>
                    <a v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('edit-account-customer')" @click="edit(expense)" class="btn btn-default padding-5">
                      <i class="fa fa-edit"></i> Editar
                    </a>
                    <a v-if="typeof(private_id) === 'undefined' && profile.map['customers'].includes('delete-account-customer')" @click.prevent="destroy(expense.id)" class="btn btn-danger padding-5">
                      <i class="fa fa-trash"></i> Excluir
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Api from './../Api'
  import jquery from 'jquery'
  import numeral from 'numeral'
  // import moment from 'moment'
  import { mapState } from 'vuex'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    created () {
      numeral.locale('pt-br')

      this.__fields = {
        payment_method_id: {
          label: 'Tipo',
          component: 'entity-field',
          usingAsProvider: '/payment-method',
          usingAsLabel: 'description',
          usingAsValue: 'id_key',
          list: true,
          icon: 'tag',
          wrapperClass: 'col-lg-3',
          placeholder: '',
          name: 'payment_method_id',
          group: 1
        },
        number: {
          label: 'Número',
          component: 'text-field',
          list: true,
          icon: 'edit',
          wrapperClass: 'col-lg-2',
          placeholder: 'Número',
          name: 'number'
        },
        value: {
          label: 'Valor',
          component: 'monetary-field',
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-3',
          details: true,
          placeholder: '',
          name: 'value',
          group: 1
        },
        due: {
          label: 'Vencimento',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-2',
          placeholder: 'Preencha a data de vencimento',
          name: 'due'
        }
        /* , paid: {
          label: 'Pago',
          component: 'select-field',
          selectOptions: [{value: true, label: 'SIM'}, {value: false, label: 'NÃO'}],
          list: true,
          icon: 'edit',
          wrapperClass: 'col-lg-2',
          placeholder: 'Pago',
          name: 'paid',
          group: 1
        } */
      }

      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)
      this.customer_id = this.$route.params.id
    },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        numeral: numeral,
        customer_id: undefined,
        due: undefined,
        private_id: undefined,
        payment_method_id: undefined,
        value: undefined,
        number: undefined,
        paid: undefined,
        readonly: false,
        __fields: {},
        expenses: []
      }
    },
    computed: {
      ...mapState({
        profile: state => state.user.profile
      }),
      pendente () {
        return this.expenses.filter(e => !e.paid)
      },
      pago () {
        return this.expenses.filter(e => e.paid)
      }
      // pendenteAtrasada () {
      //   return this.expenses.filter(
      //     e => !e.paid && moment(e.date, 'DD/MM/YYYY').isBefore(moment())
      //   )
      // },
      // pendenteEmDia () {
      //   return this.expenses.filter(
      //     e => !e.paid && moment(e.date, 'DD/MM/YYYY').isSameOrAfter(moment())
      //   )
      // },
      // totalAmountPendenteAtrasada () {
      //   let total = this.pendenteAtrasada.reduce((total, expense) => {
      //     let temp = Number(expense.amount.replace('.', '').replace(',', '.'))
      //     return total + temp
      //   }, 0)

      //   return total
      // },
      // totalAmountPendenteEmDia () {
      //   let total = this.pendenteEmDia.reduce((total, expense) => {
      //     let temp = Number(expense.amount.replace('.', '').replace(',', '.'))
      //     return total + temp
      //   }, 0)

      //   return total
      // },
      // totalAmountExpenses () {
      //   return this.totalAmountPendente + this.totalAmountPago
      // },
      // totalAmountPendente () {
      //   let total = this.pendente.reduce((total, expense) => {
      //     let temp = Number(expense.amount.replace('.', '').replace(',', '.'))
      //     return total + temp
      //   }, 0)

      //   return total
      // },
      // totalAmountPago () {
      //   let total = this.pago.reduce((total, expense) => {
      //     let temp = Number(expense.amount.replace('.', '').replace(',', '.'))
      //     return total + temp
      //   }, 0)

      //   return total
      // }
    },
    methods: {
      markAsPaid (expense) {
        this.$root.axios.post(`account-customer/${expense.id}/mark-as-paid`).then(() => {
          this.reset()
          this.refresh()
        })
      },
      // format (n) {
      //   this.$root.axios.get('format-number', {
      //     params: {
      //       number: n
      //     }
      //   }).then(({data: {value}}) => value)
      // },
      clearAndFocusSearch () {
        jquery('[name=optional-items-search]').focus()
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      reset () {
        this.due = undefined
        this.number = undefined
        this.payment_method_id = undefined
        this.value = undefined
        this.paid = undefined
        this.private_id = undefined
      },
      create () {
        this.$validator.validateAll().then(() => {
          if (this.private_id) {
            this.$root.axios.put('/account-customer/' + this.private_id,
            this._data).then((data) => {
              this.reset()
              this.refresh()
            })
          } else {
            this._data.paid = false
            this.$root.axios.post('/account-customer',
              this._data).then((data) => {
                this.reset()
                this.refresh()
              })
          }
        }).catch(() => {})
      },
      refresh () {
        this.$root.axios.get('/account-customer', {
          params: {
            'customer_id': this.customer_id
          }
        }).then(({data}) => {
          this.expenses = data.data.data
        })
      },
      edit (expense) {
        this.private_id = expense.id
        this.number = typeof (expense.number) === 'object' ? undefined : expense.number
        this.due = expense.due
        this.payment_method_id = expense.payment_method_id
        this.paid = expense.paid
        this.value = expense.value
      },
      destroy (id) {
        this.$root.axios.post(`account-customer/${id}`, {
          _method: 'DELETE'
        }).then(() => {
          this.reset()
          this.refresh()
        })
      },
      disableEdit () {
        this.fetch()
        this.readonly = true
      },
      allowEdit () {
        this.readonly = false
      }
    }
  }
</script>
