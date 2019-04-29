<script>
  import AbstractField from '@/components/Fields/AbstractSelectField'

  export default {
    name: 'SelectField',
    mixins: [AbstractField],
    data () {
      return {
        type: 'text',
        options: []
      }
    }
  }
</script>
