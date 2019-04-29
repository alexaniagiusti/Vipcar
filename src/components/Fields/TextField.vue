<script>
  import AbstractField from '@/components/Fields/AbstractTextField'

  export default {
    name: 'TextField',
    mixins: [AbstractField],
    data () {
      return {
        type: 'text'
      }
    }
  }
</script>
