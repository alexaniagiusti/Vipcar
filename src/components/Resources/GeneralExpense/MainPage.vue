<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <h1 class="page-title txt-color-blueDark"><i class="fa fa-fw fa-book"></i>  Despesas Gerais
      </h1>
    <div class="jarviswidget jarviswidget-color-darken">
      <header role="heading">
        <span class="widget-icon">
          <i class="fa fa-book"></i>
        </span>
        <h2>
          Detalhes da Loja
        </h2>
        <span v-if="readonly" class="badge m-t-5 m-r-5 bg-color-orange pull-right">
          <i class="fa fa-ban"></i> Somente leitura
        </span>
        <span v-else class="badge m-t-5 m-r-5 bg-color-greenLight pull-right">
          <i class="fa fa-edit"></i> Edição
        </span>
      </header>

      <div role="content">
        <div class="widget-body no-padding">
          <form @submit.prevent id="main-form" class="smart-form">
            <fieldset>
              <div v-if="profile.map['general-expenses'].includes('create') || profile.map['general-expenses'].includes('edit')" class="row">
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
                  v-validate="field.rules"
                  :name="field.name"
                  v-model="$data[field['name']]"
                  :icon="field.icon"
                  :label="field.label"
                  :order-by="field.orderBy"
                  :placeholder="field.placeholder"
                  :readonly="checkReadOnly(field)"
                  :custom-error="errors.first(field.name)"
                  :valid="fields.valid(field.name)"
                  :failed="fields.failed(field.name)"
                  ></component>
                </template>
                <div class="col col-md-4 pull-right">
                  <button v-if="typeof(private_id) === 'undefined' && profile.map['general-expenses'].includes('create')" @click="create" style="padding: 4px 14px" class="btn btn-success">
                  <i class="fa fa-check-circle"></i> Criar nova despesa
                  </button>
                  <button v-else-if="typeof(private_id) !== 'undefined' && profile.map['general-expenses'].includes('edit')" @click="create" style="padding: 4px 14px" class="btn btn-primary">
                  <i class="fa fa-edit"></i> Editar Despesa
                  </button>
                  <button v-if="profile.map['general-expenses'].includes('create') || profile.map['general-expenses'].includes('edit')" @click="reset" style="padding: 4px 14px" class="btn btn-default">
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
            <div class="tab-pane active" v-if="profile.map['general-expenses'].includes('index')" id="hr2">

              <ul class="nav nav-tabs">
                <li class="active">
                  <a href="#iss1" data-toggle="tab">
                    <i class="fa fa-warning text-danger"></i> A pagar ({{pendente.length}})
                  </a>
                </li>
                <li class="">
                  <a href="#iss2" data-toggle="tab">
                    <i class="fa fa-check text-success"></i> Pago ({{pago.length}})
                  </a>
                </li>
              </ul>
              <div class="tab-content padding-10">
                <div class="tab-pane active" id="iss1">
                  <table class="table">
                    <thead>
                      <tr>
                        <th width="1%">#</th>
                        <th width="30%">Tipo de Despesa</th>
                        <th width="30%">Fornecedor</th>
                        <th width="19%">Valor</th>
                        <th width="20%">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(expense, index) in pendente">
                        <td>{{ ++index }}</td>
                        <td>
                          <router-link :to="`/expense-types/${expense.expense_type.id}/edit`">
                            <i class="fa fa-window-restore"></i> {{ expense.expense_type.description }}
                          </router-link>
                        </td>
                        <td>
                          <router-link :to="`/customers/${expense.customer.id}/edit`">
                            <i class="fa fa-user"></i>
                              {{ expense.customer.name }} ({{ expense.customer.cpf }})
                          </router-link>
                        </td>
                        <td>R$ {{ expense.amount }}</td>
                        <td>
                          <a v-if="profile.map['general-expenses'].includes('edit')" @click="edit(expense)" class="btn btn-default padding-5">
                            <i class="fa fa-edit"></i> Editar
                          </a>
                          <a v-if="profile.map['general-expenses'].includes('delete')" href="#" @click.prevent="destroy(expense.id)" class="btn btn-danger padding-5">
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
                        <th width="30%">Tipo de Despesa</th>
                        <th width="30%">Fornecedor</th>
                        <th width="19%">Valor</th>
                        <th width="20%">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(expense, index) in pago">
                        <td>{{ ++index }}</td>
                        <td>
                          <router-link :to="`/expense-types/${expense.expense_type.id}/edit`">
                            <i class="fa fa-window-restore"></i> {{ expense.expense_type.description }}
                          </router-link>
                        </td>
                        <td>
                          <router-link :to="`/customers/${expense.customer.id}/edit`">
                            <i class="fa fa-user"></i>
                              {{ expense.customer.name }} ({{ expense.customer.cpf }})
                          </router-link>
                        </td>
                        <td>R$ {{ expense.amount }}</td>
                        <td>
                        <!--  -->
                          <a v-if="typeof(private_id) === 'undefined' && profile.map['general-expenses'].includes('edit')" @click="edit(expense)" class="btn btn-default padding-5">
                            <i class="fa fa-edit"></i> Editar
                          </a>
                          <!--  -->
                          <a @click.prevent="destroy(expense.id) && profile.map['general-expenses'].includes('delete')" class="btn btn-danger padding-5">
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
      </div>
    </div>
  </div>
</template>

<script>
  // import Api from './../Api'
  import jquery from 'jquery'
  import numeral from 'numeral'
  // import moment from 'moment'
  import { mapState } from 'vuex'
  import {isNil} from 'lodash'
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
        date: {
          label: 'Data',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-3',
          placeholder: 'Preencha a data',
          name: 'date',
          rules: 'required'
        },
        expense_type_id: {
          label: 'Tipo de Despesa',
          component: 'entity-field',
          usingAsProvider: '/expense-types',
          usingAsLabel: 'description',
          usingAsValue: 'id_key',
          list: true,
          icon: 'tag',
          wrapperClass: 'col-lg-4',
          placeholder: '',
          name: 'expense_type_id',
          group: 1,
          rules: 'required'
        },
        amount: {
          label: 'Valor',
          component: 'monetary-field',
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-2',
          details: true,
          placeholder: '',
          name: 'amount',
          group: 1,
          rules: 'required'
        },
        paid: {
          label: 'Pago',
          component: 'select-field',
          selectOptions: [{value: true, label: 'SIM'}, {value: false, label: 'NÃO'}],
          list: true,
          icon: 'edit',
          wrapperClass: 'col-lg-3',
          placeholder: 'Pago',
          name: 'paid',
          group: 1,
          rules: 'required'
        },
        payment_date: {
          label: 'Data de Pagamento',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-2',
          placeholder: 'Preencha a data',
          name: 'payment_date',
          rules: ''
        },
        account_mov_id: {
          label: 'Conta',
          component: 'entity-field',
          usingAsProvider: '/account-mov',
          usingAsLabel: 'description',
          usingAsValue: 'id',
          list: true,
          icon: 'exchange',
          wrapperClass: 'col-lg-3',
          placeholder: '',
          name: 'account_mov_id',
          orderBy: 'description',
          group: 1,
          rules: 'required'
        },
        customer_id: {
          label: 'Fornecedor',
          component: 'entity-field',
          usingAsProvider: '/customers',
          usingAsLabel: 'name_with_cpf',
          usingAsValue: 'id_key',
          list: true,
          icon: 'users',
          wrapperClass: 'col-lg-7',
          placeholder: '',
          name: 'customer_id',
          orderBy: 'name',
          group: 1,
          rules: 'required'
        },
        description: {
          label: 'Observações',
          component: 'textarea-field',
          list: true,
          icon: 'external-link',
          name: 'description',
          rules: ''
        }
      }
      this.readonly = this.formEditable
    },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        numeral: numeral,
        date: undefined,
        expense_type_id: undefined,
        amount: undefined,
        paid: undefined,
        payment_date: undefined,
        account_mov_id: undefined,
        customer_id: undefined,
        description: undefined,
        private_id: undefined,
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
    },
    methods: {
      checkReadOnly (field) {
        return field.name === 'payment_date' && (isNil(this.paid) || !this.paid) || this.readonly
      },
      isNil: () => isNil,
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
        this.date = undefined
        this.expense_type_id = undefined
        this.amount = undefined
        this.paid = undefined
        this.payment_date = undefined
        this.account_mov_id = undefined
        this.customer_id = undefined
        this.description = undefined
        this.private_id = undefined
      },
      create () {
        this.$validator.validateAll().then(() => {
          if (this.private_id) {
            this.$root.axios.put('/general-expenses/' + this.private_id,
            this._data).then((data) => {
              this.reset()
              this.refresh()
            })
          } else {
            this.$root.axios.post('/general-expenses',
              this._data).then((data) => {
                this.reset()
                this.refresh()
              })
          }
        }).catch(() => {})
      },
      refresh () {
        this.$root.axios.get('/general-expenses').then(({data}) => {
          this.expenses = data.data.data
        })
      },
      edit (expense) {
        this.private_id = expense.id
        this.date = expense.date
        this.payment_date = expense.payment_date
        this.customer_id = expense.customer_id
        this.expense_type_id = expense.expense_type_id
        this.paid = expense.paid
        this.account_mov_id = expense.account_mov_id
        this.description = expense.description
        this.amount = expense.amount
      },
      destroy (id) {
        this.$root.axios.post(`general-expenses/${id}`, {
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
