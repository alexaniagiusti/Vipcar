<template>
  <div>
    <section :class="'col ' + wrapperClass">
    <!-- {{ value }} -->
      <label class="label">
        <i :class="'fa fa-' + icon"></i> {{ label }}
      </label>
      <label :class="{ 'state-error': customError, 'state-success': valid }" class="input">
        <i :class="getIcon" class="icon-append fa"></i>

        <!-- TEXT FIELD -->
        <input
        v-if="type === 'text'"
        type="text"
        autocomplete="off"
        :name="name"
        :disabled="readonly"
        v-model="innerValue"/>
        <!-- END TEXT FIELD -->

        <!-- PERCENT FIELD -->
        <masked-input
        v-else-if="type === 'percent'"
        type="text"
        autocomplete="off"
        :name="name"
        mask="11\.11\%"
        :disabled="readonly"
        v-model="innerValue"></masked-input>
        <!-- END PERCENT FIELD -->

        <!-- MONETARY FIELD -->
        <input
        v-if="type === 'monetary'"
        type="text"
        autocomplete="off"
        :name="name"
        :disabled="readonly"
        v-model="innerValue"/>
        <!-- END MONETARY FIELD -->

        <!-- MASKED FIELD -->
        <masked-input
        v-else-if="type === 'masked-field'"
        type="text"
        autocomplete="off"
        :name="name"
        :mask="mask"
        :disabled="readonly"
        v-model="innerValue"></masked-input>
        <!-- END MASKED FIELD -->

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
