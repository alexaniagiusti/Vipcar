<template>
  <div>
    <section :class="'col ' + wrapperClass">
      <div class="inline-group">
      <label class="toggle">
          {{ label }}
          <input type="checkbox" :name="name" v-model="innerValue">
          <i data-swchon-text="SIM" data-swchoff-text="NÃO"></i>
      </label>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'AbstractField',
    props: {
      mask: {
        type: String
      },
      value: {
        default: ''
      },
      wrapperClass: {
        type: String,
        default: 'col-lg-12'
      },
      customError: {
        type: String,
        default: ''
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
      placeholder: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    },
    created () {
      if (this.name === '') {
        console.warn(`field ${this.label} attribute [name] cannot be undefined`)
      }
    },
    computed: {
      getIcon: function () {
        return this.readonly ? 'fa-ban' : 'fa-edit'
      },
      innerValue: {
        get () {
          return String(this.value)
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
<style type="text/css">
  .smart-form .toggle i {
    content: '' !important;
    position: relative !important;
    top: 4px !important;
    float: right !important;
    width: 49px !important;
    height: 17px !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-radius: 12px !important;
    background: #fff !important;
}
</style>
