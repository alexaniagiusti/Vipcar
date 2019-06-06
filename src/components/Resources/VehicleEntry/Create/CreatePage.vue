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
      <div class="jarviswidget jarviswidget-sortable" id="wid-id-11" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" data-widget-fullscreenbutton="false" data-widget-custombutton="false" role="widget">
        <header role="heading">
          <h2 class="pull-right" style="right: 20px"><strong>DADOS DO VEÍCULO</strong></h2>  

          <ul id="widget-tab-1" class="nav nav-tabs">

            <li class="active">

              <a data-toggle="tab" id="tab-main-form-1" href="#hr1"> <i class="fa fa-lg fa-car"></i> <span class="hidden-mobile hidden-tablet"> DADOS </span> </a>

            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-2" href="#hr2"> <i class="fa fa-lg fa-check-square-o"></i> <span class="hidden-mobile hidden-tablet"> OPCIONAIS </span></a>
            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-3" href="#hr3"> <i class="fa fa-lg fa-photo"></i> <span class="hidden-mobile hidden-tablet"> MÍDIAS </span></a>
            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-4" href="#hr4"> <i class="fa fa-lg fa-paperclip"></i> <span class="hidden-mobile hidden-tablet"> ANEXOS </span></a>
            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-5" href="#hr5"> <i class="fa fa-lg fa-list-ul"></i> <span class="hidden-mobile hidden-tablet"> CHECKLIST </span></a>
            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-7" href="#hr7"> <i class="fa fa-lg fa-sign-out"></i> <span class="hidden-mobile hidden-tablet"> DESPESAS </span></a>
            </li>

            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-8" href="#hr8"> <i class="fa fa-lg fa-clock-o"></i> <span class="hidden-mobile hidden-tablet"> HISTÓRICO </span></a>
            </li>
            <li :class="{'bg-color-orange': false}" v-if="showTabs">
              <a data-toggle="tab" id="tab-main-form-9" href="#hr9"> <i class="fa fa-lg fa-copy"></i> <span class="hidden-mobile hidden-tablet"> FINANCEIRO </span></a>
            </li>

          </ul> 

          <span class="jarviswidget-loader"><i class="fa fa-refresh fa-spin"></i></span></header>
          <div role="content">
            <div class="widget-body no-padding">
              <div class="tab-content m-b-10 padding-10">
                <div class="tab-pane active in fade" id="hr1">
                  <form-vehicle-create :group="1" v-on:form-saved="saved" ref="formVehicleCreate" :form-readonly="readonly"></form-vehicle-create>
                </div>
                <!-- <div class="tab-pane fade" id="hr2">
                  <form-optional :group="2" v-on:form-saved="saved" ref="formOptional" :form-readonly="readonly"></form-optional>
                </div> -->

                <!-- <div class="tab-pane fade" id="hr3">
                  <form-media :group="3" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></form-media>
                </div> -->

                <!-- <div class="tab-pane fade" id="hr4">
                  <form-attachment :group="4" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></form-attachment>
                </div> -->

                <!-- <div class="tab-pane fade" id="hr5">
                  <form-checklist-item :group="5" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></form-checklist-item>
                </div> -->

                <!-- <div class="tab-pane fade" id="hr7">
                  <form-expense :group="5" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></form-expense>
                </div> -->

                <!-- <div class="tab-pane fade" id="hr6">
                  <form-amount :group="6" v-on:form-saved="saved" ref="customFormOffice" :form-readonly="readonly"></form-amount>
                </div> -->
               <!--  <div class="tab-pane fade" id="hr3">
               <custom-form :group="3" v-on:form-saved="saved" ref="customFormGuaranter" :form-readonly="readonly"></custom-form> -->
             </div>
           </div>
         </div>
         <!-- end widget content -->

       </div>
       <!-- end widget div -->

     </div>
      <!-- <div class="jarviswidget">
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
      </div> -->
    </div>
  </div>
</div>
</template>

<script>
  import CreateVehicleDataForm from './../Create/CreateVehicleDataForm'
  // import CreateOptionalsDataForm from './../Create/OptionalsForm'
  // import MediaForm from './../Create/MediaForm'
  // import CustomForm from './../Create/CreateForm'
  // import AttachmentForm from './../Create/AttachmentForm'
  // import AmountForm from './../Create/AmountForm'
  // import ChecklistItemsForm from './../Create/ChecklistItemsForm'
  // import ExpenseForm from './../Create/ExpenseForm'
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
        readonly: null,
        showTabs: false
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
        this.$refs.formVehicleCreate.create()
      },
      disableEdit () {
        this.readonly = true
        this.$refs.customForm.disableEdit()
      },
      saved () {
        this.disableEdit()
      },
      destroy () {
        this.$refs.customForm.destroy()
      }
    },
    components: {
      'form-vehicle-create': CreateVehicleDataForm
      // CustomForm,
      // 'form-optional': CreateOptionalsDataForm,
      // 'form-media': MediaForm,
      // 'form-attachment': AttachmentForm,
      // 'form-amount': AmountForm,
      // 'form-checklist-item': ChecklistItemsForm,
      // 'form-expense': ExpenseForm
    }
  }
</script>
<style type="text/css">
  .jarviswidget header .nav-tabs>li>a {
    border-radius: 0;
    border: none;
    padding: 5px 4px 7px !important
  }
</style>
