<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-list fa-fw"></i> 
        Planos de Conta
      </h1>
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i class="fa fa-list"></i>
              Lista de Planos de conta cadastrados
              <span v-if="searchTerm.length"> - Filtro por: {{ searchTerm }}</span>
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['account-plans'].includes('index')" role="content">
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

                  <button v-if="profile.map['account-plans'].includes('create')" @click.prevent="$router.push('/account-plans/create')" class="btn btn-success">
                    <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar novo Plano de conta</span>
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
                      Nome
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('name','desc')"
                          @click="sortingService.setup('name', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('name', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Sigla
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('sigla','desc')"
                          @click="sortingService.setup('sigla', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('sigla', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Tipo
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('type','desc')"
                          @click="sortingService.setup('type', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('type', 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                    </th>
                    <th>
                      Ativo
                      <span class="pull-right">
                        <a
                          v-if="sortingService.matchPair('active','desc')"
                          @click="sortingService.setup('active', 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup('active', 'desc')"
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
                    <td>{{ model.name }}</td>
                    <td>{{ model.abbreviation }}</td>
                    <td>{{ model.type }}</td>
                    <td class="text-center">
                      <span class="label" :class="model.isActive ? 'label-success': 'label-danger'">
                        {{ model.active }}
                      </span>
                    </td>
                    <td>
                      <div class="pull-right">
                        <router-link v-if="profile.map['account-plans'].includes('show')" :to="{
                        path: `${basePath}/${model.id}/show`}" class="btn btn-sm btn-default">
                      <i class="fa fa-external-link"></i> Ver detalhes
                    </router-link>
                    <router-link v-if="profile.map['account-plans'].includes('edit')" :to="{path: `${basePath}/${model.id}/edit`}" class="btn btn-sm btn-default">
                      <i class="fa fa-pencil"></i> Editar
                    </router-link>
                    <a v-if="profile.map['account-plans'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
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
  import { debounce } from 'lodash'
  import SortingService from '@/services/sorting/sortingService'
  import Api from '@/components/Resources/AccountPlan/Api'
  import jquery from 'jquery'
  import { mapState } from 'vuex'

  export default {
    name: 'List',
    data () {
      return {
        basePath: 'account-plans',
        models: [],
        searchTerm: '',
        searchTermIsDirty: false,
        sortBy: 'asc',
        orderBy: 'name'
      }
    },
    watch: {
      searchTerm: function (term) {
        this.searchTermIsDirty = true
        this.search(term)
      }
    },
    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token,
        profile: state => state.user.profile
      })
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
          sf: 'name:ilike;abbreviation:ilike;type:ilike'
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
        this.$router.push('/account-plans/create')
      })

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: 'Planos de conta', url: '/account-plans', icon: 'list'}
        ]
      })

      this.api = new Api(this)

      this.models = this.api.paginated(({ data }) => {
        this.models = data
      })
    }
  }
</script>
