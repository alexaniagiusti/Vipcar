<script>
  import AbstractField from '@/components/Fields/AbstractCheckboxField'

  export default {
    name: 'TextField',
    mixins: [AbstractField],
    data () {
      return {
        type: 'checkbox'
      }
    }
  }
</script>
