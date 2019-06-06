<template>
  <div>
    <button class="btn btn-lg btn-block btn-primary">
      <i class="fa fa-check-circle fa-lg"></i> Adicionar Foto
    </button>
    <div class="superbox">
      <div v-show="showImage" class="superbox-show" style="display: block;max-height:350px;">
        <img :src="currentImage" height="250px" class="superbox-current-img" style="opacity: 1;">
        <span>
          <p>
            <a class="btn btn-primary btn-sm"><i class="fa fa-edit"></i> Alterar Imagem</a>
            <a class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Excluir</a>
          </p>
        </span>
        <div @click="currentImage = ''" class="superbox-close txt-color-white"><i class="fa fa-times fa-lg"></i></div>
      </div>
      <div v-for="image in imageList" class="superbox-list">
        <img @click="selectImage(image)" :src="image" :data-img="image" class="superbox-img">
      </div>
      <div class="superbox-float"></div>
    </div>
    <!-- /SuperBox -->
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
      jquery('.superbox').SuperBox()
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)

      this.$root.axios.get(`optional-items`).then(({ data }) => {
        this.optionalItems = data.data.data
      })
    },
    computed: {
      searchedOptionalItems () {
        return this.optionalItems.filter(option => option.fullname.toUpperCase().includes(this.search.toUpperCase()))
      },
      showImage () {
        return this.currentImage.length > 0
      }
    },
    data () {
      return {
        id: null,
        readonly: false,
        currentImage: '',
        imageList: [
          'static/template/img/cars/imgs-carro.png',
          'static/template/img/cars/imgs-carro-1.jpg',
          'static/template/img/cars/imgs-carro-2.jpg',
          'static/template/img/cars/imgs-carro-3.jpg',
          'static/template/img/cars/imgs-carro-4.jpg',
          'static/template/img/cars/imgs-carro-5.jpg',
          'static/template/img/cars/imgs-carro-6.jpg',
          'static/template/img/cars/imgs-carro-7.jpg'
        ]
      }
    },
    methods: {
      clearAndFocusSearch () {
        this.search = ''
        jquery('[name=optional-items-search]').focus()
      },
      selectImage (img) {
        this.currentImage = img
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
  .superbox-current-img {
    float: none;
    text-align: center;
  }

  .smart-style-2 #header, .smart-style-2 .page-footer, .smart-style-2 .superbox-show {
    text-align: center;
  }
</style>
