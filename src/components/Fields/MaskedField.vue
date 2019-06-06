<script>
  import AbstractField from '@/components/Fields/AbstractTextField'

  export default {
    mixins: [AbstractField],
    data () {
      return {
        type: 'masked-field'
      }
    }
  }
</script>
