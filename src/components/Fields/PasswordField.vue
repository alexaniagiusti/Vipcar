<script>
  import AbstractField from '@/components/Fields/AbstractTextField'

  export default {
    name: 'PasswordField',
    mixins: [AbstractField],
    data () {
      return {
        type: 'password'
      }
    }
  }
</script>
