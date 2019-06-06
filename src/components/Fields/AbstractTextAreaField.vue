<template>
  <div>
    <section :class="'col ' + wrapperClass">
      <label class="label">
        <i :class="'fa fa-' + icon"></i> {{ label }}
      </label>
      <label :class="{ 'state-error': customError, 'state-success': valid }" class="textarea">
        <i :class="getIcon" class="icon-append fa"></i>

        <!-- TEXT FIELD -->
        <textarea :name="name" :disabled="readonly" v-model="innerValue"></textarea>
        <!-- END TEXT FIELD -->

        <b class="tooltip tooltip-top-right">
          <i class="fa fa-check txt-color-teal"></i> {{ placeholder }}
        </b>
        <span> &nbsp;
          <span v-show="customError">
            <i class="fa text-danger fa-warning"></i> {{ customError }}
          </span>
        </span>
        <span>
          <slot name="complement-message"></slot>
        </span>
      </label>
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
