<template lang="pug">
v-app
  v-snackbar(color="green lighten-1" v-model="success" absolute)
    span {{ successMessage }}
  v-snackbar(color="red lighten-1" v-model="error" absolute)
    span {{ errorMessage }}
  v-dialog(v-model="reserveVehicle.open" width="700" persistent app absolute)
    v-card
      v-flex(xs12)
        div(style="height: 20px; display: flex; flex-direction: row, align-items: center; justify-content: center" class="pl-2 pr-2")
          v-btn(small flat icon)
            v-icon(color="green") book
          h5.font-weight-bold Reserva de Veículo
          v-spacer
          v-btn(@click="$store.dispatch('CHANGE_VISIBILITY', resetaDados=null)" small outline color="red lighten-3")
            span.red--text fechar
        v-divider
      div(style="display: flex; width: 100%; flex-wrap: wrap")
        v-flex(xs4)    
          div.ml-2.mr-1.pa-2(color="grey lighten-3" style="border-radius: 4px; border: 1px solid #090;  background-color: #f2f2f2" class="elevation-0")
            v-flex(xs12)
              div.centraliza
                v-icon person
                h5.text-xs-center.font-weight-bold(v-if="reserveVehicle.veiculoSelecionado.state_id === 3 ? false : true") {{ user.userName }}
                h5.text-xs-center.font-weight-bold(v-if="reserveVehicle.veiculoSelecionado.state_id === 3 ? true : false") {{ reserveVehicle.veiculoSelecionado.user_reserva }}
        v-flex(xs4)    
          div.ml-2.mr-1.pa-2(color="grey lighten-3" style="border-radius: 4px; border: 1px solid #090;  background-color: #f2f2f2" class="elevation-0")
            v-flex(xs12)
              div.centraliza
                v-icon date_range
                h5.text-xs-center.font-weight-bold {{ reserveVehicle.veiculoSelecionado.data_reserva | dataReserva }}
        v-flex(xs4)
          div.ml-2.mr-1.pa-2(color="grey lighten-3" :style="reserveVehicle.veiculoSelecionado.state_id === 3 ? 'border: 1px solid #900' : 'border-left: 1px solid #090'" style=" border-radius: 4px; background-color: #f2f2f2" class="elevation-0")
            v-flex(xs12)
              div.centraliza
                v-icon(:color="reserveVehicle.veiculoSelecionado.state_id === 3 ? 'red lighten-2' : 'green'") bookmark
                h5.text-xs-center.font-weight-bold {{ reserveVehicle.veiculoSelecionado.state_id | status }}
        v-flex(xs12)
          v-divider
        v-flex(xs12)
          v-textarea(v-if="reserveVehicle.veiculoSelecionado.state_id === 3? false : true" box color="green" class="ma-2" v-model="observacoes")
          v-textarea(v-if="reserveVehicle.veiculoSelecionado.state_id === 3? true : false" disabled box color="green" class="ma-2" v-model="reserveVehicle.reserva.observacoes")
        v-flex(xs12 class="pa-2")
          v-btn(v-if="reserveVehicle.veiculoSelecionado.state_id === 3 ? true : false" block @click="cancelaReserva(reserveVehicle, user)" class="" color="red lighten-2")
            span.white--text Cancelar Reserva
            v-icon(class="mb-1 mt-1 ml-2" color="white") close
            v-progress-circular(indeterminate v-if="carregando" size="20")
          v-btn(v-if="reserveVehicle.veiculoSelecionado.state_id === 3 ? false : true" block @click="montaReserva(reserveVehicle)" class="" color="green")
            span.white--text Reservar Veículo
            v-icon(class="mb-1 mt-1 ml-2" color="white") check
            v-progress-circular(indeterminate v-if="carregando" size="20")
        
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import 'moment/locale/pt-br'

export default {
  data () {
    return {
      observacoes: '',
      carregando: false,
      success: false,
      successMessage: '',
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState({
      reserveVehicle: state => state.reserveVehicle,
      user: state => state.user
    })
  },
  filters: {
    status (val) {
      if (!val) return ''
      if (val === 3) {
        return 'Veículo Reservado'
      } else {
        return 'Disponível Para Reserva'
      }
    },
    dataReserva (val) {
      if (!val) {
        return moment().locale('pt-br').format('LL')
      }
      const dataDaReserva = moment(val).locale('pt-br').format('LL')
      return dataDaReserva
    }
  },
  methods: {
    montaReserva (reserveVehicle) {
      this.carregando = true
      const token = localStorage.token
      const obsVendedor = this.observacoes
      const idVeiculo = reserveVehicle.veiculoSelecionado.id

      const config = {
        headers: {
          'Authorization': 'bearer' + token
        }
      }

      const body = {
        entry_id: idVeiculo,
        obs: obsVendedor
      }
      this.$root.axios
        .post(`http://vendas.vipcarseminovos.com.br/api/v1/entries/reservar/${idVeiculo}`, body, config)
        .then(res => {
          this.success = true
          this.successMessage = 'A Reserva foi feita'
          this.carregando = false
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = error.message
          this.carregando = false
        })
      var r = {
        entry: {},
        reserva: {}
      }
      this.$store.dispatch('CHANGE_VISIBILITY', r)
    },
    cancelaReserva (reserveVehicle, user) {
      this.carregando = true
      // const token = localStorage.token

      const idVeiculo = reserveVehicle.veiculoSelecionado.id_reserva
      const idUser = parseInt(user.id)
      if (reserveVehicle.veiculoSelecionado.vendedor_id === idUser || user.profile.description === 'Gerencia') {
        this.$root.axios
          .post(`http://vendas.vipcarseminovos.com.br/api/v1/entries/cancelar_reserva/${idVeiculo}`)
          .then(res => {
            this.carregando = false
            this.success = true
            this.successMessage = 'A Reserva foi cancelada'
          })
          .catch(error => {
            this.error = true
            this.carregando = false
            this.errorMessage = error.message
          })
        var r = {
          entry: {},
          reserva: {}
        }
        this.$store.dispatch('CHANGE_VISIBILITY', r)
      } else {
        alert('Você não tem permissão para cancelar esta reserva')
      }
    }
  }
}
</script>

<style scoped>
  .reserva {
    border-radius: 6px;
    height: 450px;
    flex-wrap: wrap;
    display: flex;
    width: 100%;
  }
  .centraliza {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
