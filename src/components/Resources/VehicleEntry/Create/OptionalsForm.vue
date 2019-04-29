<template>
  <form @submit.prevent id="main-form" class="smart-form">
    <fieldset>
      <legend>
      {{ $parent.$refs.formVehicleCreate.id }}
        <i class="fa fa-check-square-o"></i> ITENS OPCIONAIS
        <div class="pull-right">
          <span style="position:relative;top: -4px;margin-right:10px;" class="bootstrap-label label-success">  {{ totalChecked }} Selecionados
          </span>
          <span style="position:relative;top: -4px;margin-right:10px;" class="bootstrap-label label-danger">  {{ totalUnchecked }} Selecionados
          </span>
          <span style="position:relative;top: -4px" class="bootstrap-label label-primary"> {{ totalItems }} Total
          </span>
        </div>
      </legend>
      <div class="row">
        <section>
          <label class="input">
            <input autocomplete="off" type="text" class="input-lg" name='optional-items-search' placeholder="Pesquisa..." v-model="search">
          </label>
        </section>
      </div>
      <div class="row">
        <section v-for="optionalItem in searchedOptionalItems" class="col col-md-6">
          <div>
            <label :class="{'toogle-active': selectedOptionalItems.includes(optionalItem.id_key)}" class="toggle">
              <input @change="clearAndFocusSearch" v-model="selectedOptionalItems" :value="optionalItem.id_key" type="checkbox" name="name">
              {{ optionalItem.fullname }}<i data-swchon-text="SIM" data-swchoff-text="NÃO"></i>
            </label>
          </div>
        </section>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import Api from './../Api'
  import jquery from 'jquery'
  import { map } from 'lodash'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)

      this.$root.axios.get(`optional-items`).then(({ data }) => {
        this.optionalItems = data.data.data
      })

      this.$root.axios.get(`optional-item-entries`, {
        params: {
          q: `entry_id:${this.$parent.$refs.formVehicleCreate.id}`,
          sf: `id:=`
        }
      }).then(({ data }) => {
        this.selectedOptionalItems = map(data.data.data, 'optional_item_id')
      })
    },
    computed: {
      totalChecked () {
        return this.selectedOptionalItems.length
      },
      totalUnchecked () {
        return this.optionalItems.length - this.selectedOptionalItems.length
      },
      totalItems () {
        return this.optionalItems.length
      },
      searchedOptionalItems () {
        return this.optionalItems.filter(option => option.fullname.toUpperCase().includes(this.search.toUpperCase()))
      }
    },
    data () {
      return {
        id: null,
        id_key: null,
        readonly: false,
        detailsCar: {},
        optionalItems: [],
        selectedOptionalItems: [],
        search: ''
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
