<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <h1 class="page-title txt-color-blueDark"><i class="fa fa-fw fa-cog"></i> 
      Configurações
    </h1>
    <div class="jarviswidget" id="wid-id-5" data-widget-colorbutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-custombutton="false" data-widget-sortable="false">
      <header>
        <h2>Tabela de configurações</h2>
      </header>
      <div>
        <div class="widget-body">
          <div class="tabs-left">
            <ul class="nav nav-tabs tabs-left" id="demo-pill-nav">
              <li class="active">
                <a href="#tab-r1" data-toggle="tab">
                  <span class="badge bg-color-blue txt-color-white">
                    <i class="fa fa-file"></i>
                  </span>
                  Relatórios
                </a>
              </li>
              <li>
                <a href="#tab-r2" data-toggle="tab"><span class="badge bg-color-blue txt-color-white"><i class="fa fa-refresh"></i></span> Macros</a>
              </li>
              <li>
                <a href="#tab-r4" data-toggle="tab"><span class="badge bg-color-blue txt-color-white"><i class="fa fa-file"></i></span> NF-e </a>
              </li>
              <li v-if="false">
                <a href="#tab-r3" data-toggle="tab"><span class="badge bg-color-greenLight txt-color-white">0</span> Item 3</a>
              </li>
            </ul>
            <div class="tab-content col-md-9">
              <div class="tab-pane active" id="tab-r1">
              <form class="form-horizontal">
                <fieldset>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Nome Relatório</label>
                    <div class="col-md-10">
                      <input v-model="name" class="form-control" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Modelo</label>
                    <div class="col-md-10">
                      <input @change="setModel" accept="application/msword" class="form-control" type="file">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Área</label>
                    <div class="col-md-10">
                      <select v-model="type" class="form-control">
                        <option value="ENTRADA">ENTRADA DE VEÍCULOS</option>
                        <option value="SAIDA">SAÍDA DE VEÍCULOS</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-actions">
                    <div class="row">
                      <div class="col-md-12">
                        <button @click.prevent="saveTemplate" class="btn btn-primary" type="submit">
                          <i class="fa fa-check"></i>
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
                <table class="table table-bordered table-hovered">
                  <thead>
                      <tr>
                        <td>
                          RELATÓRIO
                        </td>
                        <td>
                          ÁREA
                        </td>
                        <td>
                          MODELO
                        </td>
                        <td>
                          MODELO ATUAL
                        </td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="template in templates">
                        <td>{{ template.name }}</td>
                        <td>{{ template.description }}</td>
                        <td>
                          <input accept="application/msword" @change="upload($event, template.id)" type="file"/>
                        </td>
                        <td>
                          <a class="btn btn-default" href="#" @click.prevent="seeTemplate(template.id)">
                            <i class="fa fa-info-circle fa-lg"></i> Ver modelo atual
                          </a>

                          <a class="btn btn-danger" href="#" @click.prevent="deleteTemplate(template.id)">
                            <i class="fa fa-trash fa-lg"></i> Apagar Modelo
                          </a>
                        </td>
                      </tr>
                  </tbody>
                  <tfoot>
                    
                  </tfoot>
                </table>
              </div>
              <div class="tab-pane" id="tab-r2">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>ÁREA</th>
                      <th>MACROS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ENTRADA</td>
                      <td>
                        <ul>
                          <li v-for="(value, macro) in macros.entrada">{{ macro }} - <span class="label label-primary">Ex: {{ value }}</span></li>
                          <li>UNIDADELOGADA_RAZAOSOCIAL</li>
                          <li>UNIDADELOGADA_NOMEFANTASIA</li>
                          <li>UNIDADELOGADA_CNPJ</li>
                          <li>UNIDADELOGADA_ENDERECO</li>
                          <li>UNIDADELOGADA_TELEFONE</li>
                          <li>UNIDADEENTRADA_RAZAOSOCIAL</li>
                          <li>UNIDADEENTRADA_NOMEFANTASIA</li>
                          <li>UNIDADEENTRADA_CNPJ</li>
                          <li>UNIDADEENTRADA_ENDERECO</li>
                          <li>UNIDADEENTRADA_TELEFONE</li>

                          <li>FORNECEDOR_NOME</li>
                          <li>FORNECEDOR_CPF_CNPJ</li>
                          <li>FORNECEDOR_IE_RG</li>
                          <li>FORNECEDOR_DATA_NASCIMENTO</li>
                          <li>FORNECEDOR_ESTADO_CIVIL</li>
                          <li>FORNECEDOR_ENDERECORESIDENCIA</li>
                          <li>FORNECEDOR_CELULAR</li>
                          <li>FORNECEDOR_CIDADE</li>
                          <li>FORNECEDOR_BAIRRO</li>
                          <li>FORNECEDOR_CEP</li>
                          
                          <li>VEICULO_NOME</li>
                          <li>VEICULO_MARCA</li>
                          <li>VEICULO_MODELO</li>
                          <li>VEICULO_ANOFABRICACAO</li>
                          <li>VEICULO_ANO</li>
                          <li>VEICULO_COR</li>
                          <li>VEICULO_KM</li>
                          <li>VEICULO_CAMBIO</li>
                          <li>VEICULO_NUMEROPORTAS</li>
                          <li>VEICULO_RENAVAM</li>
                          <li>VEICULO_PLACA</li>
                          <li>VEICULO_CHASSI</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>SAÍDA</td>
                      <td>
                        <ul>
                          <li v-for="(value, macro) in macros.saida">{{ macro }} - <span class="label label-primary">Ex: <span v-html="value"></span></span></li>
                          <li>UNIDADELOGADA_RAZAOSOCIAL</li>
                          <li>UNIDADELOGADA_NOMEFANTASIA</li>
                          <li>UNIDADELOGADA_CNPJ</li>
                          <li>UNIDADELOGADA_ENDERECO</li>
                          <li>UNIDADELOGADA_TELEFONE</li>
                          <li>UNIDADEENTRADA_RAZAOSOCIAL</li>
                          <li>UNIDADEENTRADA_NOMEFANTASIA</li>
                          <li>UNIDADEENTRADA_CNPJ</li>
                          <li>UNIDADEENTRADA_ENDERECO</li>
                          <li>UNIDADEENTRADA_TELEFONE</li>

                          <li>FORNECEDOR_NOME</li>
                          <li>FORNECEDOR_CPF_CNPJ</li>
                          <li>FORNECEDOR_IE_RG</li>
                          <li>FORNECEDOR_DATA_NASCIMENTO</li>
                          <li>FORNECEDOR_ESTADO_CIVIL</li>
                          <li>FORNECEDOR_ENDERECORESIDENCIA</li>
                          <li>FORNECEDOR_CELULAR</li>
                          <li>FORNECEDOR_CIDADE</li>
                          <li>FORNECEDOR_BAIRRO</li>
                          <li>FORNECEDOR_CEP</li>

                          <li>VEICULO_NOME</li>
                          <li>VEICULO_MARCA</li>
                          <li>VEICULO_MODELO</li>
                          <li>VEICULO_ANOFABRICACAO</li>
                          <li>VEICULO_ANO</li>
                          <li>VEICULO_COR</li>
                          <li>VEICULO_KM</li>
                          <li>VEICULO_CAMBIO</li>
                          <li>VEICULO_NUMEROPORTAS</li>
                          <li>VEICULO_RENAVAM</li>
                          <li>VEICULO_PLACA</li>
                          <li>VEICULO_CHASSI</li>
                          <li>VENDA_PRECO</li>
                          <li>VENDA_DESCONTO</li>
                          <li>VENDA_DATA</li>
                          <li>CLIENTE_NOME</li>
                          <li>CLIENTE_CPF</li>
                          <li>CLIENTE_NATURALIDADE</li>
                          <li>CLIENTE_ESTADO_CIVIL</li>
                          <li>CLIENTE_RG</li>
                          <li>CLIENTE_RGDATAEXPEDICAO</li>
                          <li>CLIENTE_ESTADOEXPEDICAO</li>
                          <li>CLIENTE_DATANASCIMENTO</li>
                          <li>CLIENTE_SEXO</li>
                          <li>CLIENTE_ESTADOCIVIL</li>
                          <li>CLIENTE_CNH</li>
                          <li>CLIENTE_NOMEPAI</li>
                          <li>CLIENTE_NOMEMAE</li>
                          <li>CLIENTE_ENDERECORESIDENCIA</li>
                          <li>CLIENTE_CIDADE</li>
                          <li>CLIENTE_BAIRRO</li>
                          <li>CLIENTE_CEP</li>
                          <li>CLIENTE_CELULAR</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tab-pane" id="tab-r4">
              <form class="form-horizontal">
                <fieldset>
                  <div class="form-group">
                    <label class="col-md-2 control-label">Taxa de Imposto (EX: 3%)</label>
                    <div class="col-md-2">
                      <input v-model="icms_rate" class="form-control" type="text">
                    </div>

                    <label class="col-md-2 control-label"> Base Tax ST Reduction EX: (Ex: 10%)</label>
                    <div class="col-md-2">
                      <input v-model="icms_basetax_st_reduction" class="form-control" type="text">
                    </div>

                    <label class="col-md-2 control-label"> ICMS Base Tax Modality (Ex: 1)</label>
                    <div class="col-md-2">
                      <input v-model="icms_basetax_modality" class="form-control" type="text">
                    </div>
                  </div>
                  <!-- #2 -->
                  <div class="form-group">
                    <label class="col-md-3 control-label">ICMS CST (Ex: 3)</label>
                    <div class="col-md-3">
                      <input v-model="icms_cst" class="form-control" type="text">
                    </div>

                    <label class="col-md-3 control-label"> Origem ICMS (Ex: 9)</label>
                    <div class="col-md-3">
                      <input v-model="icms_origin" class="form-control" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label class="col-md-3 control-label">  PIS rate (Ex: 6,50%)</label>
                      <div class="col-md-3">
                        <input v-model="pis_rate" class="form-control" type="text">
                      </div>

                      <label class="col-md-3 control-label">PIS CST (Ex: 12)</label>
                      <div class="col-md-3">
                        <input v-model="pis_cst" class="form-control" type="text">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-group">
                      <label class="col-md-3 control-label">  COFINS rate (Ex: 12.50%)</label>
                      <div class="col-md-3">
                        <input v-model="cofins_rate" class="form-control" type="text">
                      </div>

                      <label class="col-md-3 control-label">COFINS CST (Ex: 1)</label>
                      <div class="col-md-3">
                        <input v-model="cofins_cst" class="form-control" type="text">
                      </div>
                    </div>
                    <button class="btn pull-right btn-success" @click.prevent="save">Salvar</button>
                  </div>
                </fieldset>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
    import { mapState } from 'vuex'

    export default {
      name: 'hello',
      computed: {
        ...mapState({
          authenticated: state => state.user.authenticated,
          token: state => state.user.token,
          profile: state => state.user.profile
        })
      },
      methods: {
        save () {
          this.$root.axios.post('set-nf-config', {
            icms_rate: this.icms_rate,
            icms_basetax_st_reduction: this.icms_basetax_st_reduction,
            icms_basetax_modality: this.icms_basetax_modality,
            icms_cst: this.icms_cst,
            icms_origin: this.icms_origin,
            pis_rate: this.pis_rate,
            pis_cst: this.pis_cst,
            cofins_rate: this.cofins_rate,
            cofins_cst: this.cofins_cst
          }).then(res => {
            alert('Salvo com sucesso')
          }).catch(res => {
            alert('Falha ao salvar')
          })
        },
        setModel (e) {
          var reader = new FileReader()
          var file = e.target.files[0]

          reader.addEventListener('load', () => {
            this.file = reader.result
          }, false)

          reader.readAsDataURL(file)
        },
        saveTemplate (e) {
          this.$root.axios.post('templates', {
            file: this.file,
            name: this.name,
            description: this.type
          }).then(() => {
            this.refresh()
          })
        },
        upload (e, id) {
          var reader = new FileReader()
          var file = e.target.files[0]

          reader.addEventListener('load', () => {
            this.$root.axios.put(`templates/${id}`, {
              image: reader.result
            }).then(({data}) => {
              console.log(data)
            })
          }, false)

          reader.readAsDataURL(file)
        },
        seeTemplate (id) {
          this.$root.axios.get(`templates/${id}`).then(({data}) => {
            var a = document.createElement('a')
            a.download = `${data.data.name}.docx`
            a.href = data.data.file
            a.click()
            if (a.remove) a.remove()
          })
        },
        refresh () {
          this.$root.axios('/templates', {
            params: {
              'f': 'description;id;name;created_at;updated_at'
            }
          }).then(({data}) => {
            this.templates = data.data.data
          })
        },
        deleteTemplate (id) {
          this.$root.axios.delete(`templates/${id}`, {
            params: {
              'method': 'DELETE'
            }
          }).then(() => {
            this.refresh()
          })
        }
      },
      data () {
        return {
          templates: [],
          name: null,
          file: null,
          type: null,
          icms_rate: null,
          icms_basetax_st_reduction: null,
          icms_basetax_modality: null,
          icms_cst: null,
          icms_origin: null,
          pis_rate: null,
          pis_cst: null,
          cofins_rate: null,
          cofins_cst: null,
          macros: []
        }
      },
      mounted () {
        this.$root.axios.get('/macros').then((data) => {
          this.macros = data.data
        })

        this.$root.axios.get('/get-config', {
          params: {
            'icms_rate': 'icms_rate',
            'icms_basetax_st_reduction': 'icms_basetax_st_reduction',
            'icms_basetax_modality': 'icms_basetax_modality',
            'icms_cst': 'icms_cst',
            'icms_origin': 'icms_origin',
            'pis_rate': 'pis_rate',
            'pis_cst': 'pis_cst',
            'cofins_rate': 'cofins_rate',
            'cofins_cst': 'cofins_cst'
          }
        }).then(({data}) => {
          data.forEach(({key, value}) => {
            this[key] = value
          })
        })

        this.refresh()
      }
    }
  </script>
