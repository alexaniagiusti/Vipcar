<script>
  import AbstractField from '@/components/Fields/AbstractTextField'

  export default {
    mixins: [AbstractField],
    data () {
      return {
        type: 'monetary'
      }
    },
    computed: {
      innerValue: {
        get () {
          return 'R$ ' + String(this.value)
        },
        set (value) {
          let val = value.replace(/[^\d.,]/g, '')

          this.$emit('input', val)
        }
      }
    }
  }
</script>
