<template>
  <div>
  <!-- {{ innerValue }} -->
    <section :class="'col ' + wrapperClass">
      <label class="label">
        <i :class="'fa fa-' + icon"></i>
        <span v-if="!loading">{{ label }}</span>
        <span v-else>Carregando, aguarde...</span>
      </label>
      <label :class="{ 'state-error': customError, 'state-success': valid }" class="select">
        <i class="icon-append"></i>
        <select :disabled="readonly||options.length === 0" :name="name" v-model="innerValue">
          <option value=''><== Selecione ==></option>
          <option :value="option.value" v-for="option in options">
            {{ option.label }}
          </option>
        </select>
      </label>
      <span>
        &nbsp;
        <span v-show="customError">
          <i class="fa fa-warning text-danger"></i> {{ customError }}
        </span>
        <span v-show="loading">
          <i class="fa fa-refresh text-success fa-lg fa-spin"></i>
          <span class="text-success">Carrengado...</span>
        </span>
      </span>
    </section>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        default: ''
      },
      usingAsProvider: {
        type: String,
        default: ''
      },
      wrapperClass: {
        type: String,
        default: 'col-lg-12'
      },
      usingAsLabel: {
        type: String
      },
      usingAsValue: {
        type: String
      },
      customError: {
        type: String,
        default: ''
      },
      orderBy: {
        type: String,
        default: null
      },
      readonly: {
        type: Boolean,
        default: false
      },
      valid: {
        type: Boolean,
        default: false
      },
      failed: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      selectOptions: {},
      hasRelated: {
        type: Boolean
      },
      related: {},
      lazy: {
        default: false
      }
    },
    created () {
      this.options = this.selectOptions || []
    },
    data () {
      return {
        loading: null
      }
    },
    computed: {
      innerValue: {
        get () {
          return this.value
        },
        set (value) {
          if (value != null) {
            this.$emit('input', value)
          }
        }
      }
    }
  }
</script>
