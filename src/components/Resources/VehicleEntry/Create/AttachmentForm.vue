<template>
  <form @submit.prevent id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <div class="well-light">
          <ul class="media-list">
            <li class="m-b-10 media">
              <a class="pull-left">
                <img class="media-object" alt="64x64" src="static/template/img/demo/64x64.png">
              </a>
              <div class="media-body">
                <h4 class="media-heading">Media heading</h4>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                </p>
              </div>
            </li>
            <li class="media">
              <a class="pull-left">
                <img class="media-object" alt="64x64" src="static/template/img/demo/64x64.png">
              </a>
              <div class="media-body">
                <h4 class="media-heading">Media heading</h4>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
              </div>
            </li>
          </ul>

        </div>
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
