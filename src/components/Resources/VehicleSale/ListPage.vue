<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-sign-out fa-fw"></i> 
        {{ $route.query.t }}
      </h1>
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i class="fa fa-sign-out"></i>
              Lista desta unidade <span v-if="searchTerm.length"> - Filtro por: {{ searchTerm }}</span>
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['vehicle-sale'].includes('index')" role="content">
          <div class="widget-body no-padding">
            <div class="widget-body-toolbar">

              <div class="row">

                <div class="col-xs-9 col-sm-5 col-md-5 col-lg-5">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <span v-if="searchTermIsDirty">
                        <i class="fa fa-spinner fa-pulse"></i>
                      </span>
                      <i v-else class="fa fa-search"></i>
                    </span>
                    <input v-model.trim="searchTerm" class="form-control" id="search-field" placeholder="Nome, Cpf ou Veículo" type="text">
                  </div>
                </div>
                <div class="col-xs-3 col-sm-7 col-md-7 col-lg-4 text-right">

                  <!-- <select
                      v-model.trim="verifiedFilter"
                      @change="search(searchTerm)"
                      class="form-control"
                    >
                      <option :value="''" selected="selected"><= Filtro por homologação =></option>
                      <option value="unverified">Somente vendas não Homologadas</option>
                      <option value="verified">Somente vendas Homologadas</option>
                    </select> -->

                </div>
                <div class="col-xs-3 col-sm-7 col-md-7 col-lg-3 text-right">

                  <button v-if="profile.map['vehicle-sale'].includes('create')" @click.prevent="$router.push('/vehicle-sale/create')" class="btn btn-success">
                    <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar nova saída</span>
                  </button>

                </div>

              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-condensed table-hover has-tickbox">
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      Cliente
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('tenant_fancy_name','desc')"
                          @click="sortingService.setup('tenant_fancy_name', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('tenant_fancy_name', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Veículo
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('tenant_name','desc')"
                          @click="sortingService.setup('tenant_name', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('tenant_name', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Valor da Venda (Com desconto)
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('cnpj','desc')"
                          @click="sortingService.setup('cnpj', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('cnpj', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Placa
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('cnpj','desc')"
                          @click="sortingService.setup('cnpj', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('cnpj', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Data
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('phone_number','desc')"
                          @click="sortingService.setup('phone_number', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('phone_number', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th width="40%">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="model in models">
                    <td class="smart-form">
                      <label class="checkbox">
                        <input type="checkbox" name="checkbox-inline">
                        <i></i>
                      </label>
                    </td>
                    <td>{{ model.customer.name }} ({{ model.customer.cpf }})</td>
                    <td>{{ model.entry.fipe_vehicle }}</td>
                    <td>{{ model.price }}</td>
                    <td>{{ model.entry.plate }}</td>
                    <td>{{ moment(model.created_at).format('DD/MM/YYYY') }}</td>
                    <td>
                      <div class="pull-right">
                      <button @click="homologarVenda(model)" title="Homologar Venda" v-if="!model.verified && profile.map['vehicle-sale'].includes('verify-sales')"  class="btn btn-sm btn-default">
                        <i class="fa fa-lg fa-star text-warning"></i>
                      </button>
                      <div class="btn-group">
                              <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-file-o"></i> Emitir Documentos <span class="caret"></span>
                              </button>
                              <ul class="dropdown-menu">
                                <li v-for="template in templates">
                                  <a href="#" @click="showTemplate(template.id, model['id'])" @click.prevent><i class="fa fa-file-o"></i> {{template.name }}</a>
                                </li>
                              </ul>
                            </div>
                    <router-link v-if="profile.map['vehicle-entries'].includes('edit')" :to="{path: `vehicle-entry/${model.entry.id}/edit`}" class="btn btn-sm btn-default">
                      <i class="fa fa-exchange"></i> Detalhes
                    </router-link>
                    <a v-if="profile.map['vehicle-sale'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
                      <i class="fa fa-trash"></i> Estornar Venda
                    </a>
                  </div>
                </td>
              </tr>
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
  import UrlMatcherService from '@/services/url/URLMatcherService'
  import { debounce } from 'lodash'
  import SortingService from '@/services/sorting/sortingService'
  import Api from '@/components/Resources/VehicleSale/Api'
  import jquery from 'jquery'
  import { mapState } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'List',
    data () {
      return {
        models: [],
        searchTerm: '',
        searchTermIsDirty: false,
        sortBy: 'desc',
        orderBy: 'created_at',
        templates: [],
        verified: ''
      }
    },
    computed: {
      moment () {
        return moment
      },
      ...mapState({
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
      $route: function () {
        console.log(this)
        this.mountMethod()
      }
    },
    methods: {
      homologarVenda (model) {
        this.$root.axios.post(`/vehicle-sale/${model.id_key}/verify`).then(() => {
          alert('Venda Homologada com Sucesso!')
          model.verified = true
        })
      },
      destroy (id) {
        if (confirm('Deseja realmente Estornar esta venda?')) {
          this.api.delete(id)
          this.search(this.searchTerm)
        }
      },
      showTemplate (id, saleId) {
        this.$root.axios.get(`/vehicle-sale/contract/${id}/${saleId}`).then(({data}) => {
          var a = document.createElement('a')
          a.download = `${data.data.name}.docx`
          a.href = data.data.raw
          a.click()
          if (a.remove) a.remove()
        })
      },
      search: debounce(function (term) {
        let callback = ({ data }) => {
          this.searchTermIsDirty = false
          this.models = data
        }

        this.api.useSortService(this.sortingService).performSearch({
          q: term,
          tenant_id: localStorage.getItem('current-tenant-idkey'),
          sf: 'customer.name:ilike;customer.cpf:ilike;entry.fipe_vehicle:ilike;entry.plate:ilike',
          verified: this.verified
        }, callback)
      }, 500),
      mountMethod () {
        this.verified = this.$route.query.verified
        this.$root.axios.get('templates', {
          params: {
            'q': 'description:SAIDA',
            'sf': 'description',
            'f': 'id;name;description;created_at;updated_at'
          }
        }).then(({data}) => {
          this.templates = data.data.data
        })

        this.$root.bus.$on('breadcrumb-search', () => {
          jquery('#search-field').first().focus()
        })

        this.$root.bus.$on('breadcrumb-add', () => {
          this.$router.push('/vehicle-sale/create')
        })

        this.$root.bus.$emit('push-breadcrumb', {
          stack: [
            {label: 'Saídas', url: '/vehicle-sale', icon: 'sign-out'}
          ]
        })

        this.matcher = new UrlMatcherService()

        this.api = new Api(this)

        this.models = this.api.paginated(({ data }) => {
          this.models = data
        }, this.verified)
      }
    },
    created () {
      this.sortingService = new SortingService(this, this.orderBy, this.sortBy, () => {
        this.search(this.searchTerm)
      })
    },
    mounted () {
      this.mountMethod()
    }
  }
</script>
