<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-building fa-fw"></i> 
        Lojas
      </h1>
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i class="fa fa-building"></i>
              Lista de lojas cadastradas <span v-if="searchTerm.length"> - Filtro por: {{ searchTerm }}</span>
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['tenants'].includes('index')" role="content">
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
                    <input v-model.trim="searchTerm" class="form-control" id="search-field" placeholder="Filtros" type="text">
                  </div>
                </div>
                <div class="col-xs-3 col-sm-7 col-md-7 col-lg-7 text-right">

                  <button v-if="profile.map['tenants'].includes('create')" @click.prevent="$router.push('/tenants/create')" class="btn btn-success">
                    <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar nova Loja</span>
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
                      Nome Fantasia
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
                      Razão Social
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
                      CNPJ
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
                      Contato
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
                    <th width="30%">Ações</th>
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
                    <td>{{ model.tenant_fancy_name }}</td>
                    <td>{{ model.tenant_name }}</td>
                    <td>{{ model.cnpj }}</td>
                    <td>{{ model.phone_number }}</td>
                    <td>
                      <div class="pull-right">
                        <router-link v-if="profile.map['tenants'].includes('show')" :to="{
                        path: matcher.self(model, 'show') + '/show'
                      }" class="btn btn-sm btn-default">
                      <i class="fa fa-external-link"></i> Ver detalhes
                    </router-link>
                    <router-link v-if="profile.map['tenants'].includes('edit')" :to="{path: matcher.self(model, 'update') + '/edit'}" class="btn btn-sm btn-default">
                      <i class="fa fa-pencil"></i> Editar
                    </router-link>
                    <a v-if="profile.map['tenants'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
                      <i class="fa fa-trash"></i> Deletar
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
  import Api from '@/components/Resources/Tenants/Api'
  import jquery from 'jquery'
  import { mapState } from 'vuex'
  export default {
    name: 'List',
    data () {
      return {
        models: [],
        searchTerm: '',
        searchTermIsDirty: false,
        sortBy: 'asc',
        orderBy: 'tenant_name'
      }
    },
    computed: {
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
      }
    },
    methods: {
      destroy (id) {
        this.api.delete(id)
        this.search(this.searchTerm)
      },
      search: debounce(function (term) {
        let callback = ({ data }) => {
          this.searchTermIsDirty = false
          this.models = data
        }

        this.api.useSortService(this.sortingService).performSearch({
          q: term,
          sf: 'tenant_name:ilike;tenant_fancy_name:ilike;phone_number:ilike;cnpj:ilike'
        }, callback)
      }, 500)
    },
    created () {
      this.sortingService = new SortingService(this, this.orderBy, this.sortBy, () => {
        this.search(this.searchTerm)
      })
    },
    mounted () {
      this.$root.bus.$on('breadcrumb-search', () => {
        jquery('#search-field').first().focus()
      })

      this.$root.bus.$on('breadcrumb-add', () => {
        this.$router.push('/tenants/create')
      })

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: 'Lojas', url: '/tenants', icon: 'building'}
        ]
      })

      this.matcher = new UrlMatcherService()

      this.api = new Api(this)

      this.models = this.api.paginated(({ data }) => {
        this.models = data
      })
    }
  }
</script>
