<template>
  <div @keyup.alt.shift.83="update" @keyup.alt.shift.67="disableEdit" @keyup.alt.shift.88="$refs.customForm.destroy">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i :class="'fa fa-fw fa-' + this.icon"></i> {{ resourceLabel }}
        <div class="pull-right">
          <a @click.prevent="$router.push(`/${basePath}`)" class="btn btn-default">
            <i class="fa fa-arrow-left fa-lg fa-fw"></i> Voltar
          </a>
          <a @click.prevent="$router.push(`/${basePath}/create`)" class="btn btn-default">
            <i class="fa fa-plus-circle fa-lg fa-fw"></i> Cadastrar novo
          </a>
          <a @click.prevent="allowEdit" v-if="readonly" href="#" class="btn btn-default">
            <i class="fa fa-edit fa-lg fa-fw"></i> Editar este registro
          </a>
          <span v-else>
            <a @click.prevent="update" href="#" class="btn btn-success">
              <i class="fa fa-check-circle fa-lg fa-fw"></i> Salvar dados 
              <!-- ( ALT + SHIFT +  S ) -->
            </a>
            <a @click.prevent="disableEdit" href="#" class="btn btn-warning">
              <i class="fa fa-undo fa-fw"></i> Cancelar Alteração
              <!-- ( ALT + SHIFT +  C ) -->
            </a>
            <a @click="destroy" class="btn btn-danger">
              <i class="fa fa-trash fa-fw"></i> Excluir registro
              <!-- ( ALT + SHIFT +  X ) -->
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
            Detalhes do {{ this.resourceLabel.toLowerCase() }}
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
            <custom-form v-on:form-saved="saved" ref="customForm" :form-readonly="true"></custom-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import CustomForm from './../Edit/EditForm'
  import jquery from 'jquery'
  import {
    __defaultBasePath,
    __defaultIcon,
    __defaultResourceLabel
  } from './../metadata'

  export default {
    name: 'ShowPage',
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
    computed: {
      icon () {
        return __defaultIcon
      },
      basePath () {
        return __defaultBasePath
      },
      resourceLabel () {
        return __defaultResourceLabel
      }
    },
    created () {
      this.readonly = true

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: this.resourceLabel, url: `/${this.basePath}`, icon: this.icon},
          {label: 'Detalhes', url: `/${this.basePath}/${this.$route.params.id}/show`, icon: 'th'}
        ]
      })

      this.$root.bus.$on('breadcrumb-search', () => {
        new Promise((resolve, reject) => {
          this.$router.push(`/${this.basePath}`)
          resolve()
        }).then(() => {
          jquery('#search-field').first().focus()
        })
      })

      this.$root.bus.$on('breadcrumb-add', () => {
        this.$router.push(`/${this.basePath}/create`)
      })
    },
    methods: {
      allowEdit () {
        this.readonly = false
        this.$refs.customForm.allowEdit()
        this.$refs.customForm.clearState()
      },
      saved () {
        this.disableEdit()
      },
      update () {
        this.$refs.customForm.update()
      },
      disableEdit () {
        this.readonly = true
        this.$refs.customForm.disableEdit()
      },
      destroy () {
        this.$refs.customForm.destroy()
      }
    },
    components: {
      CustomForm
    }
  }
</script>
