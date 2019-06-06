<template>
  <div @keyup.alt.shift.83="create">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="page-title txt-color-blueDark">
        <i class="fa fa-building fa-fw"></i>  {{ defaultResourceLabel }}
        <div class="pull-right">
          <router-link :to="{path: `/${basePath}`}" class="btn btn-default">
            <i class="fa fa-arrow-left fa-lg fa-fw"></i> Voltar
          </router-link>
          <a @click.prevent="create" href="#" class="btn btn-success">
            <i class="fa fa-check-circle fa-lg fa-fw"></i> Salvar ( ALT + SHIFT +  S )
          </a>
        </div>
      </h1>
      <div class="jarviswidget">
        <header role="heading">
          <span class="widget-icon">
            <i class="fa fa-th"></i>
          </span>
          <h2>
            Detalhes da {{ defaultSingularResource }}
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
            <custom-form ref="customForm" :readonly="readonly"></custom-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import CustomForm from './../Create/CreateForm'
  import jquery from 'jquery'
  import {
    __fields,
    __defaultBasePath,
    __defaultIcon,
    __defaultResourceLabel,
    __defaultSingularResource
  } from './../metadata'

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
    computed: {
      defaultSingularResource () {
        return __defaultSingularResource
      },
      defaultIcon () {
        return __defaultIcon
      },
      defaultResourceLabel () {
        return __defaultResourceLabel
      },
      basePath () {
        return __defaultBasePath
      },
      __fields () {
        return __fields
      }
    },
    created () {
      this.readonly = this.formReadonly

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

      this.$root.bus.$emit('push-breadcrumb', {
        stack: [
          {label: `${this.defaultResourceLabel}`, url: `/${this.basePath}`, icon: `${__defaultIcon}`},
          {label: 'Criar', url: `/${this.basePath}/create`, icon: 'check'}
        ]
      })
    },
    methods: {
      create () {
        this.$refs.customForm.create()
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
