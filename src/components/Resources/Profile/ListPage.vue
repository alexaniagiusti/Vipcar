<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i :class="'fa fa-fw fa-' + icon"></i> 
        {{ resourceLabel }}
      </h1>
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i :class="'fa fa-' + icon"></i>
              Lista de {{ resourceLabel.toLowerCase() }} cadastradas <span v-if="searchTerm.length"> - Filtro por: {{ searchTerm }}</span>
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['profiles'].includes('index')" role="content">
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

                  <button v-if="profile.map['profiles'].includes('create')" @click.prevent="$router.push(`/${basePath}/create`)" class="btn btn-success">
                    <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar nova {{ singularResource }}</span>
                  </button>

                </div>

              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-condensed table-hover has-tickbox">
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="field in fieldsTable">
                      {{ field.label }}
                      <span v-if="field.component !== 'entity-field'" class="pull-right">
                        <a
                          v-if="sortingService.matchPair(field.name, 'desc')"
                          @click="sortingService.setup(field.name, 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup(field.name, 'desc')"
                          class="btn btn-xs btn-default">
                            <i class="fa fa-sort-alpha-asc"></i>
                        </a>
                        <a class="btn btn-xs btn-default">
                          <i class="fa fa-filter"></i>
                        </a>
                      </span>
                      <span v-if="field.component === 'entity-field'" class="pull-right">
                        <a
                          v-if="sortingService.matchPair(field.orderBy, 'desc')"
                          @click="sortingService.setup(field.orderBy, 'asc')"
                          class="btn btn-xs bg-color-blueLight btn-default">
                          <i class="fa fa-sort-alpha-desc"></i>
                        </a>
                        <a
                          v-else
                          @click="sortingService.setup(field.orderBy, 'desc')"
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
                    <td v-for="field in fieldsTable">
                      <template v-if="field.component !== 'entity-field'">
                      {{ model[field.name] }}
                      </template>
                      <template v-else-if="field.component === 'entity-field'">
                        <template v-if="model[field['resourceKey']] !== null">
                          {{ model[field['resourceKey']][field['usingAsLabel']] }}
                        </template>
                      </template>
                    </td>
                    <td>
                      <div class="pull-right">
                        <!-- <router-link :to="{
                        path: `${basePath}/${model.id}/show`
                      }" class="btn btn-sm btn-default">
                      <i class="fa fa-external-link"></i> Ver detalhes
                    </router-link> -->
                    <router-link v-if="profile.map['profiles'].includes('edit')" :to="{path: `${basePath}/${model.id}/edit`}" class="btn btn-sm btn-default">
                      <i class="fa fa-pencil"></i> Editar
                    </router-link>
                    <a v-if="profile.map['profiles'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
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
  import { mapState } from 'vuex'
  import jquery from 'jquery'
  import SortingService from '@/services/sorting/sortingService'
  import Api from './Api'
  import {
    __defaultBasePath,
    __defaultOrderBy,
    __defaultSortBy,
    __defaultIcon,
    __defaultResourceLabel,
    __defaultSingularResource,
    __listSearchFields,
    __defaultFieldList
  } from './metadata'

  export default {
    data () {
      return {
        models: [],
        basePath: __defaultBasePath,
        icon: __defaultIcon,
        resourceLabel: __defaultResourceLabel,
        fieldsTable: [],
        searchTerm: '',
        searchTermIsDirty: false,
        sortBy: __defaultSortBy,
        orderBy: __defaultOrderBy,
        singularResource: __defaultSingularResource
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
          sf: __listSearchFields
        }, callback)
      }, 500)
    },
    created () {
      this.fieldsTable = __defaultFieldList
      this.sortingService = new SortingService(this, this.orderBy, this.sortBy, () => {
        this.search(this.searchTerm)
      })
    },
    mounted () {
      this.$root.bus.$on('breadcrumb-search', () => {
        jquery('#search-field').first().focus()
      })

      this.$root.bus.$on('breadcrumb-add', () => {
        this.$router.push(`/${this.basePath}/create`)
      })

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: this.resourceLabel, url: `/${this.basePath}`, icon: __defaultIcon}
        ]
      })

      this.api = new Api(this, this.basePath)

      this.models = this.api.paginated(({ data }) => {
        this.models = data
      })
    }
  }
</script>
