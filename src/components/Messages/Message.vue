<template>
  <div v-if="show" :class="'alert fade in alert-' + type">
    <button @click.prevent="show = false" class="close">
      ×
    </button>
    <i :class="'fa-fw fa fa-' + icon"></i>
    {{ message }}
    <router-link v-if="url.length" :to="url">Ver registro</router-link>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        message: null,
        type: null,
        url: '',
        icon: null
      }
    },
    name: 'Message',
    created () {
      this.$root.bus.$on('show-alert', (details) => {
        this.show = true
        let keys = Object.keys(details)

        keys.forEach((key) => {
          this[key] = details[key]
        })
      })
      this.$root.bus.$on('deleted', () => {
        this.$root.bus.$emit('close-alert')
      })
      this.$root.bus.$on('close-alert', () => {
        this.show = false
        this.message = null
        this.type = null
        this.url = ''
        this.icon = null
      })
    }
  }
</script>
