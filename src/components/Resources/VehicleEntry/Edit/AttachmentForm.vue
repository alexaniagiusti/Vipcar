<template>
  <div>
    <form @submit.prevent id="main-form" class="smart-form">
    <section>
      <label class="label">Imagem</label>
      <div class="input input-file">
        <span class="button">
          <input @change="appendMedia($event)" type="file" id="file" name="file">
            <i class="fa fa-search"></i> Pesquisar anexos neste computador
        </span>
        <input type="text" :value="selectImageName" placeholder='Clique em "Pesquisar Anexo" para adicionar novos anexos' readonly=""/>
      </div>
    </section>
    </form>
        <div class="superbox">
          <div v-show="showImage" class="superbox-show" style="display: block;max-height:350px;">
            <img :src="currentImage.image" height="250px" class="superbox-current-img" style="opacity: 1;">
            <span>
              <p>
                <a @click="deleteImage" class="btn btn-danger btn-sm"><i class="fa fa-times"></i> Excluir</a>
              </p>
            </span>
            <div @click="currentImage = {}" class="superbox-close txt-color-white"><i class="fa fa-times fa-lg"></i></div>
          </div>
          <div v-for="image in imageList" class="superbox-list">
              <div class="text-center">
                <i :class="'fa text-primary fa-3x fa-' + getExtension(image.title)"></i>
                <br/>
                <a @click.prevent="download(image)" v-bind:ref="'item-' + image.id" href="#">{{ image.title }}</a><br/>
                <a @click.prevent="deleteImage(image.id_key)" class="btn btn-danger" style="margin-top: 5px;padding: 2px;" href="#">
                  <i class="fa fa-trash"></i> Excluir
                </a>
              </div>
              <!-- 
                <img @click="selectImage(image)" :src="image.thumbnail" :data-img="image.thumbnail" class="superbox-img">
               -->
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
      this.$root.axios.get(`entry-attachments`, {
        params: {
          q: `entry_id:${this.$parent.$refs.customFormPersonalData.id}`,
          sf: `entry_id:=`,
          f: 'id;title;content;entry_id;created_at;updated_at',
          o: 'id'
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
      download (image) {
        this.$root.axios.get('entry-attachments/' + image.id).then(({data}) => {
          var a = document.createElement('a')
          a.download = image.title
          a.href = data.data.content
          a.click()
          if (a.remove) a.remove()
        })
      },
      getExtension (title) {
        var lista = {
          'pdf': 'file-pdf-o',
          'doc': 'file-word-o',
          'docx': 'file-word-o',
          'xls': 'file-excel-o',
          'xlsx': 'file-excel-o',
          'mp3': 'file-sound-o',
          'wav': 'file-sound-o',
          'aiff': 'file-sound-o',
          'acc': 'file-sound-o',
          'ogg': 'file-sound-o',
          'wma': 'file-sound-o',
          'flac': 'file-sound-o',
          'pcm': 'file-sound-o',
          'zip': 'file-archive-o',
          'tar': 'file-archive-o',
          '7z': 'file-archive-o',
          'bmp': 'file-image-o',
          'exif': 'file-image-o',
          'gif': 'file-image-o',
          'ico': 'file-image-o',
          'iff': 'file-image-o',
          'jng': 'file-image-o',
          'jpeg': 'file-image-o',
          'jpg': 'file-image-o',
          'jfif': 'file-image-o',
          'pcf': 'file-image-o',
          'pcx': 'file-image-o',
          'psd': 'file-image-o',
          'tiff': 'file-image-o',
          'tif': 'file-image-o',
          'eps': 'file-image-o',
          'svg': 'file-image-o',
          'v2d': 'file-image-o',
          'vnd': 'file-image-o',
          'png': 'file-image-o',
          'webp': 'file-image-o'
        }
        var re = /(?:\.([^.]+))?$/
        var ext = re.exec(title)[1]

        if (Object.keys(lista).includes(ext)) {
          return lista[ext]
        } else {
          return 'file-o'
        }
      },
      appendMedia (e) {
        var reader = new FileReader()
        var file = e.target.files[0]
        this.selectImageName = file.name

        reader.addEventListener('load', () => {
          this.$root.axios.post('entry-attachments', {
            image: reader.result,
            title: file.name,
            entry_id: this.$parent.$refs.customFormPersonalData.id
          }).then(({data}) => {
            this.$root.axios.get(`entry-attachments/${data.data.id}`, {
              params: {
                'f': 'id;title;content;entry_id;created_at;updated_at'
              }
            }).then(({data}) => {
              this.imageList.push(data.data)
            })
          })
        }, false)

        reader.readAsDataURL(file)
      },
      selectImage (img) {
        this.$root.axios.get(`entry-attachments/${img.id}`, {
          'f': 'id;title;content;entry_id;created_at;updated_at'
        }).then(({data}) => {
          this.currentImage = data.data
        })
      },
      deleteImage (idKey) {
        this.$root.axios.post(`entry-attachments/${idKey}`, {
          '_method': 'DELETE'
        }).then(({data}) => {
          this.imageList = this.imageList.filter(e => e.id_key !== idKey)
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
