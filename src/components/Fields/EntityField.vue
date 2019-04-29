<script>
  import AbstractField from '@/components/Fields/AbstractSelectField'

  export default {
    mixins: [AbstractField],
    created () {
      if (!this.lazy) {
        this.refreshOptions()
      }

      this.$root.bus.$on(`select-${this.name}-outdated`, (payload) => {
        this.options = []
        this.innerValue = ''
        if (typeof payload.query !== 'undefined') {
          this.refreshOptions(payload.query)
        } else if (typeof payload.option !== 'undefined') {
          this.refreshOptions({
            q: `${payload.related.searchFieldAs}:${payload.option.label}`
          })
        }
      })
    },
    methods: {
      refreshOptions (query = {}) {
        if (this.usingAsLabel !== 'full_name') {
          query.o = this.orderBy || this.usingAsLabel
          query.s = 'asc'
        }

        this.loading = true
        this.$root.axios.get(this.usingAsProvider, {
          params: query
        })
        .then(({ data }) => {
          let tempOptions = data.data.data
          let options = []
          tempOptions.forEach((option) => {
            let tempOption = {
              label: option[this.usingAsLabel],
              value: option[this.usingAsValue]
            }
            options.push(tempOption)
          })
          if (options.length === 1) {
            this.innerValue = options[0].value
          }

          this.options = options
          this.loading = false
        })
      }
    },
    data () {
      return {
        type: 'entity-type',
        options: [],
        customMessage: null
      }
    },
    computed: {
      innerValue: {
        get () {
          return this.value
        },
        set (value) {
          if (value != null) {
            if (this.hasRelated) {
              this.$root.bus.$emit(`select-${this.related.formField}-outdated`, {
                'value': value,
                'related': this.related,
                'option': this.options.filter(option => option.value === value)[0]
              })
            }
            this.$emit('input', value)
          }
        }
      }
    }
  }
</script>
