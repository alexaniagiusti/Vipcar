<template>
  <div v-html="data"></div>
</template>

<script>
export default {

  name: 'ReportsV2',
  mounted () {
    this.$root.axios.get('report-v2-page').then(data => {
      this.data = data.data
    })
  },
  data () {
    return {
      data: ''
    }
  }
}
</script>
