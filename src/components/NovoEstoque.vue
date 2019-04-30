<template>
  <div style="margin-bottom: 80px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="jarviswidget jarviswidget-color-blue m-t-10" role="widget">
      <header role="heading">
        <h2 style="display:block; width: 100%">
          <strong>
            <i class="fa fa-archive fa-lg"></i>
            Veículos disponíveis
          </strong>
          <!-- <button style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 bg-color-blue pull-right">
                <i class="fa fa-lg fa-check-circle"></i> <span class="hidden-mobile">Ver todos</span>
          </button>-->
        </h2>
      </header>
      <div role="content">
        <div class="widget-body no-padding">
          <div class="widget-body-toolbar">
            <div class="row">
              <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12">
                <h6 class="mb-0 font-weight-thin">Exibir/Ocultar Colunas:</h6>
                <v-btn
                  small
                  flat
                  outline
                  :color="show.vehicle === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('vehicle')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Veículo </span><v-icon class="">{{ show.vehicle === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>
                <v-btn
                  small
                  flat
                  outline
                  :color="show.year === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('year')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Mod/Fab </span><v-icon class="">{{ show.year === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.brand === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('brand')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Marca </span><v-icon class="">{{ show.brand === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.plate === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('plate')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Placa </span><v-icon class="">{{ show.plate === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.color === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('color')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >cor </span><v-icon class="">{{ show.color === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.tenant === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('tenant')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Loja </span><v-icon class="">{{ show.tenant === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.price === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('price')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Preço </span><v-icon class="">{{ show.price === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.days === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('days')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Dias em estoque </span><v-icon class="">{{ show.days === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

                <v-btn
                  small
                  flat
                  outline
                  :color="show.lastAction === true ? 'green' : 'red'"
                  v-on:click="() => this.toggleCol('lastAction')"
                  v-bind:class="{active: show.vehicle, inactive: !show.vehicle}"
                  class="mb-2 ml-0 mr-0"
                ><span class="font-weight-bold body-1" >Ultima ação </span><v-icon class="">{{ show.lastAction === true ? 'visibility' : 'visibility_off' }}</v-icon></v-btn>

              </div>
            </div>
          </div>
          <div  class="table-responsive" style="display: flex; max-width: 100% ; min-height: 700px;">
            <table class="table table-condensed table-bordered">
              <thead>
                <tr class="pb-0 mb-0">

                  <th v-if="show.vehicle">
                    <input
                      style="padding-left: 5px; border: 1px solid #3333; border-radius: 5px; height: 28px;"
                      v-model="vehicleFilter"
                    />
                  </th>

                  <th v-if="show.year">
                    <v-select
                      multiple
                      v-model="yearFilter"
                      :options="yearForSearch"
                      :reduce="ano => ano"
                      label="ano"
                    />
                  </th>

                  <th v-if="show.brand">
                    <v-select
                      multiple
                      v-model="brandFilter"
                      :options="brandForSearch"
                      :reduce="marca => marca"
                      label="marca"
                    />
                  </th>

                  <th v-if="show.plate">
                    <v-select
                      multiple
                      v-model="plateFilter"
                      :options="plateForSearch"
                      :reduce="placa => placa"
                      label="placa"
                    />
                  </th>

                  <th v-if="show.color">
                    <v-select
                      multiple
                      v-model="colorFilter"
                      :options="colorForSearch"
                      :reduce="cor => cor"
                      label="cor"

                    />
                  </th>

                  <th v-if="show.tenant">
                    <v-select
                      multiple
                      v-model="tenantFilter"
                      :options="tenantForSearch"
                      :reduce="loja => loja"
                      label="loja"
                    />
                  </th>

                  <th v-if="show.price" >
                    <input
                      style="width: 70px;padding-left: 5px; border: 1px solid #3333; border-radius: 5px; height: 28px;"
                      v-model="priceFilter"
                    />
                  </th>

                  <th v-if="show.days">
                    <input
                      style="width: 50px;padding-left: 5px; border: 1px solid #3333; border-radius: 5px; height: 28px;"
                      v-model="daysFilter"
                    />
                  </th>
                  
                  <th v-if="show.lastAction">
                    <input
                      style="display: flex; width: 100%; padding-left: 5px; border: 1px solid #3333; border-radius: 5px; height: 28px;"
                      v-model="lastActionFilter"
                    />
                  </th>

                  <th></th>

                </tr>
              </thead>
              <thead>
                <tr>
                  <!-- <th>Disp.</th> -->
                  <th v-if="show.vehicle">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span>Veículo</span>
                      <v-btn @click="vehicleSort" :disabled="ordenaDisable" small icon flat>
                        <v-icon class="mb-1" size="17" v-if="ordena">arrow_upward</v-icon>
                        <v-icon class="mb-1" size="17" v-else>arrow_downward</v-icon>
                      </v-btn>
                    </div>
                  </th>
                  <th v-if="show.year">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span>Mod/Fab</span>
                      <v-btn @click="yearSort" :disabled="ordenaDisable" small icon flat>
                        <v-icon class="mb-1" size="17" v-if="ordena">arrow_upward</v-icon>
                        <v-icon class="mb-1" size="17" v-else>arrow_downward</v-icon>
                      </v-btn>
                    </div>
                  </th>
                  <th v-if="show.brand">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span>Brand</span>
                      <v-btn @click="brandSort" :disabled="ordenaDisable" small icon flat>
                        <v-icon class="mb-1" size="17" v-if="ordena">arrow_upward</v-icon>
                        <v-icon class="mb-1" size="17" v-else>arrow_downward</v-icon>
                      </v-btn>
                    </div>
                  </th>
                  <th v-if="show.plate">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span class="mb-2">Placa</span>
                    </div>
                  </th>
                  <th v-if="show.color">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span class="mb-2">Cor</span>
                    </div>
                  </th>
                  <th v-if="show.tenant">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span class="mb-2">Loja</span>
                    </div>
                  </th>
                  <th v-if="show.price">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span>Preço</span>
                      <v-btn @click="priceSort" :disabled="ordenaDisable" small icon flat>
                        <v-icon class="mb-1" size="17" v-if="ordena">arrow_upward</v-icon>
                        <v-icon class="mb-1" size="17" v-else>arrow_downward</v-icon>
                      </v-btn>
                    </div>
                  </th>
                  <th v-if="show.days">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span>Dias em estoque</span>
                      <v-btn @click="daysSort" :disabled="ordenaDisable" small icon flat>
                        <v-icon class="mb-1" size="17" v-if="ordena">arrow_upward</v-icon>
                        <v-icon class="mb-1" size="17" v-else>arrow_downward</v-icon>
                      </v-btn>
                    </div>
                  </th>
                  <th v-if="show.lastAction">
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span class="mb-2">Última Ação</span>
                    </div>
                  </th>
                  <th>
                    <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center;" >
                      <span class="mb-2">Ações</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody style="min-height: 700px; max-width: 100%">
                <template v-if="entriesOthersEntities.length">
                  <tr
                    style="min-height: 700px; max-width: 100%"
                    v-for="(entry, i) in filteredEntries"
                    :key="i+'table'"
                  >
                    <!-- <td>{{entry.state_label}}</td> -->
                    <td v-if="show.vehicle">{{entry.full_name}} </td>
                    <td v-if="show.year">{{entry.fabrication_year}}</td>
                    <td v-if="show.brand">{{entry.brand}}</td>
                    <td v-if="show.plate">{{entry.plate}}</td>
                    <td v-if="show.color">{{entry.color}}</td>
                    <td v-if="show.tenant">{{entry.tenant_fancy_name}}</td>
                    <td v-if="show.price">R$ {{entry.sale_price}}</td>
                    <td
                      v-if="show.days"
                      v-bind:class="{overdue: totalOfDays(entry.created_at) >= 60}"
                    >{{ totalOfDays(entry.created_at)}}</td>
                    <td v-if="show.lastAction">{{entry.description}}</td>
                    <td style="width: 20px">
                      <button
                        v-if="profile.map['vehicle-entries'].includes('edit')"
                        @click="$router.push({ name: 'VehicleEntryEdit', params: { id: entry.id } })"
                        class="btn btn-sm btn-default"
                      >Detalhes</button>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="10">
                      <div class="text-center">
                        <i class="text-info fa fa-2x fa-inbox"></i>
                        <h5>Não há veículos cadastrados</h5>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { map, debounce } from 'lodash'
import { mapState } from 'vuex'
import SortingService from '@/services/sorting/sortingService'
import Api from '@/components/Resources/VehicleEntry/Api'
import mmt from 'moment'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'estoque',
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      user: state => state.user,
      authenticated: state => state.user.authenticated,
      token: state => state.user.token,
      profile: state => state.user.profile
    })
  },
  watch: {
    vehicleFilter: function () {
      const filtro = this.vehicleFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      var filtroUpperCase = filtro.toUpperCase()
      filtroTotal.map(item => {
        var dadoUpperCase = item.full_name.toUpperCase()
        if (dadoUpperCase.match(filtroUpperCase)) {
          filtrados.push(item)
        }
      })

      this.vehicleResults = filtrados
      this.noRepeatPlease()
      // setTimeout(() => this.noRepeatPlease(), 1000)
    },
    yearFilter: function () {
      const filtro = this.yearFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtro.map(dado => {
        const dadoUm = `${dado}/${dado + 1}`
        const dadoDois = `${dado - 1}/${dado}`

        filtroTotal.map(item => {
          if (item.fabrication_year === dadoUm || item.fabrication_year === dadoDois) {
            filtrados.push(item)
          }
        })
      })

      this.yearResults = filtrados
      this.noRepeatPlease()
    },
    brandFilter: function () {
      const filtro = this.brandFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtro.map(dado => {
        filtroTotal.map(item => {
          if (item.brand.toUpperCase() === dado) {
            filtrados.push(item)
          }
        })
      })

      this.brandResults = filtrados
      this.noRepeatPlease()
    },
    plateFilter: function () {
      const filtro = this.plateFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtro.map(dado => {
        filtroTotal.map(item => {
          if (item.plate.toUpperCase() === dado) {
            filtrados.push(item)
          }
        })
      })

      this.plateResults = filtrados
      this.noRepeatPlease()
    },
    colorFilter: function () {
      const filtro = this.colorFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtro.map(dado => {
        filtroTotal.map(item => {
          if (item.color.toUpperCase() === dado) {
            filtrados.push(item)
          }
        })
      })

      this.colorResults = filtrados
      this.noRepeatPlease()
    },
    tenantFilter: function () {
      const filtro = this.tenantFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtro.map(dado => {
        filtroTotal.map(item => {
          if (item.tenant_fancy_name.toUpperCase() === dado) {
            filtrados.push(item)
          }
        })
      })

      this.tenantResults = filtrados
      this.noRepeatPlease()
    },
    priceFilter: function () {
      const filtro = parseFloat(this.priceFilter)
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtroTotal.map(item => {
        const salePrice = parseFloat(item.sale_price)
        // console.log('Sale Price : ' + salePrice)
        if (salePrice <= filtro) {
          filtrados.push(item)
        }
      })

      this.priceResults = filtrados
      this.noRepeatPlease()
    },
    daysFilter: function () {
      const filtro = parseInt(this.daysFilter)
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      filtroTotal.map(item => {
        const totalDeDias = this.totalOfDays(item.created_at)
        if (totalDeDias >= filtro) {
          filtrados.push(item)
        }
      })

      this.daysResults = filtrados
      this.noRepeatPlease()
    },
    // filtro de texto
    lastActionFilter: function () {
      const filtro = this.lastActionFilter
      const filtroTotal = this.filteredEntriesBkp
      var filtrados = []

      var filtroUpperCase = filtro.toUpperCase()
      filtroTotal.map(item => {
        var dadoUpperCase = item.description.toUpperCase()
        if (dadoUpperCase.match(filtroUpperCase)) {
          filtrados.push(item)
        }
      })

      this.lastActionResults = filtrados
      this.noRepeatPlease()
    },
    searchTerm: function (term) {
      this.searchTermIsDirty = true
      this.search(term)
    },
    filterSearch: function (term) {
      this.filter(term)
    },
    searchTermOthersEntities: function (term) {
      this.searchTermIsDirtyOthersEntities = true
      this.searchOthers(term)
    },
    'show.vehicle': function () {},
    'show.year': function () {},
    'show.brand': function () {},
    'show.plate': function () {},
    'show.color': function () {},
    'show.tenant': function () {},
    'show.price': function () {},
    'show.days': function () {},
    filters: function () {},
    'filters.vehicle': function () {},
    'filters.year': function () {},
    'filters.brand': function () {},
    'filters.plate': function () {},
    'filters.color': function () {},
    'filters.tenant': function () {},
    'filters.price': function () {},
    'filters.days': function () {},
    entriesOthersEntities: function () {
      this.filteredEntries = this.entriesOthersEntities
    }
  },
  methods: {
    daysSort: function () {
      this.ordenaDisable = true
      const ordena = this.ordena

      this.ordena = !this.ordena

      const dadosPO = this.filteredEntries
      var dadosParaOrdenar = dadosPO
      var self = this
      var dadosOrdenados = null
      if (ordena) {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return self.totalOfDays(a.created_at) - self.totalOfDays(b.created_at)
        })
      } else {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return self.totalOfDays(b.created_at) - self.totalOfDays(a.created_at)
        })
      }

      this.filteredEntries = dadosOrdenados
      this.ordenaDisable = false
    },
    priceSort: function () {
      this.ordenaDisable = true
      const ordena = this.ordena

      this.ordena = !this.ordena

      const dadosPO = this.filteredEntries
      var dadosParaOrdenar = dadosPO
      var dadosOrdenados = null
      if (ordena) {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return parseFloat(a.sale_price) - parseFloat(b.sale_price)
        })
      } else {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return parseFloat(b.sale_price) - parseFloat(a.sale_price)
        })
      }

      this.filteredEntries = dadosOrdenados
      this.ordenaDisable = false
    },
    yearSort: function () {
      this.ordenaDisable = true
      const ordena = this.ordena

      this.ordena = !this.ordena

      const dadosPO = this.filteredEntries
      var dadosParaOrdenar = dadosPO
      var dadosOrdenados = null
      if (ordena) {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return a.fabrication_year.localeCompare(b.fabrication_year)
        })
      } else {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return b.fabrication_year.localeCompare(a.fabrication_year)
        })
      }

      this.filteredEntries = dadosOrdenados
      this.ordenaDisable = false
    },
    vehicleSort: function () {
      this.ordenaDisable = true
      const ordena = this.ordena

      this.ordena = !this.ordena

      const dadosPO = this.filteredEntries
      var dadosParaOrdenar = dadosPO
      var dadosOrdenados = null
      if (ordena) {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return a.full_name.localeCompare(b.full_name)
        })
      } else {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return b.full_name.localeCompare(a.full_name)
        })
      }

      this.filteredEntries = dadosOrdenados
      this.ordenaDisable = false
    },
    brandSort: function () {
      this.ordenaDisable = true
      const ordena = this.ordena

      this.ordena = !this.ordena

      const dadosPO = this.filteredEntries
      var dadosParaOrdenar = dadosPO
      var dadosOrdenados = null
      if (ordena) {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return a.brand.localeCompare(b.brand)
        })
      } else {
        dadosOrdenados = dadosParaOrdenar.sort(function (a, b) {
          return b.brand.localeCompare(a.brand)
        })
      }

      this.filteredEntries = dadosOrdenados
      this.ordenaDisable = false
    },
    noRepeatPlease: function () {
      const vehicle = this.vehicleResults
      const year = this.yearResults
      const brand = this.brandResults
      const plate = this.plateResults
      const color = this.colorResults
      const tenant = this.tenantResults
      const price = this.priceResults
      const days = this.daysResults
      const lastAction = this.lastActionResults

      const vehicleCode = this.vehicleResults.length === 0 ? '0' : '1'
      const yearCode = this.yearResults.length === 0 ? '0' : '1'
      const brandCode = this.brandResults.length === 0 ? '0' : '1'
      const plateCode = this.plateResults.length === 0 ? '0' : '1'
      const colorCode = this.colorResults.length === 0 ? '0' : '1'
      const tenantCode = this.tenantResults.length === 0 ? '0' : '1'
      const priceCode = this.priceResults.length === 0 ? '0' : '1'
      const daysCode = this.daysResults.length === 0 ? '0' : '1'
      const lastActionCode = this.lastActionResults.length === 0 ? '0' : '1'

      var codigo = vehicleCode + yearCode + brandCode + plateCode + colorCode + tenantCode + priceCode + daysCode + lastActionCode

      var resultadosFiltrados = []
      var resultadosNaoFiltrados = []

      // inicio dos loops
      vehicle.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      year.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      brand.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      plate.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      color.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      tenant.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      price.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      days.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      lastAction.map(v => {
        return resultadosNaoFiltrados.push(v)
      })

      // loopFilter
      resultadosNaoFiltrados.map(dado => {
        let dadoExiste = false
        const dadoAtual = dado.plate

        // Verifica se já existe
        resultadosFiltrados.map(dadoExistente => {
          if (dadoExistente.plate === dadoAtual) {
            dadoExiste = true
          }
        })
        // fim da verificação

        if (dadoExiste) {
        } else {
          return resultadosFiltrados.push(dado)
        }
      })

      this.resultadosNaoFiltrados = resultadosNaoFiltrados
      this.afterNoRepeat(resultadosFiltrados, codigo)
    },
    afterNoRepeat: function (resultadosFiltrados, codigo) {
      const vehicle = this.vehicleResults
      const year = this.yearResults
      const brand = this.brandResults
      const plate = this.plateResults
      const color = this.colorResults
      const tenant = this.tenantResults
      const price = this.priceResults
      const days = this.daysResults
      const lastAction = this.lastActionResults

      const segundoFiltro = resultadosFiltrados
      var resultadoSegundoFiltro = []
      segundoFiltro.map(item => {
        var um = '0'
        var dois = '0'
        var tres = '0'
        var quatro = '0'
        var cinco = '0'
        var seis = '0'
        var sete = '0'
        var oito = '0'
        var nove = '0'
        // item representa um item gerado na pesquisa
        // inicio dos loops

        // um vehicle
        // ok
        if (vehicle.length === 0) {
          um = '0'
        } else {
          vehicle.map(v => {
            if (v.full_name === item.full_name) {
              um = '1'
            }
          })
        }

        // dois year
        if (year.length === 0) {
          dois = '0'
        } else {
          year.map(v => {
            const dado = parseInt(item.fipe_year)
            const dadoUm = `${dado}/${dado + 1}`
            const dadoDois = `${dado - 1}/${dado}`
            if (v.fabrication_year === dadoUm || v.fabrication_year === dadoDois) {
              dois = '1'
            }
          })
        }

        // tres brand
        if (brand.length === 0) {
          tres = '0'
        } else {
          brand.map(v => {
            if (v.brand === item.brand) {
              tres = '1'
            }
          })
        }

        // quatro plate
        if (plate.length === 0) {
          quatro = '0'
        } else {
          plate.map(v => {
            if (v.plate === item.plate) {
              quatro = '1'
            }
          })
        }

        // cinco color
        if (color.length === 0) {
          cinco = '0'
        } else {
          color.map(v => {
            if (v.color === item.color) {
              cinco = '1'
            }
          })
        }

        // seis tenant.tenant_fancy_year
        // -
        if (tenant.length === 0) {
          seis = '0'
        } else {
          tenant.map(v => {
            if (v.tenant_fancy_name === item.tenant_fancy_name) {
              seis = '1'
            }
          })
        }

        // sete price sale_price_formatted
        // no ok preciso mecher no priceFilter() no watch e fazer com que ele envia os preços iguais ou menores que o valor solicitado.
        if (price.length === 0) {
          sete = '0'
        } else {
          price.map(v => {
            if (parseFloat(item.sale_price) <= parseFloat(v.sale_price)) {
              sete = '1'
            }
          })
        }

        // oito days created_at
        // no ok
        if (days.length === 0) {
          oito = '0'
        } else {
          days.map(v => {
            if (this.totalOfDays(item.created_at) >= this.totalOfDays(v.created_at)) {
              oito = '1'
            }
          })
        }

        // nove ultimo_movimento
        // ok
        if (lastAction.length === 0) {
          nove = '0'
        } else {
          lastAction.map(v => {
            if (v.description === item.description) {
              nove = '1'
            }
          })
        }

        // codigo gerado aqui
        var codigoGerado = um + dois + tres + quatro + cinco + seis + sete + oito + nove

        if (codigoGerado === codigo) {
          resultadoSegundoFiltro.push(item)
        }
      })
      // ok results
      if (codigo === '000000000') {
        const bkp = this.filteredEntriesBkp
        this.filteredEntries = bkp
      } else {
        this.filteredEntries = resultadoSegundoFiltro
      }
    },
    // ok
    filterVehicle: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.full_name.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const dadoSort = dadosSearch.sort()
      this.vehicleForSearch = dadoSort
    },
    // ok
    filterYear: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = parseInt(dado.fipe_year)
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const yearSortidos = dadosSearch.sort()
      this.yearForSearch = yearSortidos
    },
    // ok
    filterBrand: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.brand.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const brandSortidos = dadosSearch.sort()
      this.brandForSearch = brandSortidos
    },
    // ok
    filterPlate: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.plate.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const plateSortidas = dadosSearch.sort()
      this.plateForSearch = plateSortidas
    },
    // ok
    filterColor: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.color.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const colorSortida = dadosSearch.sort()
      this.colorForSearch = colorSortida
    },
    // ok
    filterTenant: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.tenant_fancy_name.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const tenantSortida = dadosSearch.sort()
      this.tenantForSearch = tenantSortida
    },
    // ok
    filterPrice: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = parseFloat(dado.sale_price)
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const priceSortido = dadosSearch.sort()
      this.priceForSearch = priceSortido
    },
    // ok
    filterDays: function (result) {
      var dados = result
      var dadosSearch = []
      var self = this
      dados.map(function (dado) {
        let dadoExiste = false
        let dadoAt = dado.created_at
        var dadoAtual = self.totalOfDays(dadoAt)
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const daysSearch = dadosSearch.sort()
      this.daysForSearch = daysSearch
    },
    // ok
    filterLastAction: function (result) {
      var dados = result
      var dadosSearch = []
      dados.map(function (dado) {
        let dadoExiste = false
        const dadoAtual = dado.description.toUpperCase()
        // loop
        dadosSearch.map(function (dadoExistente) {
          if (dadoExistente === dadoAtual) {
            dadoExiste = true
          }
        })
        // loop
        if (dadoExiste) {
        } else {
          dadosSearch.push(dadoAtual)
        }
      })
      const lastActionSortida = dadosSearch.sort()
      this.lastActionForSearch = lastActionSortida
    },
    addFilter: function (field, searchTerm) {
      this.filters = {
        ...this.filters,
        [field]: new Set([...this.filters[field], searchTerm])
      }
    },
    removeFilter: function (field, searchTerm) {
      const result = this.filters[field].filter(x => x !== searchTerm)
      this.filters = { ...this.filters, [field]: new Set(result) }
    },
    filter: function (searchTerms) {
      if (searchTerms === null || searchTerms === [] || searchTerms === '') {
        this.filteredEntries = this.entriesOthersEntities
        return
      }
      let result = []
      const condicoes = searchTerms.split(',')
      this.entriesOthersEntities.map(x => {
        // let searchForYear = resp.replace(/\D\s/g, '').replace(/\(|\)|-|\./g, '')

        const strBusca = `${x.full_name} - ${x.fabrication_year} - ${
          x.brand
        } - ${x.plate} - ${x.sale_price_formatted} - ${x.ultimo_movimento} - ${
          x.color
        } - ${x.tenant.tenant_fancy_name}`

        // const strBusca = `${x.full_name} - ${x.fabrication_year}  - ${x.plate}  - ${x.ultimo_movimento}`

        // - ${x.fabrication_year}
        // - ${x.sale_price_formatted}
        // - ${x.brand}
        // - ${x.color} - ${x.tenant.tenant_fancy_name}

        let match = true
        for (let c of condicoes) {
          if (!strBusca.toLowerCase().includes(c.toLowerCase())) {
            match = false
            return
          }
        }
        if (match) {
          result.push(x)
        }
      })
      this.filteredEntries = result
    },
    search: debounce(function (term) {
      let callback = ({ data }) => {
        this.searchTermIsDirty = false
        this.entityEntries = data.data
      }

      this.$root.axios
        .get(
          `entries-by-tenant/${localStorage.getItem('current-tenant-idkey')}`,
        {
          params: {
            q: term,
            sf:
                'fipe_brand:ilike;fipe_model:ilike;color:ilike;plate:ilike;fabrication_year:ilike',
            'only-available': true
          }
        }
        )
        .then(callback)
    }, 500),
    searchOthers: debounce(function (term) {
      // let callback = ({ data }) => {
      //   this.searchTermIsDirtyOthersEntities = false
      //   this.entriesOthersEntities = data
      // }

      this.$root.axios
        .get('/tenants', {
          params: {
            q: `id:${localStorage.getItem('current-tenant-idkey')}`,
            sf: 'id:!='
          }
        })
        .then(({ data }) => {
          this.othersTenants = map(data.data.data, e => e.id)
          this.$root.axios
            .get('/entries-by-tenant/' + this.othersTenants.join(','), {
              params: {
                q: term,
                'only-available': true,
                sf: 'fipe_vehicle:ilike;plate:ilike;renavam:ilike'
              }
            })
            .then(({ data }) => {
              this.entriesOthersEntities = data.data.data
              this.searchTermIsDirtyOthersEntities = false
            })
        })
      // this.api.useSortService(this.sortingService).performSearch({
      //   q: term,
      //   sf: 'fipe_brand:ilike;fipe_model:ilike;color:ilike;plate:ilike;fabrication_year:ilike'
      // }, callback)
    }, 500),
    toggleCol: function (col = null) {
      if (col) {
        if (col === 'vehicle') {
          this.show.vehicle = !this.show.vehicle
        }
        if (col === 'year') {
          this.show.year = !this.show.year
        }
        if (col === 'brand') {
          this.show.brand = !this.show.brand
        }
        if (col === 'plate') {
          this.show.plate = !this.show.plate
        }
        if (col === 'color') {
          this.show.color = !this.show.color
        }
        if (col === 'tenant') {
          this.show.tenant = !this.show.tenant
        }
        if (col === 'price') {
          this.show.price = !this.show.price
        }
        if (col === 'days') {
          this.show.days = !this.show.days
        }
        if (col === 'lastAction') {
          this.show.lastAction = !this.show.lastAction
        }
      }
      this.salvaEstadoDasColunas()
    },
    salvaEstadoDasColunas: function () {
      const show = this.show
      const userId = localStorage.id
      const token = localStorage.token

      const config = {
        headers: {
          'Authorization': 'bearer' + token,
          'Content-Type': 'application/json'
        }
      }

      const showStringfy = JSON.stringify(show)
      const body = {
        list_preferences: showStringfy
      }
      this.$root.axios
        .post(`http://vendas.vipcarseminovos.com.br/api/v1/employees/${userId}/update_listprefs`, body, config)
        .then(res => {
          this.respostaDoServidor = res
        })
        .catch(error => {
          this.respostaDoServidor = error
        })
    },
    totalOfDays: function (initial) {
      const now = new Date()
      const resp = mmt(now).diff(initial, 'days')
      return resp
    }
  },
  data () {
    return {
      ordena: true,
      ordenaDisable: false,
      show: {
        vehicle: true,
        year: true,
        brand: true,
        plate: true,
        color: true,
        tenant: true,
        price: true,
        days: true,
        lastAction: true
      },
      // inicio
      vehicleForSearch: [],
      yearForSearch: [],
      brandForSearch: [],
      plateForSearch: [],
      colorForSearch: [],
      tenantForSearch: [],
      priceForSearch: [],
      daysForSearch: [],
      lastActionForSearch: [],
      // \\
      vehicleFilter: '',
      yearFilter: [],
      brandFilter: [],
      plateFilter: [],
      colorFilter: [],
      tenantFilter: [],
      priceFilter: '',
      daysFilter: '',
      lastActionFilter: '',
      // \\
      vehicleResults: [],
      yearResults: [],
      brandResults: [],
      plateResults: [],
      colorResults: [],
      tenantResults: [],
      priceResults: [],
      daysResults: [],
      lastActionResults: [],
      // fim
      filterOptions: true,
      entityEntries: [],
      negotiations: [],
      entityPendencies: [],
      entriesOthersEntities: [],
      othersTenants: [],
      currentTenant: null,
      searchTerm: '',
      searchTermIsDirty: false,
      searchTermOthersEntities: '',
      searchTermIsDirtyOthersEntities: false,
      filteredEntries: [],
      filteredEntriesBkp: [],
      filters: {
        vehicle: null,
        year: null,
        brand: null,
        plate: null,
        color: null,
        tenant: null,
        price: null,
        days: null
      },
      filterSearch: [],
      resultadosNaoFiltrados: [],
      respostaDoServidor: null
    }
  },

  created () {
    this.api = new Api(this, 'vehicle-entry')
    this.sortingService = new SortingService(
      this,
      this.orderBy,
      this.sortBy,
      () => {
        this.search(this.searchTerm)
      }
    )
    this.$root.axios
      .get('/vehicle-entry', {
        params: {
          q: `tenant_id:${localStorage.getItem('current-tenant-idkey')}`,
          sf: 'tenant_id:=',
          'only-available': true
        }
      })
      .then(({ data }) => {
        this.entityEntries = data.data.data
      })

    this.$root.axios
      .get('/tenants', {
        params: {
          // q: `id:${localStorage.getItem('current-tenant-idkey')}`,
          // sf: 'id:!='
        }
      })
      .then(({ data }) => {
        this.othersTenants = map(data.data.data, e => e.id)
        this.$root.axios
          .get('http://vendas.vipcarseminovos.com.br/api/v1/entries/estoque/')
          .then(({ data }) => {
            this.entriesOthersEntities = data.data
            this.filteredEntriesBkp = data.data
            // this.filterVehicle(data.data)
            this.filterYear(data.data)
            this.filterBrand(data.data)
            this.filterPlate(data.data)
            this.filterColor(data.data)
            this.filterTenant(data.data)
            // this.filterPrice(data.data)
            // this.filterDays(data.data)
            // this.filterLastAction(data.data)
          })
      })
    this.$root.axios.get(`http://vendas.vipcarseminovos.com.br/api/v1/employees/${localStorage.id}/get_listprefs`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then((res) => {
      const listaPreferencia = res.data.data[0].list_preferences
      if (listaPreferencia !== null) {
        this.show = JSON.parse(listaPreferencia)
      }
    })
    .catch(() => console.log('erro:'))
    // })
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.testeRelative {
  position: relative;
}
</style>
