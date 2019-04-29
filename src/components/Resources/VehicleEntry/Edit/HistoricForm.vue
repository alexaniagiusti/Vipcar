<template>
  <div>
    <form @submit.prevent id="main-form" class="smart-form">
      <fieldset>
        <div class="row">
          <template v-for="field in __fields">
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
            v-validate="'required'"
            :name="field.name"
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
          <div class="col col-md-1">
            <label class="label">&nbsp;</label>
            <button v-if="!private_id" @click="create" style="padding: 4px 5px" class="btn btn-success">
            <i class="fa fa-check-circle"></i> Lançar no Histórico
            </button>
            <!-- <button v-else @click="create" style="padding: 4px 5px" class="btn btn-primary">
            <i class="fa fa-edit"></i> Editar pendência
            </button> -->
          </div>
        </div>
      </fieldset>
      <table v-if="pendencies.length" class="table">
        <thead>
          <tr>
            <th>Data</th>
            <!-- <th>Ocorrência</th> -->
            <th>Descrição</th>
            <th>Usuário</th>
            <!-- <th>Ac</th> -->
            <!-- <th>Encerrado Em</th> -->
            <!-- <th>Encerrado por</th> -->
            <th width="25%">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pendency in pendencies">
            <td>{{ pendency.date }}</td>
            <td>{{ pendency.description }}</td>
            <!-- <td>{{ pendency.prediction_at }}</td> -->
            <!-- <td>{{ pendency.completed_at }}</td> -->
            <td>{{ pendency.employee.name }}</td>
            <td v-if="profile.map['vehicle-entries'].includes('delete-historic')">
              <a @click.prevent="drop(pendency.id)" class="btn btn-danger padding-5"> <i class="fa fa-trash"></i> Excluir</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-else>
        <i class="fa fa-lg text-primary fa-inbox"></i> Não existem entradas no histórico para este veículo!
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
          wrapperClass: 'col-lg-2',
          placeholder: 'Preencha a data',
          name: 'date'
        },
        description: {
          label: 'Lançamento manual no histórico',
          component: 'textarea-field',
          icon: 'tag',
          wrapperClass: 'col-lg-8',
          placeholder: '',
          name: 'description',
          group: 1
        }
      }
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)
    },
    computed: {
      currentTenant () {
        return localStorage.getItem('current-tenant-idkey')
      },
      moment () {
        return moment
      },
      ...mapState({
        profile: state => state.user.profile
      })
    },
    data () {
      return {
        id: this.$parent.$refs.customFormPersonalData.id,
        private_id: null,
        entry_id: this.$parent.$refs.customFormPersonalData.id,
        readonly: false,
        date: '',
        occurrence: '',
        description: '',
        prediction_at: '',
        pendencies: [],
        __fields: {}
      }
    },
    methods: {
      concluir (id) {
        this.$root.axios.post('/historic-vehicles/mark-as-finished/' + id).then(({data}) => {
          this.refresh()
        })
      },
      drop (id) {
        this.$root.axios.post('/historic-vehicles/' + id, {
          '_method': 'DELETE'
        }).then((data) => {
          this.refresh()
        })
      },
      edit (id) {
        this.$root.axios.get('/historic-vehicles/' + id).then(({data}) => {
          this.date = data.data.date
          this.occurrence = data.data.occurrence
          this.description = data.data.description
          this.prediction_at = data.data.prediction_at
          this.private_id = data.data.id
        })
      },
      refresh () {
        this.$root.axios.get('/historic-vehicles', {
          params: {
            'entry_id': this.$parent.$refs.customFormPersonalData.id,
            'o': 'date;id',
            's': 'desc'
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
            this.$root.axios.put('/historic-vehicles/' + this.private_id,
            this._data).then((data) => {
              this.refresh()
              this.private_id = null
              this.date = ''
              this.occurrence = ''
              this.description = ''
              this.prediction_at = ''
              this.private_id = ''
            })
          } else {
            this.$root.axios.post('/historic-vehicles',
              this._data).then((data) => {
                this.refresh()
              })
          }
        }).catch(() => {})
      },
      destroy () {
        this.api.delete(this.id, ({ data }) => {
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
