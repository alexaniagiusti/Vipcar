<template>
  <div @keyup.alt.shift.83="update" @keyup.alt.shift.67="disableEdit" @keyup.alt.shift.88="$refs.customForm.destroy">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 v-if="!expenseVehiclePlate" class="page-title txt-color-blueDark hidden-print">
        <i :class="'fa fa-fw fa-' + defaultIcon"></i>  <!-- {{ defaultResourceLabel }} -->
        <div class="pull-right">
          <a @click.prevent="$router.push(`/${basePath}`)" class="btn btn-default">
            <i class="fa fa-arrow-left fa-lg fa-fw"></i> Voltar
          </a>
          <a @click.prevent="$router.push(`/${basePath}/create/`)" class="btn btn-default">
            <i class="fa fa-plus-circle fa-lg fa-fw"></i> Cadastrar novo
          </a>
          <router-link v-if="$refs.customFormPersonalData && $refs.customFormPersonalData.state_id == 1 && profile.map['vehicle-sale'].includes('create') && !$refs.customFormPersonalData.unidadesDiferentes" :to="{path: `/vehicle-sale/create/${$refs.customFormPersonalData.id}`}" class="btn btn-primary">
            <i class="fa fa-dollar"></i> Iniciar Venda
          </router-link>
          <a @click.prevent="allowEdit" v-if="readonly" href="#" class="btn btn-default">
            <i class="fa fa-edit fa-lg fa-fw"></i> Editar este registro
          </a>
          <span v-else>
            <a v-if="$refs.customFormPersonalData && !$refs.customFormPersonalData.unidadesDiferentes" @click.prevent="update" href="#" class="btn btn-success">
              <i class="fa fa-check-circle fa-lg fa-fw"></i> Salvar dados ( ALT + SHIFT +  S )
            </a>
            <a v-if="$refs.customFormPersonalData && !$refs.customFormPersonalData.unidadesDiferentes" @click.prevent="disableEdit" href="#" class="btn btn-warning">
              <i class="fa fa-undo fa-fw"></i> Cancelar Alteração ( ALT + SHIFT +  C )
            </a>
            <a v-if="$refs.customFormPersonalData && !$refs.customFormPersonalData.unidadesDiferentes" @click="destroy" class="btn btn-danger">
              <i class="fa fa-trash fa-fw"></i> Excluir registro ( ALT + SHIFT +  X )
            </a>
          </span>
        </div>
      </h1>
      <div class="jarviswidget jarviswidget-sortable" id="wid-id-11" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-togglebutton="false" data-widget-deletebutton="false" data-widget-fullscreenbutton="false" data-widget-custombutton="false" role="widget">
        <header role="heading">
          <h2 class="pull-right" style="right: 20px">
            <strong>DADOS DO VEÍCULO</strong>
            <b v-if="refreshed" class="visible-print-inline">: {{ $refs.customFormPersonalData._data.plate }}</b>
          </h2>

          <ul id="widget-tab-1" class="nav nav-tabs hidden-print">

            <li class="active">

              <a data-toggle="tab" id="tab-main-form-1" href="#hr1"> <i class="fa fa-lg fa-address-card-o text-success"></i> <span class="hidden-mobile hidden-tablet"> DADOS GERAIS </span> </a>

            </li>

            <li v-show="!expenseVehiclePlate">
              <a data-toggle="tab" id="tab-main-form-2" href="#hr2"> <i class="fa fa-lg fa-briefcase txt-color-teal"></i> <span class="hidden-mobile hidden-tablet"> OPCIONAIS </span></a>
            </li>

            <li v-show="!expenseVehiclePlate">
              <a data-toggle="tab" id="tab-main-form-3" href="#hr3"> <i class="fa fa-lg fa-user-circle txt-color-teal"></i> <span class="hidden-mobile hidden-tablet"> CHECKLIST </span></a>
            </li>
            <li v-show="!expenseVehiclePlate">
              <a data-toggle="tab" id="tab-main-form-4" href="#hr4"> <i class="fa fa-lg fa-photo text-primary"></i> <span class="hidden-mobile hidden-tablet"> MÍDIAS </span></a>
            </li>

            <li v-show="!expenseVehiclePlate">
              <a data-toggle="tab" id="tab-main-form-5" href="#hr5"> <i class="fa fa-lg fa-paperclip text-primary"></i> <span class="hidden-mobile hidden-tablet"> Anexos </span></a>
            </li>
            <li v-show="!expenseVehiclePlate">
              <a data-toggle="tab" id="tab-main-form-6" href="#hr6"> <i class="fa fa-lg fa-times text-danger"></i> <span class="hidden-mobile hidden-tablet"> Pendências </span></a>
            </li>

            <li v-show="!expenseVehiclePlate">
              <a @click="$refs.historicForm.refresh()" data-toggle="tab" id="tab-main-form-7" href="#hr7"> <i class="fa fa-lg fa-calendar text-primary"></i> <span class="hidden-mobile hidden-tablet"> Histórico </span></a>
            </li>

            <li>
              <a data-toggle="tab" id="tab-main-form-8" href="#hr8"> <i class="fa fa-lg fa-money text-primary"></i> <span class="hidden-mobile hidden-tablet">
                Despesas </span>
              </a>
            </li>

            <li v-show="!expenseVehiclePlate" v-if="profile.map['vehicle-entries'].includes('show-financial-tab')">
              <a data-toggle="tab" id="tab-main-form-9" href="#hr9"> <i class="fa fa-lg fa-dollar text-primary"></i> <span class="hidden-mobile hidden-tablet">
                Financeiro </span>
              </a>
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
                  <!-- <div class="tab-pane fade" id="hr2"> -->
                    <form-optional v-if="refreshed" :group="2" v-on:form-saved="saved" ref="formOptional" :form-readonly="readonly"></form-optional>
                  <!-- </div> -->
                </div>
                <div class="tab-pane fade" id="hr3">
                  <!-- <div class="tab-pane fade" id="hr5"> -->
                    <form-checklist-item v-if="refreshed" :group="3" v-on:form-saved="saved" ref="formChecklistItem" :form-readonly="readonly"></form-checklist-item>
                  <!-- </div> -->
                </div>
                <div class="tab-pane fade" id="hr4">
                  <form-media v-if="refreshed" :group="4" v-on:form-saved="saved" ref="formMedia" :form-readonly="readonly"></form-media>
                </div>

                <div class="tab-pane fade" id="hr5">
                  <form-attachment v-if="refreshed" :group="5" v-on:form-saved="saved" ref="formAttachment" :form-readonly="readonly"></form-attachment>
                </div>

                <div class="tab-pane fade" id="hr6">
                  <form-pendency v-if="refreshed" :group="6" v-on:form-saved="saved" ref="formPendency" :form-readonly="readonly"></form-pendency>
                </div>

                <div class="tab-pane fade" id="hr7">
                  <form-historic v-if="refreshed" :group="6" v-on:form-saved="saved" ref="historicForm" :form-readonly="readonly"></form-historic>
                </div>

                <div class="tab-pane fade" id="hr8">
                  <form-expense v-if="refreshed" :group="7" v-on:form-saved="saved" ref="expenseForm" :form-readonly="readonly"></form-expense>
                </div>

                <div class="tab-pane fade" id="hr9">
                  <financial-page v-if="refreshed" :group="9" v-on:form-saved="saved" ref="financialPage" :form-readonly="readonly"></financial-page>
                </div>
              </div>
            </div>
            <!-- end widget content -->

          </div>
          <!-- end widget div -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AttachmentForm from './../Edit/AttachmentForm'
  import CustomForm from './../Edit/EditForm'
  import OptionalForm from './../Edit/OptionalsForm'
  import ChecklistItemForm from './../Edit/ChecklistItemsForm'
  import MediaForm from './../Edit/MediaForm'
  import PendencyForm from './../Edit/PendencyForm'
  import HistoricForm from './../Edit/HistoricForm'
  import ExpenseForm from './../Edit/ExpenseForm'
  import FinancialPage from './../Edit/FinancialPage'
  import jquery from 'jquery'
  import Api from './../Api'
  import { mapState } from 'vuex'
  import {
    __fields,
    __defaultBasePath,
    __defaultIcon,
    __defaultResourceLabel,
    __defaultSingularResource
  } from './../metadata'

  export default {
    props: {
      formReadonly: {
        type: Boolean,
        default: false
      },
      expenseVehiclePlate: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentTenant () {
        return localStorage.getItem('current-tenant-idkey')
      },
      forms () {
        return [
          this.$refs.customFormPersonalData,
          this.$refs.formOptional,
          this.$refs.formChecklistItem
        ]
      },
      ...mapState({
        profile: state => state.user.profile
      }),
      defaultIcon () {
        return __defaultIcon
      },
      defaultSingularResource () {
        return __defaultSingularResource
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
    data () {
      return {
        readonly: null,
        refreshed: false
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
        {label: 'Editar', url: `/${this.basePath}/${this.$route.params.id}/edit`, icon: 'edit'}
        ]
      })
    },
    mounted () {
      if (this.$route.query.a) {
        jquery(`[href="#${this.$route.query.a}"]`).click()
      }
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
              // console.log(field)
              data[field.name] = form.$data[field.name]
            })
          }).catch((e) => { jquery(`#tab-main-form-${form.group}`).css('color', 'red') }))
        })

        Promise.all(promises).then(() => {
          let errorsCount = 0
          this.forms.forEach((form) => {
            errorsCount += form.$validator.errorBag.errors.length
          })
          if (errorsCount === 0) {
            let api = new Api(this, this.basePath)
            data.selectedOptionalItems = this.$refs.formOptional.selectedOptionalItems
            data.selectedChecklistItems = this.$refs.formChecklistItem.selectedChecklistItems
            api.update(this.$refs.customFormPersonalData.id, data, () => {
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
      CustomForm,
      'form-media': MediaForm,
      'form-optional': OptionalForm,
      'form-checklist-item': ChecklistItemForm,
      'form-pendency': PendencyForm,
      'form-attachment': AttachmentForm,
      'form-historic': HistoricForm,
      'form-expense': ExpenseForm,
      'financial-page': FinancialPage
    }
  }
</script>
