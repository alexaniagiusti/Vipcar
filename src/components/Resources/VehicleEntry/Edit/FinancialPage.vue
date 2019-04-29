<template>
  <div class="visible-print-block">
    <div class="col-md-12">
      <div class="col-md-6">
        <table class="table table-stripped table-bordered">
          <thead>
            <tr>
              <th colspan="2" class="text-center">RESUMO FINANCEIRO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Valor FIPE</td>
              <td class="text-right">
                <b>{{ numeral(vehicleData.fipe_amount).format('$ 0,0.00') }}</b>
              </td>
            </tr>
            <tr class="bg-danger">
              <td class="text-danger">Valor de Compra</td>
              <td class="text-danger text-right">
                <b>- {{ numeral(vehicleData.mean_price).format('$ 0,0.00') }} [-]</b>
              </td>
            </tr>
            <tr class="bg-danger">
              <td class="text-danger">Despesas</td>
              <td class="text-danger text-right">
                <b>- {{ numeral(expenseData.totalAmountExpenses).format('$ 0,0.00') }} [-]</b>
              </td>
            </tr>
            <tr class="bg-danger">
              <td class="text-danger">Comissões</td>
              <td class="text-danger text-right">
                <b>- {{ numeral(vehicleData.commission).format('$ 0,0.00') }} [-]</b>
              </td>
            </tr>

            <tr class="bg-success">
              <td class="text-success">Valor de Venda</td>
              <td class="text-success text-right">
                <b>{{ numeral(sale.price_raw||0).format('$ 0,0.00') }} [+]</b>
              </td>
            </tr>
            <tr class="bg-info">
              <td>Total Geral</td>
              <td style="font-size:18px;" class="text-right">
                <b>{{ totalGeralResumoFinanceiro.format('$ 0,0.00') }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <table class="table table-stripped table-bordered">
          <thead>
            <tr>
              <th colspan="2" class="text-center">RESUMO DESPESAS</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-danger">
              <td class="text-danger">
                <b>Despesas vencidas</b>
              </td>
              <td class="text-danger text-right">
                <b>{{numeral(expenseData.totalAmountPendenteAtrasada).format('$ 0,0.00')}}</b>
              </td>
            </tr>
            <tr class="bg-success">
              <td class="text-success">
                <b>Despesas a vencer</b>
              </td>
              <td class="text-success text-right">
                <b>{{numeral(expenseData.totalAmountPendenteEmDia).format('$ 0,0.00')}}</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Despesas pagas</b>
              </td>
              <td class="text-right">
                <b>{{ numeral(expenseData.totalAmountPago).format('$ 0,0.00') }}</b>
              </td>
            </tr>
            <tr class="bg-info">
              <td>Total Geral</td>
              <td style="font-size:18px;" class="text-right">
                <b>{{ numeral(expenseData.totalAmountExpenses).format('$ 0,0.00') }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-12">
        <table class="table-bordered table-stripped table">
          <thead>
            <tr>
              <th colspan="4" class="text-center">
                HISTÓRICO FINANCEIRO
                <b @click="print" class="pull-right"><i class="fa fa-print fa-lg"></i></b>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-danger bg-danger">
              <td>1</td>
              <td>{{ vehicleData.acquisition_date }}</td>
              <td>Compra</td>
              <td class="text-right">
                - {{ numeral(this.vehicleData.mean_price).format('$ 0,0.00') }} [-]
              </td>
            </tr>
            <tr class="text-danger bg-danger">
              <td>2</td>
              <td>{{ vehicleData.acquisition_date }}</td>
              <td>Comissões</td>
              <td class="text-right">
                - {{ numeral(this.vehicleData.commission).format('$ 0,0.00') }} [-]
              </td>
            </tr>
            <tr class="text-danger bg-danger" v-for="(expense, index) in expenseData.expenses">
              <td>{{ 3 + index }}</td>
              <td>{{ expense.date }}</td>
              <td>{{ expense.expense_type.description }}</td>
              <td class="text-right">- R$ {{ expense.amount }} [-]</td>
            </tr>
            <template v-if="typeof(sale.payments_methods) !== 'undefined'">
              <tr class="text-success bg-success" v-for="(payment, index) in sale.payments_methods.data">
                <td>{{ expenseData.pago.length + 3 + (++index) }}</td>
                <td>{{ moment(payment.date, 'YYYY-MM-DD').format('DD/MM/YYYY') }}</td>
                <td>{{ payment.payment_method.description }}</td>
                <td class="text-right">{{ numeral(payment.value).format('$ 0,0.00') }} [+]</td>
              </tr>
            </template>
            <tr class="bg-info">
              <td colspan="3" class="text-right">TOTAL: </td>
              <td class="text-right" style="font-size:18px;" :class="totalGeralResumoFinanceiro.value() < 0 ? 'text-danger' : 'text-success'">
                <b>{{ totalGeralResumoFinanceiro.format('$ 0,0.00') }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import numeral from 'numeral'
  import moment from 'moment'
  export default {
    computed: {
      vehicleData () {
        return this.$parent.$refs.customFormPersonalData
      },
      expenseData () {
        return this.$parent.$refs.expenseForm
      },
      totalGeralResumoFinanceiro () {
        return numeral(this.sale.price_raw)
          .subtract(numeral(this.expenseData.totalAmountExpenses).value())
          .subtract(numeral(this.vehicleData.commission).value())
          .subtract(numeral(this.vehicleData.mean_price).value())
      }
    },
    methods: {
      numeral,
      moment,
      print () {
        window.print()
      }
    },
    mounted () {
      this.$root.axios.get(`vehicle-sale/by-entry/${this.vehicleData.id}`)
        .then(({ data }) => {
          if (typeof (data.data) !== 'undefined') {
            if (data.data.data.length === 1) {
              this.sale = data.data.data[0]
            }
          }
        })
    },
    data () {
      return {
        sale: {}
      }
    }
  }
</script>
<style type="text/css" scoped="scoped">
  .visible-print-block {
    display: block !important;
  }
</style>
