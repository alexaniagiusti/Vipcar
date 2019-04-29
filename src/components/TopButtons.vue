<template>
  <div class="pull-right hidden-print">

    <div id="hide-menu" class="btn-header pull-right">
      <span> <a @click.prevent data-action="toggleMenu" title="Collapse Menu"><i class="fa fa-reorder"></i></a> </span>
    </div>
    <div id="logout" class="btn-header transparent pull-right">
      <span>
        <a @click.prevent.stop="logoutUser" title="Sign Out" data-action="userLogout" data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i class="fa fa-sign-out"></i>
        </a>
      </span>
    </div>
    <form style="margin-top:10px;" class="header-search pull-right">
      <select @change="doLogin" v-model="current" class="form-control mb-1" id="select-1">
        <option :value="tenant.tenant_id" v-for="tenant in tenants">{{ tenant.tenant_fancy_name }}</option>
      </select>
    </form>
    <form @submit.prevent style="min-width: 500px;" action="search.html" class="header-search pull-left">
      <input id="search-fld" type="text" v-model="search" name="param" placeholder="Buscar veículo por Placa / Data de Entrada" style="font-size: inherit !important;" class="input-lg ui-autocomplete-input" autocomplete="off">
      <button type="submit">
        <i class="fa fa-search"></i>
      </button>
      <a href="javascript:void(0);" id="cancel-search-js" title="Cancel Search"><i class="fa fa-times"></i></a>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import moment from 'moment'
  // import jquery from 'jquery'
  export default {
    data () {
      return {
        tenants: [],
        vehicles: [],
        search: undefined,
        current: localStorage.getItem('current-tenant-idkey')
      }
    },
    created () {
      this.$root.axios.get('/available-tenants-to-transfer').then(({data}) => {
        this.tenants = data.data.data
      })
    },
    mounted () {
      this.$root.axios.get('/vehicle-entry').then(({data}) => {
        this.vehicles = data.data.data

        let options = this.vehicles.map((entry) => {
          console.log()
          let date = moment(entry.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY')
          return `#${entry.id_key} ${entry.plate} - ${entry.state_label} (Entrada: ${date})`
        })
        window.jQuertPolyfill('#search-fld').autocomplete({
          source: options,
          select: (event, ui) => {
            let vehicle = this.vehicles.find(
              v =>
                ui.item.value.includes(v.plate) &&
                ui.item.value.includes('#' + v.id_key)
            )

            this.$router.push(`/vehicle-entry/${vehicle.id}/edit`)
            this.$router.push({name: 'VehicleEntryEdit',
              params: {
                id: vehicle.id
              }
            })
            this.search = undefined
          }
        })
      })
    },
    methods: {
      ...mapActions('user', [ 'logout', 'login' ]),
      logoutUser () {
        this.logout(this.$router)
      },
      doLogin (loginReponse) {
        var profile = JSON.parse(localStorage.getItem('profile'))
        this.$root.axios.get(`profiles/${profile.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(({data}) => {
          loginReponse.profile = data.data
          this.login({
            'token': localStorage.getItem('token'),
            'profile': loginReponse.profile,
            'user': {
              created_at: localStorage.getItem('created_at'),
              name: localStorage.getItem('userName'),
              email: localStorage.getItem('email')
            }
          })
          window.localStorage.setItem('current-tenant-idkey', this.current)
          this.$root.bus.$emit('logged')
          window.location.reload()
        })
      }
    }
  }
</script>
