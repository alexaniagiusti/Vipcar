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
          <div class="col col-md-2">
            <label class="label">&nbsp;</label>
            <button style="padding: 4px 14px" class="btn btn-success">
            <i class="fa fa-check-circle"></i> Criar nova despesa
            </button>
          </div>
        </div>
      </fieldset>
      <div class="tab-pane active" id="hr2">

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

      </div>
    </form>

  </div>
</template>

<script>
  import Api from './../Api'
  import jquery from 'jquery'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.__fields = {
        cpf: {
          label: 'Data',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: 'calendar',
          wrapperClass: 'col-lg-2',
          placeholder: 'Preencha a data',
          name: 'cpf'
        },
        expense_type_id: {
          label: 'Tipo de Despesa',
          component: 'entity-field',
          usingAsProvider: '/expense-types',
          usingAsLabel: 'description',
          usingAsValue: 'id',
          list: true,
          icon: 'tag',
          wrapperClass: 'col-lg-3',
          placeholder: '',
          name: 'expense_type_id',
          group: 1
        },
        provider_id: {
          label: 'Fornecedor',
          component: 'entity-field',
          usingAsProvider: '/providers',
          usingAsLabel: 'name',
          usingAsValue: 'id',
          list: true,
          icon: 'tag',
          wrapperClass: 'col-lg-3',
          placeholder: '',
          name: 'provider_id',
          group: 1
        },
        teste2: {
          label: 'Valor',
          component: 'monetary-field',
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-2',
          details: true,
          placeholder: '',
          name: 'teste2',
          group: 1
        }
      }
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)

      this.$root.axios.get(`optional-items`).then(({ data }) => {
        this.optionalItems = data.data.data
      })
    },
    computed: {
    },
    data () {
      return {
        id: null,
        readonly: false,
        __fields: {}
      }
    },
    methods: {
      clearAndFocusSearch () {
        jquery('[name=optional-items-search]').focus()
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      create () {
        this.$validator.validateAll().then(() => {
          this.api.create(this._data, ({ data }) => {
            this.$router.push(`/${this.basePath}`)
          })
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
