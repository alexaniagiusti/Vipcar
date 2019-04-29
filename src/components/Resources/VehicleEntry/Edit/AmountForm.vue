<template>
  <form @submit.prevent id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
      {{ readonly }}
        <section v-for="field in __fields">
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
          v-validate="$data[field['name'] + '_rule']"
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
        </section>
      </div>
    </fieldset>
  </form>
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
          label: 'Data de aquisição',
          group: 1,
          component: 'masked-field',
          mask: '11/11/1111',
          list: true,
          icon: '',
          wrapperClass: 'col-lg-3',
          placeholder: 'Preencha o CPF',
          name: 'cpf'
        },
        teste: {
          label: 'Preço Médio',
          component: 'monetary-field',
          lazy: true,
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-3',
          details: true,
          placeholder: '',
          name: 'teste',
          group: 1
        },
        detail_amount: {
          label: 'Preço de Venda',
          component: 'monetary-field',
          lazy: true,
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-3',
          details: true,
          placeholder: '',
          name: 'detail_amount',
          group: 1
        },
        teste2: {
          label: 'Preço Médio',
          component: 'percent-field',
          lazy: true,
          list: true,
          icon: 'dollar',
          wrapperClass: 'col-lg-3',
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
      searchedOptionalItems () {
        return this.optionalItems.filter(option => option.fullname.toUpperCase().includes(this.search.toUpperCase()))
      }
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
<style type="text/css" scoped>
  .smart-style-2 .smart-form .toggle i:before {
    background-color: #333
  }
  .smart-form .toggle i:before {
    background-color: #333
  }
  .smart-style-2 .smart-form .toogle-active i:before {
    background-color: #3b9ff3;
  }
  .smart-form .toogle-active i:before {
    background-color: #3276B1;
  }
</style>
