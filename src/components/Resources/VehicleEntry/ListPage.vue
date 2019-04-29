<template>
  <div>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i :class="'fa fa-fw fa-car'"></i>  Entrada de Veículos
      </h1>
      <div class="jarviswidget jarviswidget-color-darken" role="widget">
        <header role="heading">
          <h2>
            <strong>
              <i :class="'fa fa-car'"></i>
              Lista de entradas de veículos cadastradas
              <span v-if="searchTerm.length"> - Filtro por: {{ searchTerm }}</span>
            </strong>
          </h2>
        </header>
        <div v-if="profile.map['vehicle-entries'].includes('index')" role="content">
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

                  <button v-if="profile.map['vehicle-entries'].includes('create')" @click.prevent="$router.push(`/vehicle-entry/create`)" class="btn btn-success">
                    <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar nova Entrada de veículo</span>
                  </button>

                </div>

              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-condensed table-hover has-tickbox">
                <thead>
                  <tr>
                    <th></th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Ano Fab/Ano Modelo</th>
                    <th>Cor</th>
                    <th>Placa</th>
                    <th>Situação</th>
                    <th>Preço de Venda</th>
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
                    <td>{{ model['brand'] }}</td>
                    <td>{{ model['model'] }}</td>
                    <td>{{ model['fabrication_year'] }}</td>
                    <td>{{ model['color'] }}</td>
                    <td>{{ model['plate'] }}</td>
                    <td>
                      <span v-if="model['state_id'] == 1" class="label label-success">
                        {{ model['state_label'] }}
                      </span>
                      <span v-else-if="model['state_id'] == 2" class="label label-danger">
                        {{ model['state_label'] }}
                      </span>
                    </td>
                    <td>{{ model['sale_price_formatted'] }}</td>
                    <td>
                      <div class="pull-right">
                            <router-link title="Devolver Veículo Consignado" v-if="model.consigned == 1" :to="{path: `/vehicle-entry/${model.id}/return`}" class="btn btn-sm btn-default">
                              <i class="fa fa-lg fa-reply"></i>
                            </router-link>
                            <div class="btn-group">
                              <button title="Emitir Documentos" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-lg fa-file-o"></i> <span class="caret"></span>
                              </button>
                              <ul class="dropdown-menu">
                                <li v-for="template in templates">
                                  <a href="#" :title="template.name" @click.prevent="showTemplate(template.id, model['id_key'])"><i class="fa fa-file-o"></i> {{template.name }}</a>
                                </li>
                              </ul>
                            </div>
                            <router-link title="Iniciar uma Nova Venda" v-if="model.state_id == 1 && profile.map['vehicle-sale'].includes('create')" :to="{path: `vehicle-sale/create/${model.id}`}" class="btn btn-sm btn-primary">
                              <i class="fa fa-lg fa-dollar"></i>
                            </router-link>
                            <router-link title="Editar Dados do Veículo" v-if="profile.map['vehicle-entries'].includes('edit')" :to="{path: `vehicle-entry/${model.id}/edit`}" class="btn btn-sm btn-default">
                              <i class="fa fa-lg fa-pencil"></i>
                            </router-link>
                            <a title="Excluir Entrada" v-if="profile.map['vehicle-entries'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
                              <i class="fa fa-lg fa-trash"></i>
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
  import jquery from 'jquery'
  import SortingService from '@/services/sorting/sortingService'
  import Api from './Api'
  import { mapState } from 'vuex'
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
    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        token: state => state.user.token,
        profile: state => state.user.profile
      })
    },
    data () {
      return {
        models: [],
        templates: [],
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
    watch: {
      searchTerm: function (term) {
        this.searchTermIsDirty = true
        this.search(term)
      }
    },
    methods: {
      showTemplate (id, entryId) {
        this.$root.axios.get(`entries/document/${id}/${localStorage.getItem('current-tenant-idkey')}/${entryId}`).then(({data}) => {
          var a = document.createElement('a')
          a.download = `${data.data.name}.docx`
          a.href = data.data.raw
          a.click()
          if (a.remove) a.remove()
        })
      },
      destroy (id) {
        if (confirm('Deseja realmente excluir esta entrada?')) {
          this.api.delete(id)
          this.search(this.searchTerm)
        }
      },
      search: debounce(function (term) {
        let callback = ({ data }) => {
          this.searchTermIsDirty = false
          this.models = data
        }

        this.api.useSortService(this.sortingService).performSearch({
          q: `fipe_brand:${term};fipe_model:${term};color:${term};fabrication_year:${term};plate:${term};tenant_id:${localStorage.getItem('current-tenant-idkey')}`,
          'only-available': true,
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
      this.$root.axios.get('templates', {
        params: {
          'q': 'description:ENTRADA',
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
