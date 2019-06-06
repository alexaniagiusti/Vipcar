<template>
  <div v-if="profile.map.hasOwnProperty('account-mov')">
    <h1 class="page-title txt-color-blueDark">
      Pagamentos a receber
    </h1>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i class="fa fa-sign-in"></i>
              Listagem de itens a pagar (Despesas de veículos)
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['tenants'].includes('index')" role="content">
          <div class="widget-body no-padding">
            <div class="table-responsive" style="height:150px; overflow-y: scroll;">
              <table class="table table-bordered table-striped table-condensed table-hover">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Origem</th>
                    <th>Veículo.</th>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pagExp in vehicleExpenses">
                    <td>
                      {{ pagExp.id_key }}

                      {{ pagExp.customer.name_with_cpf }}
                    </td>
                    <td>{{ pagExp.expense_type.description }}</td>
                    <td>{{ pagExp.entry.fipe_vehicle_with_renavam }}</td>
                    <td>{{ pagExp.date }}</td>
                    <td>R$ {{ pagExp.amount }}</td>
                    <td>
                      <a href="#" @click.prevent="mark(pagExp.id_key, 'despesa')" class="btn btn-primary btn-sm">Confirmar</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Confirmação de Pagamento</h4>
      </div>
      <div class="modal-body">
        <form @submit.prevent class="smart-form">
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
              :placeholder="field.placeholder"
              :custom-error="errors.first(field.name)"
              :valid="fields.valid(field.name)"
              :failed="fields.failed(field.name)"
              ></component>
            </template>
        </form>
      </div>
      <div class="modal-footer">
        <button @click.prevent="id = ''; type = ''; account_mov = ''; date = ''" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
        <button type="button" @click.prevent="save" class="btn btn-primary">Salvar</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  name: 'BillToReceive',
  computed: {
    __fields () {
      return {
        account_mov: {
          label: 'Tipo de Conta',
          component: 'entity-field',
          usingAsProvider: '/account-mov',
          usingAsLabel: 'description',
          resourceKey: 'relation_account_mov_type',
          usingAsValue: 'id',
          list: true,
          orderBy: 'account_mov_types.account_mov_type',
          icon: 'external-link',
          wrapperClass: 'col-lg-6',
          placeholder: 'Preencha o Tipo de Conta',
          name: 'account_mov'
        },
        date: {
          label: 'Data',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-6',
          placeholder: 'Preencha a data',
          name: 'date'
        }
      }
    },
    ...mapState({
      authenticated: state => state.user.authenticated,
      token: state => state.user.token,
      profile: state => state.user.profile
    })
  },
  methods: {
    mark (id, type) {
      this.id = id
      this.type = type
      window.jQuery('.modal').modal()
    },
    save () {
      this.$validator.validateAll().then(result => {
        this.$root.axios.get('/mark-as-paid', { params: {
          id: this.id,
          date: this.date,
          account_mov: this.account_mov,
          type: this.type
        }}).then(({data}) => {
          if (data.status) {
            this.load()
            window.jQuery('.modal').modal('hide')
          }
        })
      })
    },
    load () {
      this.$root.axios.get('/vehicle-expenses-tenant', {
        params: {
          'tenant_id': localStorage.getItem('current-tenant-idkey')
        }
      }).then(({data}) => {
        this.vehicleExpenses = data.data.data
      })
    }
  },
  mounted () {
    this.load()
  },
  data () {
    return {
      account_mov: '',
      date: '',
      id: '',
      type: '',
      vehicleExpenses: []
    }
  }
}
</script>

<style lang="css" scoped>
</style>
