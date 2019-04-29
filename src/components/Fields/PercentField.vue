<script>
  import AbstractField from '@/components/Fields/AbstractTextField'

  export default {
    name: 'PercentField',
    mixins: [AbstractField],
    data () {
      return {
        type: 'percent'
      }
    },
    computed: {
      innerValue: {
        get () {
          if (this.value.indexOf('%') !== (this.value.length - 1)) {
            return String(this.value) + '%'
          }
          return String(this.value)
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
