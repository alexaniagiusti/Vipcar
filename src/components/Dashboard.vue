<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="jarviswidget jarviswidget-color-blueLight m-t-10" role="widget">
        <header role="heading">
          <h2 style="display:block; width: 100%">
            <strong>
              <i class="fa fa-lg fa-car"></i>
              Últimos 5 carros adicionados no estoque 
            </strong>
            <button v-if="profile.map['vehicle-entries'].includes('index')" @click="$router.push('/vehicle-entry')" style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 btn-primary pull-right">
              <i class="fa fa-lg fa-check"></i> <span class="hidden-mobile">Ver todos</span>
            </button>
          </h2>
        </header>
        <div role="content">
          <div class="widget-body no-padding">
            <div class="widget-body-toolbar">

              <div class="row">
                <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12 text-right">

                  <div class="input-group">
                    <span class="input-group-addon">
                        <!-- <span v-if="searchTermIsDirty">
                          <i class="fa fa-spinner fa-pulse"></i>
                        </span> -->
                        <i :class="'fa ' + (searchTermIsDirty ? 'fa-spinner fa-pulse': 'fa-search')"></i>
                      </span>
                      <input class="form-control" v-model="searchTerm" id="search-field" placeholder="" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive custom-scroll" style="max-height:150px; overflow-y: auto;">
                <table class="table table-condensed table-bordered">
                  <thead>
                    <tr>
                      <th><i class="fa fa-car"></i> Veículo</th>
                      <th><i class="fa fa-calendar"></i> Ano Fab/Ano Modelo</th>
                      <th><i class="fa fa-building"></i> Loja</th>
                      <th><i class="fa fa-ticket"></i> Placa</th>
                      <th><i class="fa fa-id-card"></i> Renavam</th>
                      <th><i class="fa fa-dollar"></i> Preço</th>
                      <th><i class="fa fa-share"></i> Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="entityEntries.length">
                      <tr v-for="entry in entityEntries">
                        <td width="25%">{{ entry.full_name }}</td>
                        <td width="20%">{{ entry.fabrication_year }}</td>
                        <td width="15%">{{ entry.tenant.tenant_fancy_name }}</td>
                        <td width="10%">{{ entry.plate }}</td>
                        <td width="15%">{{ entry.renavam }}</td>
                        <td width="15%">{{ entry.sale_price_formatted }}</td>
                        <td width="1%">
                          <button v-if="profile.map['vehicle-entries'].includes('edit')" @click="$router.push({ name: 'VehicleEntryEdit', params: { id: entry.id } })" class="btn btn-sm btn-default">
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="5">
                          <div class="text-center">
                            <template v-if="!searchTerm.length">
                                <i class="text-info fa fa-2x fa-inbox"></i>
                                <h5> Não há veículos para esta unidade.
                                  <a v-if="profile.map['vehicle-entries'].includes('create')" href="#" @click.prevent.stop="$router.push(`/vehicle-entry/create`)">
                                     Clique aqui para criar nova entrada <i class="fa fa-fw fa-plus-circle"></i>
                                  </a>
                                </h5>
                              </template>
                              <template v-else>
                              <i class="text-info fa fa-2x fa-inbox"></i>
                                <h5> Não há veículos para esta busca.
                                  <a
                                    v-if="profile.map['vehicle-entries'].includes('create')"
                                    href="#"
                                    @click.prevent.stop="searchTerm = ''">
                                      Limpar filtro <i class="fa fa-fw fa-times-circle"></i>
                                  </a>
                                </h5>
                              </template>
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
      <!-- <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="jarviswidget jarviswidget-color-greenLight  m-t-10" role="widget">
          <header role="heading">
            <h2 style="display:block; width: 100%">
              <strong>
                <i class="fa fa-star-o fa-lg"></i>
                Em negociação
              </strong>
              <button style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 bg-color-green pull-right">
                <i class="fa fa-lg fa-check"></i> <span class="hidden-mobile">Ver todos</span>
              </button>
            </h2>
          </header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="widget-body-toolbar">

                <div class="row">
                  <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12 text-right">

                    <div class="input-group">
                      <span class="input-group-addon">
                        <span v-if="searchTermIsDirty">
                          <i class="fa fa-spinner fa-pulse"></i>
                        </span>
                        <i class="fa fa-search"></i>
                      </span>
                      <input class="form-control" id="search-field" placeholder="" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive custom-scroll" style="height:150px; overflow-y: scroll;">
                <table class="table table-condensed table-bordered">
                  <thead>
                    <tr>
                      <th><i class="fa fa-car"></i> Veículo</th>
                      <th><i class="fa fa-ticket"></i> Placa</th>
                      <th><i class="fa fa-share"></i> Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carro 1</td>
                      <td>NET-9281</td>
                      <td width="1%">
                        <button class="btn btn-sm btn-default">
                          Acompanhar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Carro 1</td>
                      <td>NET-9281</td>
                      <td width="1%">
                        <button class="btn btn-sm btn-default">
                          Acompanhar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Carro 1</td>
                      <td>NET-9281</td>
                      <td width="1%">
                        <button class="btn btn-sm btn-default">
                          Acompanhar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Carro 1</td>
                      <td>NET-9281</td>
                      <td width="1%">
                        <button class="btn btn-sm btn-default">
                          Acompanhar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="jarviswidget jarviswidget-color-orange m-t-10" role="widget">
          <header role="heading">
            <h2 style="display:block; width: 100%">
              <strong>
                <i class="fa fa-bell fa-lg"></i>
                Minhas Pendências
              </strong>
              <button @click="$router.push({name: 'Reports', params: { aba: 'pendencies' }})" style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 bg-color-orange pull-right">
                <i class="fa fa-lg fa-warning"></i> <span class="hidden-mobile">Ver todos</span>
              </button>
            </h2>
          </header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="widget-body-toolbar">

                <div class="row">
                  <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12 text-right">

                    <div class="input-group">
                      <span class="input-group-addon">
                        <span v-if="searchTermIsDirty">
                          <i class="fa fa-spinner fa-pulse"></i>
                        </span>
                        <i class="fa fa-search"></i>
                      </span>
                      <input class="form-control" id="search-field" placeholder="" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive custom-scroll" style="height:150px; overflow-y: scroll;">
                <table class="table table-condensed table-bordered">
                  <thead>
                    <tr>
                      <th><i class="fa fa-car"></i> Veículo</th>
                      <th><i class="fa fa-ticket"></i> Placa</th>
                      <th><i class="fa fa-times-circle"></i> Pendências</th>
                      <th><i class="fa fa-warning"></i> Situação</th>
                      <th><i class="fa fa-share"></i> Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="entry.pendencies.data.filter(e => !e.completed_at && Number(user.id) === Number(e.assigned_employee.id_key)).length > 0" v-for="entry in entityEntries">
                        <td width="40%">{{ entry.full_name }}</td>
                        <td width="10%">{{ entry.plate }}</td>
                        <td width="20%">
                          <span class="label label-primary">
                          {{ entry.pendencies.data.filter(e => !e.completed_at  && Number(user.id) === Number(e.assigned_employee.id_key)).length }} Pendência(s) aguardando ação
                          </span>
                        </td>
                        <td class="text-center">
                          <i title="PENDÊNCIA ATRASADA" v-if="entry.pendencies.data.filter(e => e.due  && Number(user.id) === Number(e.assigned_employee.id_key)).length" class="fa fa-warning fa-2x text-danger"></i>
                          <i title="PENDÊNCIA EM DIA" v-else class="fa fa-clock-o text-success fa-2x"></i>
                        </td>
                        <td>
                          <button @click="$router.push({ path: '/vehicle-entry/' + entry.id + '/edit',  query: { a: 'hr6' }})" class="btn btn-sm btn-default">
                            Verificar pendências
                          </button>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="jarviswidget jarviswidget-color-red m-t-10" role="widget">
          <header role="heading">
            <h2 style="display:block; width: 100%">
              <strong>
                <i class="fa fa-warning fa-lg"></i>
                Veículos com Pendência
              </strong>
              <button @click="$router.push({name: 'Reports', params: { aba: 'pendencies' }})" style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 bg-color-red pull-right">
                <i class="fa fa-lg fa-warning"></i> <span class="hidden-mobile">Ver todos</span>
              </button>
            </h2>
          </header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="widget-body-toolbar">

                <div class="row">
                  <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12 text-right">

                    <div class="input-group">
                      <span class="input-group-addon">
                        <span v-if="searchTermIsDirty">
                          <i class="fa fa-spinner fa-pulse"></i>
                        </span>
                        <i class="fa fa-search"></i>
                      </span>
                      <input class="form-control" id="search-field" placeholder="" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive custom-scroll" style="height:150px; overflow-y: scroll;">
                <table class="table table-condensed table-bordered">
                  <thead>
                    <tr>
                      <th><i class="fa fa-car"></i> Veículo</th>
                      <th><i class="fa fa-ticket"></i> Placa</th>
                      <th><i class="fa fa-times-circle"></i> Pendências</th>
                      <th><i class="fa fa-warning"></i> Situação</th>
                      <th><i class="fa fa-share"></i> Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="entry.pendencies.data.filter(e => !e.completed_at).length > 0" v-for="entry in entityEntries">
                        <td width="40%">{{ entry.full_name }}</td>
                        <td width="10%">{{ entry.plate }}</td>
                        <td width="20%">
                          <span class="label label-primary">
                          {{ entry.pendencies.data.filter(e => !e.completed_at).length }} Pendência(s) aguardando ação
                          </span>
                        </td>
                        <td class="text-center">
                          <i title="PENDÊNCIA ATRASADA" v-if="entry.pendencies.data.filter(e => e.due).length" class="fa fa-warning fa-2x text-danger"></i>
                          <i title="PENDÊNCIA EM DIA" v-else class="fa fa-clock-o text-success fa-2x"></i>
                        </td>
                        <td>
                          <button @click="$router.push({ path: '/vehicle-entry/' + entry.id + '/edit',  query: { a: 'hr6' }})" class="btn btn-sm btn-default">
                            Verificar pendências
                          </button>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 80px;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="jarviswidget jarviswidget-color-blue m-t-10" role="widget">
          <header role="heading">
            <h2 style="display:block; width: 100%">
              <strong>
                <i class="fa fa-archive fa-lg"></i>
                Estoque em outras lojas
              </strong>
              <!-- <button style="border-radius: 0px !important; height: 33px !important;" class="btn btn-sm m-r-10 bg-color-blue pull-right">
                <i class="fa fa-lg fa-check-circle"></i> <span class="hidden-mobile">Ver todos</span>
              </button> -->
            </h2>
          </header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="widget-body-toolbar">

                <div class="row">
                  <div class="col-xs-3 col-sm-7 col-md-12 col-lg-12 text-right">

                    <div class="input-group">
                    <span class="input-group-addon">
                        <!-- <span v-if="searchTermIsDirty">
                          <i class="fa fa-spinner fa-pulse"></i>
                        </span> -->
                        <i :class="'fa ' + (searchTermIsDirtyOthersEntities ? 'fa-spinner fa-pulse': 'fa-search')"></i>
                      </span>
                      <input class="form-control" v-model="searchTermOthersEntities" id="search-field" placeholder="" type="text">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive custom-scroll" style="max-height:150px; overflow-y: auto;">
                <table class="table table-condensed table-bordered">
                  <thead>
                    <tr>
                      <th><i class="fa fa-car"></i> Veículo</th>
                      <th><i class="fa fa-car"></i> Ano Fab/Ano Modelo</th>
                      <th><i class="fa fa-building"></i> Unidade</th>
                      <th><i class="fa fa-ticket"></i> Placa</th>
                      <th><i class="fa fa-id-card"></i> Renavam</th>
                      <th><i class="fa fa-dollar"></i> Preço</th>
                      <th v-if="profile.map['vehicle-entries'].includes('show-details-entries-other-entities')"><i class="fa fa-share"></i> Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="entriesOthersEntities.length">
                      <tr v-for="entry in entriesOthersEntities">
                        <td width="25%">{{ entry.fipe_vehicle }}</td>
                        <td width="20%">{{ entry.fabrication_year }}</td>
                        <td width="15%">{{ entry.tenant.tenant_fancy_name }}</td>
                        <td width="10%">{{ entry.plate }}</td>
                        <td width="15%">{{ entry.renavam }}</td>
                        <td width="15%">{{ entry.sale_price_formatted }}</td>
                        <td v-if="profile.map['vehicle-entries'].includes('show-details-entries-other-entities')" width="1%">

                          <button @click="$router.push({ name: 'VehicleEntryEdit', params: { id: entry.id } })" class="btn btn-sm btn-default">
                            Detalhes
                          </button>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="5">
                          <div class="text-center">
                            <i class="text-info fa fa-2x fa-inbox"></i>
                            <h5>Não há veículos cadastrados nas demais unidades.</h5>
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
    </div>
  </template>

  <script>
    import { map, debounce } from 'lodash'
    import { mapState } from 'vuex'
    import SortingService from '@/services/sorting/sortingService'
    import Api from '@/components/Resources/VehicleEntry/Api'
    export default {
      name: 'hello',
      computed: {
        ...mapState({
          user: state => state.user,
          authenticated: state => state.user.authenticated,
          token: state => state.user.token,
          profile: state => state.user.profile
        })
      },
      watch: {
        searchTerm: function (term) {
          this.searchTermIsDirty = true
          this.search(term)
        },
        searchTermOthersEntities: function (term) {
          this.searchTermIsDirtyOthersEntities = true
          this.searchOthers(term)
        }
      },
      methods: {
        search: debounce(function (term) {
          let callback = ({ data }) => {
            this.searchTermIsDirty = false
            this.entityEntries = data.data.data
          }

          this.$root.axios.get(`entries-by-tenant/${localStorage.getItem('current-tenant-idkey')}`, {
            params: {
              q: term,
              sf: 'fipe_brand:ilike;fipe_model:ilike;color:ilike;plate:ilike;fabrication_year:ilike',
              'only-available': true
            }
          }).then(callback)
        }, 500),
        searchOthers: debounce(function (term) {
          // let callback = ({ data }) => {
          //   this.searchTermIsDirtyOthersEntities = false
          //   this.entriesOthersEntities = data
          // }

          this.$root.axios.get('/tenants', {
            params: {
              q: `id:${localStorage.getItem('current-tenant-idkey')}`,
              sf: 'id:!='
            }
          }).then(({data}) => {
            this.othersTenants = map(data.data.data, e => e.id)
            this.$root.axios.get('/entries-by-tenant/' + this.othersTenants.join(','), {
              params: {
                q: term,
                'only-available': true,
                sf: 'fipe_vehicle:ilike;plate:ilike;renavam:ilike'
              }
            }).then(({data}) => {
              this.entriesOthersEntities = data.data.data
              this.searchTermIsDirtyOthersEntities = false
            })
          })
          // this.api.useSortService(this.sortingService).performSearch({
          //   q: term,
          //   sf: 'fipe_brand:ilike;fipe_model:ilike;color:ilike;plate:ilike;fabrication_year:ilike'
          // }, callback)
        }, 500)
      },
      data () {
        return {
          entityEntries: [],
          negotiations: [],
          entityPendencies: [],
          entriesOthersEntities: [],
          othersTenants: [],
          currentTenant: null,
          searchTerm: '',
          searchTermIsDirty: false,
          searchTermOthersEntities: '',
          searchTermIsDirtyOthersEntities: false
        }
      },

      mounted () {
        this.api = new Api(this, 'vehicle-entry')
        this.sortingService = new SortingService(this, this.orderBy, this.sortBy, () => {
          this.search(this.searchTerm)
        })
        this.$root.axios.get('/vehicle-entry', {
          params: {
            'q': `tenant_id:${localStorage.getItem('current-tenant-idkey')}`,
            'sf': 'tenant_id:=',
            'only-available': true
          }
        }).then(({data}) => {
          this.entityEntries = data.data.data
        })

        this.$root.axios.get('/tenants', {
          params: {
            q: `id:${localStorage.getItem('current-tenant-idkey')}`,
            sf: 'id:!='
          }
        }).then(({data}) => {
          this.othersTenants = map(data.data.data, e => e.id)
          this.$root.axios.get('/entries-by-tenant/' + this.othersTenants.join(','), {
            params: {
              'only-available': true
            }
          }).then(({data}) => {
            this.entriesOthersEntities = data.data.data
          })
        })
      // })
      }
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    h1, h2 {
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
  </style>
