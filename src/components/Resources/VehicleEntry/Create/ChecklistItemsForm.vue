<template>
  <form @submit.prevent id="main-form" class="smart-form">
    <fieldset>
      <legend>
        <i class="fa fa fa-list-ul"></i> 
        CHECKLIST 
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
            <input autocomplete="off" type="text" class="input-lg" name='checklist-items-search' placeholder="Pesquisar..." v-model="search">
          </label>
        </section>
      </div>
      <div class="row">
        <section v-for="checklistItem in searchedChecklistItems">
          <div class="col-md-4">
            <label :class="{'toogle-active': selectedChecklistItems.includes(checklistItem.id)}" class="toggle">
              <b v-if="selectedChecklistItems.includes(checklistItem.id)" class="fa fa-lg fa-check-square-o"></b> 
              <input @change="clearAndFocusSearch" v-model="selectedChecklistItems" :value="checklistItem.id" type="checkbox" name="name">
              {{ checklistItem.description }}
              <i data-swchon-text="SIM" data-swchoff-text="NÃO"></i>
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

      this.$root.axios.get('checklist-items').then(({ data }) => {
        this.checklistItems = data.data.data
      })
    },
    computed: {
      searchedChecklistItems () {
        return this.checklistItems.filter(option => option.description.toUpperCase().includes(this.search.toUpperCase()))
      },
      totalChecked () {
        return this.selectedChecklistItems.length
      },
      totalUnchecked () {
        return this.checklistItems.length - this.selectedChecklistItems.length
      },
      totalItems () {
        return this.checklistItems.length
      }
    },
    data () {
      return {
        id: null,
        readonly: false,
        detailsCar: {},
        checklistItems: [],
        selectedChecklistItems: [],
        search: ''
      }
    },
    methods: {
      clearAndFocusSearch () {
        jquery('[name=checklist-items-search]').focus()
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
  .smart-form .toggle i {
    width: 78px !important;
  }

  .smart-style-2 .smart-form .toggle i:before {
    background-color: #DB4A67;
    border-color: #CA4862;
  }
  .smart-form .toggle i:before {
    background-color: #DB4A67;
    border-color: #CA4862;
  }
  .smart-style-2 .smart-form .toogle-active i:before {
    background-color: #71843f !important;
  }
  .smart-form .toggle input:checked+i:before {
    right: 65px;
    top: 3px;
  }
</style>
