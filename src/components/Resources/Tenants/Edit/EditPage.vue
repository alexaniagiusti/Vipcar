<template>
  <div @keyup.alt.shift.83="update" @keyup.alt.shift.67="disableEdit" @keyup.alt.shift.88="$refs.tenantForm.destroy">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-building fa-fw"></i>  Lojas
        <div class="pull-right">
          <a @click.prevent="$router.push('/tenants')" class="btn btn-default">
            <i class="fa fa-arrow-left fa-lg fa-fw"></i> Voltar
          </a>
          <a @click.prevent="$router.push('/tenants/create')" class="btn btn-default">
            <i class="fa fa-plus-circle fa-lg fa-fw"></i> Cadastrar novo
          </a>
          <a @click.prevent="allowEdit" v-if="readonly" href="#" class="btn btn-default">
            <i class="fa fa-edit fa-lg fa-fw"></i> Editar este registro
          </a>
          <span v-else>
            <a @click.prevent="update" href="#" class="btn btn-success">
              <i class="fa fa-check-circle fa-lg fa-fw"></i> Salvar dados ( ALT + SHIFT +  S )
            </a>
            <a @click.prevent="disableEdit" href="#" class="btn btn-warning">
              <i class="fa fa-undo fa-fw"></i> Cancelar Alteração ( ALT + SHIFT +  C )
            </a>
            <a @click="destroy" class="btn btn-danger">
              <i class="fa fa-trash fa-fw"></i> Excluir registro ( ALT + SHIFT +  X )
            </a>
          </span>
        </div>
      </h1>
      <div class="jarviswidget jarviswidget-color-darken">
        <header role="heading">
          <span class="widget-icon">
            <i class="fa fa-th"></i>
          </span>
          <h2>
            Detalhes da Loja
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
            <tenant-form v-on:form-saved="saved" ref="tenantForm" :form-readonly="readonly"></tenant-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import TenantForm from '@/components/Resources/Tenants/Edit/EditForm'
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
        readonly: null
      }
    },
    created () {
      this.readonly = this.formReadonly

      this.$root.bus.$on('breadcrumb-search', () => {
        new Promise((resolve, reject) => {
          this.$router.push('/tenants')
          resolve()
        }).then(() => {
          jquery('#search-field').first().focus()
        })
      })

      this.$root.bus.$on('breadcrumb-add', () => {
        this.$router.push('/tenants/create')
      })

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: 'Lojas', url: '/tenants', icon: 'building'},
          {label: 'Editar', url: `/tenants/${this.$route.params.id}/edit`, icon: 'edit'}
        ]
      })
    },
    methods: {
      allowEdit () {
        this.readonly = false
        this.$refs.tenantForm.allowEdit()
        this.$refs.tenantForm.clearState()
      },
      saved () {
        this.disableEdit()
      },
      update () {
        this.$refs.tenantForm.update()
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
