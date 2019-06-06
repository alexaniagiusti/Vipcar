<template>
  <div>
  <!-- <button style="margin-bottom:10px" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-pendency">
    <i class="fa fa-external-link"></i> Ver em tela cheia
  </button> -->
    <div class="modal modal-pendency fade" id="modal-pendency" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div style="width:95%" class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title" id="myModalLabel">
              <i class="fa fa-bell"></i> Fechamento de Pendência</h4>
          </div>
          <div class="modal-body">
            <form @submit.prevent class="smart-form">
              <template v-for="field in __fields_group2">
                <component
                :is="field.component"
                :wrapper-class="field.wrapperClass"
                :data-vv-as="field.label"
                :select-options="field.selectOptions"
                :using-as-provider="field.usingAsProvider"
                :using-as-label="field.usingAsLabel"
                :has-related="field.hasRelated"
                :related="field.related"
                :mask="field.mask"
                :using-as-value="field.usingAsValue"
                v-validate="{}"
                :name="field.name"
                :lazy="field.lazy"
                v-model="$data[field['name']]"
                :icon="field.icon"
                :label="field.label"
                :placeholder="field.placeholder"
                :readonly="readonly"
                :custom-error="errors.first(field.name)"
                :valid="fields.valid(field.name)"
                :failed="fields.failed(field.name)"
                ></component>
              </template>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="concluir" class="btn btn-success">
              <i class="fa fa-check-circle"></i> Fechar pendência
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">
              <i class="fa fa-arrow-left"></i> Voltar
            </button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
    <form @submit.prevent id="main-form" class="smart-form">
      <fieldset>
        <div class="row">
          <template v-for="field in __fields_group1">
            <component
            :is="field.component"
            :wrapper-class="field.wrapperClass"
            :data-vv-as="field.label"
            :select-options="field.selectOptions"
            :using-as-provider="field.usingAsProvider"
            :using-as-label="field.usingAsLabel"
            :has-related="field.hasRelated"
            :related="field.related"
            :mask="field.mask"
            :using-as-value="field.usingAsValue"
            v-validate="field.name !== 'employee_assigned_id' ? 'required': {}"
            :name="field.name"
            v-model="$data[field['name']]"
            :icon="field.icon"
            :label="field.label"
            :placeholder="field.placeholder"
            :readonly="readonly  || (typeof(private_id) !== 'undefined' &&  field.name === 'employee_assigned_id' && !profile.map['vehicle-entries'].includes('change-assigned-employee-pendencies'))"
            :lazy="field.lazy"
            :custom-error="errors.first(field.name)"
            :valid="fields.valid(field.name)"
            :failed="fields.failed(field.name)"
            :ref="'ref_' + field.name"
            ></component>
          </template>
          <div class="col col-md-1">
            <label class="label">&nbsp;</label>
            <button v-if="!private_id" @click="create" style="padding: 4px 5px" class="btn btn-success">
            <i class="fa fa-check-circle"></i> Criar nova pendência
            </button>
            <button v-else @click="create" style="padding: 4px 5px" class="btn btn-primary">
            <i class="fa fa-edit"></i> Editar pendência
            </button>
          </div>
        </div>
      </fieldset>
      <table v-if="pendencies.length" class="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo de Pendência</th>
            <th>Ocorrência</th>
            <th>Descrição</th>
            <th>Previsão</th>
            <th>Encerrado Em</th>
            <th>Encerrado por</th>
            <th width="25%">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="!pendency.completed_at ? 'danger': 'success'" v-for="pendency in pendencies">
            <td>{{ pendency.date }}</td>
            <td>{{ pendency.category_pendency_vehicle.description }}</td>
            <td>{{ pendency.occurrence }}</td>
            <td>{{ pendency.description }}</td>
            <td>{{ pendency.prediction_at }}</td>
            <td>{{ pendency.completed_at }}</td>
            <td>{{ pendency.employee.name }}</td>
            <td>
              <a v-if="!pendency.completed_at && Number(user.id) === Number(pendency.assigned_employee.id_key)" @click.prevent="openModal(pendency.id)" class="btn btn-primary padding-5"> <i class="fa fa-check-circle"></i> Concluir</a>
              <a @click.prevent="edit(pendency.id)" class="btn btn-default padding-5"> <i class="fa fa-edit"></i> Editar</a>
              <a v-if="profile.map['vehicle-entries'].includes('delete-pendencies')" @click.prevent="drop(pendency.id)" class="btn btn-danger padding-5"> <i class="fa fa-trash"></i> Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-else>
        <i class="fa fa-lg text-primary fa-inbox"></i> Não existem pendências para este veículo!
      </div>
      <!-- <div class="tab-pane active" id="hr2">

        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#iss1" data-toggle="tab">Item 1</a>
          </li>
          <li class="">
            <a href="#iss2" data-toggle="tab">Item 2</a>
          </li>
          <li class="">
            <a href="#iss3" data-toggle="tab">Item 3</a>
          </li>
        </ul>
        <div class="tab-content padding-10">
          <div class="tab-pane active" id="iss1">
            <p>
              Three monkeys escaped from the zoo, one was caught watching TV, the other playing hockey, and the third one was caught reading this quote!
            </p>
          </div>
          <div class="tab-pane" id="iss2">
            <p>
              Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.
            </p>
          </div>
          <div class="tab-pane" id="iss3">
            <p>
              Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table.
            </p>
          </div>
        </div>

      </div> -->
    </form>

  </div>
</template>

<script>
  import Api from './../Api'
  import jquery from 'jquery'
  import moment from 'moment'
  import { mapState } from 'vuex'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.$refs['ref_employee_assigned_id'][0].refreshOptions({
        entry_id: this.$parent.$refs.customFormPersonalData.id
      })
      this.entry_id = this.$parent.$refs.customFormPersonalData.id_key
      this.refresh()
    },
    created () {
      this.__fields = {
        date: {
          label: 'Data',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-6',
          placeholder: 'Preencha a data da pendência',
          name: 'date'
        },
        prediction_at: {
          label: 'Previsão',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-6',
          placeholder: 'Preencha a previsão de conclusão',
          name: 'prediction_at'
        },
        occurrence: {
          label: 'Ocorrência',
          component: 'text-field',
          icon: 'edit',
          wrapperClass: 'col-lg-6',
          placeholder: '',
          name: 'occurrence',
          group: 1
        },
        description: {
          label: 'Descrição',
          component: 'text-field',
          icon: 'edit',
          wrapperClass: 'col-lg-6',
          placeholder: '',
          name: 'description',
          group: 1
        },
        conclusion: {
          label: 'Descrição da Conclusão',
          component: 'textarea-field',
          icon: 'edit',
          wrapperClass: 'col-lg-12',
          placeholder: '',
          name: 'conclusion',
          group: 2
        },
        category_pendency_vehicle_id: {
          group: 1,
          label: 'Tipo de pendência',
          component: 'entity-field',
          usingAsProvider: '/categories-pendency',
          usingAsLabel: 'description',
          resourceKey: 'category_pendency_vehicle',
          usingAsValue: 'id_key',
          list: true,
          orderBy: 'category_pendency_vehicle.description',
          icon: 'tag',
          wrapperClass: 'col-lg-12',
          placeholder: 'Preencha o Tipo de pendência',
          name: 'category_pendency_vehicle_id'
        },
        employee_assigned_id: {
          group: 1,
          label: 'Atribuição para usuário',
          component: 'entity-field',
          usingAsProvider: '/employees-by-stock',
          usingAsLabel: 'name',
          resourceKey: 'assigned_employee',
          usingAsValue: 'id_key',
          list: true,
          lazy: true,
          orderBy: 'employees.name',
          icon: 'user',
          wrapperClass: 'col-lg-12',
          placeholder: 'Atribuição para usuário',
          name: 'employee_assigned_id'
        }
      }
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)

      // this.$root.axios.get(`optional-items`).then(({ data }) => {
      //   this.optionalItems = data.data.data
      // })
    },
    computed: {
      __fields_group1 () {
        let fields = Object.keys(this.__fields)
        let result = []
        fields.forEach(field => {
          if (this.__fields[field].group === 1) {
            result.push(this.__fields[field])
          }
        })

        return result
      },
      __fields_group2 () {
        let fields = Object.keys(this.__fields)
        let result = []
        fields.forEach(field => {
          if (this.__fields[field].group === 2) {
            result.push(this.__fields[field])
          }
        })

        return result
      },
      currentTenant () {
        return localStorage.getItem('current-tenant-idkey')
      },
      moment () {
        return moment
      },
      ...mapState({
        authenticated: state => state.user.authenticated,
        user: state => state.user,
        token: state => state.user.token,
        profile: state => state.user.profile
      })
    },
    data () {
      return {
        id: this.$parent.$refs.customFormPersonalData.id,
        private_id: undefined,
        entry_id: this.$parent.$refs.customFormPersonalData.id,
        readonly: false,
        date: '',
        occurrence: '',
        description: '',
        prediction_at: '',
        conclusion: undefined,
        category_pendency_vehicle_id: undefined,
        employee_assigned_id: undefined,
        pendencies: [],
        __fields: {}
      }
    },
    methods: {
      openModal (id) {
        this.conclusion = undefined
        jquery('#modal-pendency').data('pendency_id', id).modal('show')
      },
      concluir () {
        this.$root.axios.post('/pendency-vehicles/mark-as-finished/' + jquery('#modal-pendency').data('pendency_id'), {
          conclusion: this.conclusion
        }).then(({data}) => {
          this.refresh()
          jquery('#modal-pendency').data('pendency_id', undefined).modal('hide')
        })
      },
      drop (id) {
        this.$root.axios.post('/pendency-vehicles/' + id, {
          '_method': 'DELETE'
        }).then((data) => {
          this.refresh()
        })
      },
      edit (id) {
        this.$root.axios.get('/pendency-vehicles/' + id).then(({data}) => {
          this.date = data.data.date
          this.occurrence = data.data.occurrence
          this.description = data.data.description
          this.prediction_at = data.data.prediction_at
          this.private_id = data.data.id
          this.employee_assigned_id = data.data.assigned_employee.id_key
          this.category_pendency_vehicle_id = data.data.category_pendency_vehicle.id_key
        })
      },
      refresh () {
        this.$root.axios.get('/pendency-vehicles', {
          params: {
            'entry_id': this.$parent.$refs.customFormPersonalData.id,
            'o': 'id'
          }
        }).then(({data}) => {
          this.pendencies = data.data.data
        })
      },
      clearAndFocusSearch () {
        jquery('[name=optional-items-search]').focus()
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      create () {
        this.$validator.validateAll().then(() => {
          if (this.private_id) {
            this.$root.axios.put('/pendency-vehicles/' + this.private_id,
            this._data).then((data) => {
              this.refresh()
              this.private_id = undefined
              this.date = ''
              this.occurrence = ''
              this.description = ''
              this.prediction_at = ''
              this.category_pendency_vehicle_id = undefined
              this.employee_assigned_id = undefined
            })
          } else {
            this.$root.axios.post('/pendency-vehicles',
              this._data).then((data) => {
                this.refresh()
              })
          }
        }).catch(e => console.log(e))
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
          this.private_id = undefined
          this.date = ''
          this.occurrence = ''
          this.description = ''
          this.prediction_at = ''
          this.category_pendency_vehicle_id = undefined
          this.employee_assigned_id = undefined
          this.$router.push(`/${this.basePath}`)
        })
      },
      disableEdit () {
        this.fetch()
        this.readonly = true
      },
      allowEdit () {
        this.readonly = false
      }
    }
  }
</script>
