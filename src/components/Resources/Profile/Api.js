import { merge } from 'lodash'

class Api {

  constructor (component, basePath) {
    this.component = component
    this.basePath = basePath
    this.http = this.component.$root.axios
    this.bus = this.component.$root.bus
  }

  find (id, callback) {
    this.http.get(`${this.basePath}/${id}`).then(({ data }) => {
      callback(data)
      this.bus.$emit('refreshed-entry')
    })
  }

  delete (id, callback) {
    let defaultCallback = ({ data }) => {
      let details = merge({ icon: 'trash', type: 'success' }, data)

      if (typeof callback !== 'undefined') {
        callback(details)
      }

      let events = ['deleted', 'show-alert']

      events.forEach((e) => this.bus.$emit(e, details))
    }

    this.http.post(`${this.basePath}/${id}`, {
      '_method': 'DELETE'
    }).then(defaultCallback)
  }

  create (payload, callback) {
    let defaultCallback = ({ data }) => {
      let details = merge({
        icon: 'check',
        url: `${this.basePath}/${data.data.id}/show`,
        type: 'success'
      }, data)

      this.bus.$emit('created-entry', details)

      if (typeof callback !== 'undefined') {
        callback(details)
      }

      this.bus.$emit('show-alert', details)
    }
    // payload['initial_balance'] = payload['initial_balance'].replace(',', '.')
    this.http.post(`${this.basePath}`, payload).then(defaultCallback)
  }

  update (id, payload, callback) {
    let defaultCallback = ({ data }) => {
      let details = merge({
        icon: 'check',
        url: `${this.basePath}/${data.data.id}/show`,
        type: 'success'
      }, data)

      this.bus.$emit('form-saved', details)

      if (callback !== 'undefined') {
        callback(data.data)
      }

      this.bus.$emit('show-alert', details)
    }

    // payload['initial_balance'] = payload['initial_balance'].replace(',', '.')

    this.http.put(`${this.basePath}/${id}`, payload).then(defaultCallback)
  }
  paginated (callback) {
    this.http.get(`${this.basePath}`).then(({ data }) => {
      callback(data.data)
    })
  }

  useSortService (service) {
    this.sortService = service

    return this
  }

  performSearch (params, callback) {
    let parameters = merge(params, this.sortService.getRequestParams() || {})

    this.http.get(`${this.basePath}`, {
      params: parameters
    }).then(({ data }) => {
      callback(data.data)
      this.bus.$emit('searched', data.data)
    })
  }
}

export default Api
