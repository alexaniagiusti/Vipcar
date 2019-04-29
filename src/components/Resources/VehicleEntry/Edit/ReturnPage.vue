<template>
  <div @keyup.alt.shift.83="create">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-reply fa-fw"></i>  Devolução de veículo consignado
        <div class="pull-right">
          <router-link :to="{path: '/vehicle-entry'}" class="btn btn-default">
            <i class="fa fa-arrow-left fa-lg fa-fw"></i> Voltar
          </router-link>
          <a v-if="filhocarregado" :disabled="!$refs.tenantForm.distributed_ok" @click.prevent="create" href="#" class="btn btn-success">
            <i class="fa fa-check-circle fa-lg fa-fw"></i> Salvar ( ALT + SHIFT +  S )
          </a>
        </div>
      </h1>
      <div class="jarviswidget">
        <header role="heading">
          <span class="widget-icon">
            <i class="fa fa-reply"></i>
          </span>
          <h2>
            Devolução
          </h2>
          <span v-if="readonly" class="badge m-t-5 m-r-5 bg-color-orange pull-right">
            <i class="fa fa-ban"></i> Somente leitura
          </span>
          <span v-else class="badge m-t-5 m-r-5 bg-color-greenLight pull-right">
            <i class="fa fa-edit"></i> Edição
          </span>
        </header>

        <div role="content">
          <div class="widget-body no-padding">
            <tenant-form v-on:carregado="carregado" ref="tenantForm" :readonly="readonly"></tenant-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import TenantForm from '@/components/Resources/VehicleEntry/Edit/ReturnForm'
  import jquery from 'jquery'

  export default {
    name: 'Show',
    props: {
      formReadonly: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        readonly: null,
        filhocarregado: false
      }
    },
    created () {
      this.readonly = this.formReadonly

      this.$root.bus.$on('breadcrumb-search', () => {
        new Promise((resolve, reject) => {
          this.$router.push('/vehicle-sale')
          resolve()
        }).then(() => {
          jquery('#search-field').first().focus()
        })
      })

      this.$root.bus.$on('breadcrumb-add', () => {
        this.$router.push('/vehicle-sale/create')
      })
    },
    methods: {
      carregado () {
        this.filhocarregado = true
      },
      create () {
        this.$refs.tenantForm.create()
      },
      disableEdit () {
        this.readonly = true
        this.$refs.tenantForm.disableEdit()
      },
      destroy () {
        this.$refs.tenantForm.destroy()
      }
    },
    components: {
      TenantForm
    }
  }
</script>
