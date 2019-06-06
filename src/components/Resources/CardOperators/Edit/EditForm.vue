<template>
  <form id="main-form" class="smart-form">
    <fieldset>
      <div class="row">
        <component :is="__fields[0].component" :data-vv-as="__fields[0].label" v-validate="$data[__fields[0]['name'] + '_rule']" :name="__fields[0].name" v-model="$data[__fields[0]['name']]" :icon="__fields[0].icon" :label="__fields[0].label" :placeholder="__fields[0].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[0].name)" :valid="fields.valid(__fields[0].name)" :failed="fields.failed(__fields[0].name)" >
        </component>
      </div>
      <div class="row">
        <component :select-options="[{value: 'true', label: 'SIM'}, {value: 'false', label: 'NÃO'}]" :is="__fields[9].component" :data-vv-as="__fields[9].label" v-validate="$data[__fields[9]['name'] + '_rule']" :name="__fields[9].name" v-model="$data[__fields[9]['name']]" :icon="__fields[9].icon" :label="__fields[9].label" :placeholder="__fields[9].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[9].name)" :valid="fields.valid(__fields[9].name)" :failed="fields.failed(__fields[9].name)" >
          </component>
      </div>
      <div class="row">
        <div class="col col-lg-6">
          <header> <i class="fa fa-dollar"></i> Dédito </header>

          <component :is="__fields[1].component" :data-vv-as="__fields[1].label" v-validate="$data[__fields[1]['name'] + '_rule']" :name="__fields[1].name" v-model="$data[__fields[1]['name']]" :icon="__fields[1].icon" :label="__fields[1].label" :placeholder="__fields[1].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[1].name)" :valid="fields.valid(__fields[1].name)" :failed="fields.failed(__fields[1].name)" >
          </component>
          <component :select-options="[{label: 'Repasse Todo dia', value: 1}, {label: 'Repasse em', value: 2}]" :is="__fields[2].component" :data-vv-as="__fields[2].label" v-validate="$data[__fields[2]['name'] + '_rule']" :name="__fields[2].name" v-model="$data[__fields[2]['name']]" :icon="__fields[2].icon" :label="__fields[2].label" :placeholder="__fields[2].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[2].name)" :valid="fields.valid(__fields[2].name)" :failed="fields.failed(__fields[2].name)" >
          </component>
          <component wrapperClass="col-lg-12" :is="__fields[3].component" :data-vv-as="__fields[3].label" v-validate="$data[__fields[3]['name'] + '_rule']" :name="__fields[3].name" v-model="$data[__fields[3]['name']]" :icon="__fields[3].icon" :label="__fields[3].label" :placeholder="__fields[3].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[3].name)" :valid="fields.valid(__fields[3].name)" :failed="fields.failed(__fields[3].name)" >
            <span slot="complement-message">
              <span v-if="debit_pass_through_type == 1">
                REPASSE TODO <span class="bootstrap-label label-primary">DIA {{ debit_pass_through_day }}</span> DE CADA MÊS
              </span>
              <span v-else-if="debit_pass_through_type == 2">
                REPASSE EM <span class="bootstrap-label label-primary">{{ debit_pass_through_day }} DIAS</span> CORRIDOS APÓS BAIXA DO LANÇAMENTO FINANCEIRO
              </span>
            </span>
          </component>
        </div>
        <div class="col col-lg-6">
          <header> <i class="fa fa-dollar"></i> Crédito </header>
          <component :is="__fields[4].component" :data-vv-as="__fields[4].label" v-validate="$data[__fields[4]['name'] + '_rule']" :name="__fields[4].name" v-model="$data[__fields[4]['name']]" :icon="__fields[4].icon" :label="__fields[4].label" :placeholder="__fields[4].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[4].name)" :valid="fields.valid(__fields[4].name)" :failed="fields.failed(__fields[4].name)">
          </component>
          <component :is="__fields[5].component" :data-vv-as="__fields[5].label" v-validate="$data[__fields[5]['name'] + '_rule']" :name="__fields[5].name" v-model="$data[__fields[5]['name']]" :icon="__fields[5].icon" :label="__fields[5].label" :placeholder="__fields[5].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[5].name)" :valid="fields.valid(__fields[5].name)" :failed="fields.failed(__fields[5].name)">
          </component>
          <component :is="__fields[6].component" :data-vv-as="__fields[6].label" v-validate="$data[__fields[6]['name'] + '_rule']" :name="__fields[6].name" v-model="$data[__fields[6]['name']]" :icon="__fields[6].icon" :label="__fields[6].label" :placeholder="__fields[6].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[6].name)" :valid="fields.valid(__fields[6].name)" :failed="fields.failed(__fields[6].name)">
          </component>
          <component :select-options="[{label: 'Repasse Todo dia', value: 1}, {label: 'Repasse em', value: 2}]" :is="__fields[7].component" :data-vv-as="__fields[7].label" v-validate="$data[__fields[7]['name'] + '_rule']" :name="__fields[7].name" v-model="$data[__fields[7]['name']]" :icon="__fields[7].icon" :label="__fields[7].label" :placeholder="__fields[7].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[7].name)" :valid="fields.valid(__fields[7].name)" :failed="fields.failed(__fields[7].name)">
          </component>
          <component :is="__fields[8].component" :data-vv-as="__fields[8].label" v-validate="$data[__fields[8]['name'] + '_rule']" :name="__fields[8].name" v-model="$data[__fields[8]['name']]" :icon="__fields[8].icon" :label="__fields[8].label" :placeholder="__fields[8].placeholder" :readonly="readonly" :custom-error="errors.first(__fields[8].name)" :valid="fields.valid(__fields[8].name)" :failed="fields.failed(__fields[8].name)">
            <span slot="complement-message">
              <span v-if="credit_pass_through_type == 1">
              REPASSE TODO <span class="bootstrap-label label-primary">DIA {{ credit_pass_through_day }}</span> DE CADA MÊS
              </span>
              <span v-else-if="credit_pass_through_type == 2">
              REPASSE EM <span class="bootstrap-label label-primary">{{ credit_pass_through_day }} DIAS</span> CORRIDOS APÓS BAIXA DO LANÇAMENTO FINANCEIRO
              </span>
            </span>
          </component>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
  import jquery from 'jquery'
  import Api from './../Api'
  import {
    __fields,
    __defaultBasePath
  } from './../metadata'

  export default {
    props: {
      formReadonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      basePath () {
        return __defaultBasePath
      },
      __fields () {
        return __fields
      }
    },
    created () {
      this.$root.axios.get(`${this.basePath}/rules/update`).then(({ data }) => {
        let rules = data.data.rules

        Object.keys(rules).forEach((prop, index) => {
          this[prop + '_rule'] = rules[prop]
        })
      })

      this.readonly = this.formReadonly
      this.api = new Api(this, this.basePath)
      this.id = this.$route.params.id
      this.fetch()
    },
    data () {
      let dynamicData = {}
      __fields.forEach((field) => {
        let ruleKey = `${field.name}_rule`
        dynamicData[field.name] = ''
        dynamicData[ruleKey] = ''
      })

      return {
        id: null,
        readonly: false,
        ...dynamicData
      }
    },
    methods: {
      fetch () {
        this.api.find(this.id, ({ data }) => {
          Object.keys(data).forEach((key) => {
            this[key] = data[key]
          })

          this.clearState()
        })
      },
      clearState () {
        this.errors.clear()
        this.fields.reset()
      },
      update () {
        this.$validator.validateAll().then(() => {
          this.api.update(this.id, this._data, () => {
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
        new Promise((resolve, reject) => {
          this.readonly = false
          resolve(this.readonly)
        }).then((readonly) => {
          !readonly ? jquery('#main-form [type=text]').first().focus() : ''
        })
      }
    }
  }
</script>
