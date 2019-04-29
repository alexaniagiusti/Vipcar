<template>
  <div>
    <form @submit.prevent id="main-form" class="smart-form">
    <section v-if="$parent.$refs.customFormPersonalData && !$parent.$refs.customFormPersonalData.unidadesDiferentes">
      <label class="label">Imagem</label>
      <div class="input input-file">
        <span class="button">
          <input multiple="multiple" accept="image/x-png,image/gif,image/jpeg" @change="appendMedia($event)" type="file" id="file" name="file">
            <i class="fa fa-search"></i> Pesquisar imagens neste computador
        </span>
        <input type="text" :value="selectImageName" placeholder='Clique em "Pesquisar Imagens" para adicionar novas imagens' readonly=""/>
      </div>
    </section>
    </form>
        <div class="superbox">
          <div v-show="showImage" class="superbox-show" style="display: block;max-height:350px;">
            <span>
              <p>
                <button style="margin-bottom:10px" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">
                  <i class="fa fa-external-link"></i> Ver em tela cheia
                </button>
              </p>
            </span>
            <img :src="currentImage.image" height="250px" class="superbox-current-img" style="opacity: 1;">
            <span v-if="$parent.$refs.customFormPersonalData && !$parent.$refs.customFormPersonalData.unidadesDiferentes">
              <p>
                <a @click="deleteImage" class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Excluir</a>
              </p>
            </span>
            <div @click="currentImage = {}" class="superbox-close txt-color-white"><i class="fa fa-times fa-lg"></i></div>
          </div>
          <div v-for="image in imageList" class="superbox-list">
            <img @click="selectImage(image)" :src="image.thumbnail" :data-img="image.thumbnail" class="superbox-img">
          </div>
          <div class="superbox-float"></div>
        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div style="width:95%" class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">Visualizador - Tela Cheia</h4>
              </div>
              <div class="modal-body">
                <img width="100%" :src="currentImage.image"/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">
                  Voltar
                </button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div>
      <!-- /SuperBox -->
  </div>
</template>

<script>
  import Api from './../Api'
  import jquery from 'jquery'
  import {reduce} from 'lodash'
  export default {
    props: {
      formEditable: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      '$route' () {
        this.$forceUpdate()
      }
    },
    created () {
      jquery('.superbox').SuperBox()
      this.readonly = this.formEditable
      this.api = new Api(this, this.basePath)
      this.$root.axios.get(`entry-medias`, {
        params: {
          q: `entry_id:${this.$parent.$refs.customFormPersonalData.id}`,
          sf: `entry_id:=`,
          f: 'id;thumbnail;created_at;updated_at;entry_id'
        }
      }).then(({ data }) => {
        this.imageList = data.data.data
      })
    },
    computed: {
      currentTenant () {
        return localStorage.getItem('current-tenant-idkey')
      },
      showImage () {
        return Object.keys(this.currentImage).length > 0
      }
    },
    data () {
      return {
        readonly: false,
        currentImage: {},
        selectImageName: '',
        imageList: []
      }
    },
    methods: {
      appendMedia (e) {
        // var file = e.target.files[0]

        var chain = new Promise((resolve, reject) => {
          resolve()
        })

        reduce(e.target.files, (chain, file) => {
          chain.then(() => {
            var reader = new FileReader()

            this.selectImageName = file.name

            reader.addEventListener('load', () => {
              this.$root.axios.post('entry-medias', {
                image: reader.result,
                entry_id: this.$parent.$refs.customFormPersonalData.id
              }).then(({data}) => {
                this.$root.axios.get(`entry-medias/${data.data.id}`, {
                  params: {
                    'f': 'entry_id;id;created_at;updated_at;thumbnail'
                  }
                }).then(({data}) => {
                  this.imageList.push(data.data)
                })
              })
            }, false)

            reader.readAsDataURL(file)
          })
          return chain
        }, chain)
      },
      selectImage (img) {
        this.$root.axios.get(`entry-medias/${img.id}`, {
          'f': 'entry_id;id;image;create_at;updated_at'
        }).then(({data}) => {
          this.currentImage = data.data
        })
      },
      deleteImage () {
        this.$root.axios.post(`entry-medias/${this.currentImage.id}`, {
          '_method': 'DELETE'
        }).then(({data}) => {
          this.imageList = this.imageList.filter(e => e.id_key !== this.currentImage.id_key)
          data.type = 'success'
          data.icon = 'trash'
          this.currentImage = {}
          // this.
          this.$root.bus.$emit('show-alert', data)
        })
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
