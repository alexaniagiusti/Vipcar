<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <h1 class="page-title txt-color-blueDark">
      <i class="fa fa-fw fa-car"></i> 
      Despesas de veículo
    </h1>
    <div class="row">
      <form>
        <div class="form-group">
          <label class="col-md-1 control-label">
            <i class="fa fa-tag"></i> Placa
          </label>
          <div class="col-md-8">
            <input class="form-control" id="search-by-plate" v-model="searchField" placeholder="Placa do Veículo" type="text">
          </div>
          <div class="col-md-2">
            <button @click.prevent="search" class="btn btn-block btn-default">
              <i class="fa fa-search"></i> Pesquisar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="row" style="margin-top: 40px;">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <edit-page :expense-vehicle-plate="true" v-if="typeof(vehicle.id) !== 'undefined'"></edit-page>
        <div v-else class="jarviswidget jarviswidget-sortable" id="wid-id-0" role="widget">
          <header role="heading">
            <h2><strong>Veículo Não localizado</strong></h2>
          </header>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditPage from '@/components/Resources/VehicleEntry/Edit/EditPage'
export default {

  name: 'ListPage',

  data () {
    return {
      searchField: '',
      vehicle: {},
      vehicles: []
    }
  },
  mounted () {
    let id = this.$route.query.x
    if (typeof (id) !== 'undefined') {
      this.$root.axios.get(`vehicle-entry/${id}`).then(({data: {data}}) => {
        this.setVehicle(data)
      })
    }

    this.$root.axios.get('/vehicle-entry').then(({data}) => {
      this.vehicles = data.data.data

      let options = this.vehicles.map((entry) => {
        return entry.plate
      })
      window.jQuertPolyfill('#search-by-plate').autocomplete({
        source: options,
        select: (event, ui) => {
          this.searchField = ui.item.value
          this.search()
        }
      })
    })
  },
  methods: {
    setVehicle (vehicle) {
      this.$router.push({
        path: 'expense-vehicle-plate',
        query: {
          x: vehicle.id,
          a: 'hr8'
        }
      })
      this.vehicle = vehicle
    },
    search () {
      this.$root.axios.get('vehicle-entry', {
        params: {
          q: `plate:${this.searchField}`,
          sf: 'plate:='
        }
      }).then(({data: {data: {data}}}) => {
        if (data.length === 1) {
          this.setVehicle(data[0])
        } else {
          this.vehicle = {}
          this.$router.push({
            path: 'expense-vehicle-plate'
          })
        }
      })
    }
  },
  components: {
    EditPage
  }
}
</script>

