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
      <div class="jarviswidget jarviswidget-sortable" id="wid-id-11" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" data-widget-fullscreenbutton="false" data-widget-custombutton="false" role="widget">
        <header role="heading">
          <h2 class="pull-right" style="right: 20px"><strong>DADOS DO CLIENTE</strong></h2>  

          <ul id="widget-tab-1" class="nav nav-tabs">

            <li class="active">

              <a data-toggle="tab" id="tab-main-form-1" href="#hr1"> <i class="fa fa-lg fa-address-card-o"></i> <span class="hidden-mobile hidden-tablet"> DADOS GERAIS </span> </a>

            </li>

            <li>
              <a data-toggle="tab" id="tab-main-form-2" href="#hr2"> <i class="fa fa-lg fa-briefcase"></i> <span class="hidden-mobile hidden-tablet"> DADOS PROFISSIONAIS </span></a>
            </li>

            <li>
              <a data-toggle="tab" id="tab-main-form-3" href="#hr3"> <i class="fa fa-lg fa-user-circle"></i> <span class="hidden-mobile hidden-tablet"> CÔNJUGE/AVALISTA </span></a>
            </li>

          </ul> 

          <span class="jarviswidget-loader"><i class="fa fa-refresh fa-spin"></i></span></header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="tab-content m-b-10 padding-10">
                <div class="tab-pane fade active in" id="hr1">
                  <custom-form :group="1" v-on:form-saved="saved" ref="customFormPersonalData" :form-readonly="readonly"></custom-form>
                </div>
                <div class="tab-pane fade" id="hr2">
                  <custom-form :group="2" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></custom-form>
                </div>
                <div class="tab-pane fade" id="hr3">
                  <custom-form :group="3" v-on:form-saved="saved" ref="customFormGuaranter" :form-readonly="readonly"></custom-form>
                </div>
              </div>
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
  import Api from './../Api'
  import {
    __defaultBasePath,
    __defaultIcon,
    __defaultResourceLabel,
    __defaultSingularResource
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
      defaultSingularResource () {
        return __defaultSingularResource
      },
      icon () {
        return __defaultIcon
      },
      basePath () {
        return __defaultBasePath
      },
      resourceLabel () {
        return __defaultResourceLabel
      },
      forms () {
        return [
          this.$refs.customFormPersonalData,
          this.$refs.customFormOffice,
          this.$refs.customFormGuaranter
        ]
      }
    },
    created () {
      this.readonly = this.formReadonly

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
        this.forms.forEach((form) => {
          form.allowEdit()
          form.clearState()
        })
      },
      saved () {
        this.disableEdit()
      },
      update () {
        let data = {}
        let promises = []
        this.forms.forEach((form) => {
          promises.push(form.$validator.validateAll().then(() => {
            jquery(`#tab-main-form-${form.group}`).css('color', '#333')
            form.__fields.forEach((field) => {
              data[field.name] = form.$data[field.name]
            })
          }).catch((e) => { jquery(`#tab-main-form-${form.group}`).css('color', 'red') }))
        })

        Promise.all(promises).then(() => {
          let errorsCount = 0
          this.forms.forEach((form) => {
            data['id'] = form.$data['id']
            errorsCount += form.$validator.errorBag.errors.length
          })
          if (errorsCount === 0) {
            let api = new Api(this, this.basePath)
            api.update(data.id, data, () => {
              this.$router.push(`/${this.basePath}`)
            })
          }
        })
      },
      disableEdit () {
        this.readonly = true

        this.forms.forEach((form) => {
          form.disableEdit()
        })
      },
      destroy () {
        this.$refs.customFormPersonalData.destroy()
      }
    },
    components: {
      CustomForm
    }
  }
</script>
