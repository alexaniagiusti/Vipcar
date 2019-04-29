<template>
  <div>
    <a href="#" @click.prevent="save" style="margin: 4px" class="btn btn-success pull-right">
      <i class="fa fa-check-circle"></i> Finalizar Devolução
    </a>
    <div class="clearfix"></div>
    <form id="main-form" class="smart-form">
      <fieldset>
        <div class="row">
          <entity-field
            label='Cliente'
            usingAsProvider='/customers'
            usingAsLabel='name'
            usingAsValue='id'
            orderBy='name'
            icon='user'
            wrapperClass='col-lg-6'
            placeholder='Selecione o Cliente'
            name='customer_id'
            :custom-error="errors.first('customer_id')"
            v-validate="'required'"
            :valid="fields.valid('customer_id')"
            :failed="fields.failed('customer_id')"
            v-model="customer_id"
            >
          </entity-field>
          <entity-field
            label='Veículo'
            :usingAsProvider="'/entries-by-tenant/' + currentTenant + '?only-available=true' + '&q=consigned:1;state_id:1&sf=consigned:=;state_id:=&_and=true'"
            usingAsLabel='fipe_vehicle_renavam_plate'
            usingAsValue='id_key'
            orderBy='fipe_vehicle'
            icon='car'
            wrapperClass='col-lg-6'
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
        <fieldset v-if="expenses.length">
          <legend>Despesas</legend>
            <div class="text-info">
              <i class="fa fa-lg fa-info-circle"></i>
              Despesas do veículo <b>marcadas como paga</b>, serão lançados como <b>despesas não pagas</b> na conta do cliente
            </div>
            <div class="text-info">
              <i class="fa fa-lg fa-info-circle"></i>
              O veículo será marcado como indisponível automaticamente
            </div>
            <div class="table-responsive">
              <table style="color: #000" class="table table-bordered">
                <thead>
                  <tr>
                    <th colspan="4" class="text-center">
                      DESPESAS DO VEÍCULO
                    </th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Pago</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :class="{'bg-success': expense.paid, 'bg-danger': !expense.paid}" v-for="(expense, index) in expenses">
                    <td>{{ ++index }}</td>
                    <td>{{ expense.expense_type.description }}</td>
                    <td class="text-right">R$ {{ expense.amount }}</td>
                    <td>{{ expense.paid ? 'SIM' : 'NÃO' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </fieldset>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import numeral from 'numeral'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      entry_id: function (newId) {
        if (newId === '') {
          return
        }

        this.$root.axios.get('vehicle-expenses/', {
          params: {
            entry_id: newId
          }
        }).then(({data: {data: {data}}}) => {
          this.expenses = data
        })
      }
    },
    name: 'tenant-form',
    created () {
      numeral.locale('pt-br')
    },
    computed: {
      currentTenant () {
        return window.localStorage.getItem('current-tenant-idkey')
      }
    },
    methods: {
      save () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$root.axios.post('vehicle-entry/return-vehicle', {
              entry_id: this.entry_id,
              customer_id: this.customer_id
            }).then(() => {
              this.$router.push(`/vehicle-entry`)
            })
          }
        })
      }
    },
    data () {
      return {
        entry_id: undefined,
        customer_id: undefined,
        expenses: []
      }
    }
  }
</script>
