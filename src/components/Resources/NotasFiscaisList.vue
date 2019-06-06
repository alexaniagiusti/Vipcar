<template>
<div>
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h1 class="page-title txt-color-blueDark">
          <i class="fa fa-fw fa-archive"></i> 
          Notas Fiscais
        </h1>
        <div class="jarviswidget jarviswidget-color-darken" role="widget">
          <header role="heading">
            <h2>
              <strong>
                <i class="fa fa-archive"></i>
                Lista de Notas Fiscais
              </strong>
            </h2>
          </header>
          <div role="content">
            <div class="widget-body no-padding">
              <!-- <div class="widget-body-toolbar">

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

                    <button v-if="profile.map['account-mov'].includes('create')" @click.prevent="$router.push(`/${basePath}/create`)" class="btn btn-success">
                      <i class="fa fa-lg fa-plus-circle"></i> <span class="hidden-mobile">Criar nova {{ singularResource }}</span>
                    </button>

                  </div>

                </div>
              </div> -->
              <div class="table-responsive">
                <table class="table table-bordered table-striped table-condensed table-hover has-tickbox">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nº Nota</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th width="30%">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td colspan="5" class="text-center">
                        <div class="fa-3x">
                          <i class="fa fa-refresh fa-spin"></i>
                        </div>
                        Aguarde, carregando notas fiscais.
                      </td>
                    </tr>
                    <tr v-else v-for="model in models">
                      <td> {{ model.id }} </td>
                      <td width="10%"> {{ model.number }} </td>
                      <td width="1%"> {{ '-' }} </td>
                      <td> {{ model.status }} </td>
                      <td>
                        <a v-if="model.status !== 'MergeAuthorizationProtocolCompleted'" href="#" @click.prevent="cancelar(model.id)" class="btn btn-default">Cancelar</a>
                        <span v-if="model.status === 'MergeAuthorizationProtocolCompleted'">
                          <a href="#" @click.prevent="download(model.id, 'pdf')" class="btn btn-success">PDF</a>
                          <a href="#" @click.prevent="download(model.id, 'xml')" class="btn btn-primary">XML</a>
                        </span>
                      </td>
                      <!-- <td>
                        <div class="pull-right">
                          <a class="btn btn-sm btn-default" @click="openModal(model.id)">
                            <i class="fa fa-money"></i> Extrato da conta
                          </a>
                          <router-link v-if="profile.map['account-mov'].includes('show')" :to="{
                          path: `${basePath}/${model.id}/show`
                        }" class="btn btn-sm btn-default">
                        <i class="fa fa-external-link"></i>
                      </router-link>
                      <router-link v-if="profile.map['account-mov'].includes('edit')" :to="{path: `${basePath}/${model.id}/edit`}" class="btn btn-sm btn-default">
                        <i class="fa fa-pencil"></i>
                      </router-link>
                      <a v-if="profile.map['account-mov'].includes('delete')" @click.prevent="destroy(model.id)" class="btn btn-sm btn-danger">
                        <i class="fa fa-trash"></i>
                      </a>
                    </div>
                  </td> -->
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      models: [],
      loading: false
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
    cancelar (id) {
      this.$root.axios.post('nfe-status', {
        id, status: 'cancelar'
      })
    },
    download (id, mode) {
      this.$root.axios.post('nfe-download', {id, mode}).then(({data}) => {
        window.open(data['uri'])
      })
    }
  },
  mounted () {
    this.loading = true
    this.$root.axios.get('nfe-list').then(({data}) => {
      this.loading = false
      this.models = data
    })
  }
}
</script>

</template>
