import { merge } from 'lodash'

class Api {

  constructor (component) {
    this.component = component
    this.basePath = 'vehicle-sale'
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
        // url: `${this.basePath}/${data.data.id}/show`,
        type: 'success'
      }, data)

      this.bus.$emit('created-entry', details)

      if (typeof callback !== 'undefined') {
        callback(details)
      }

      this.bus.$emit('show-alert', details)
    }

    payload['discount'] = String(payload['discount']).replace('.', '').replace(',', '.')
    this.http.post(`${this.basePath}`, payload).then(defaultCallback)
  }

  update (id, payload, callback) {
    let defaultCallback = ({ data }) => {
      let details = merge({
        icon: 'check',
        // url: `${this.basePath}/${data.data.id}/show`,
        type: 'success'
      }, data)

      this.bus.$emit('form-saved', details)

      if (callback !== 'undefined') {
        callback(data.data)
      }

      this.bus.$emit('show-alert', details)
    }

    this.http.put(`${this.basePath}/${id}`, payload).then(defaultCallback)
  }
  paginated (callback, verified) {
    this.http.get(`${this.basePath}`, {
      params: {
        q: `entry.tenant_id:${localStorage.getItem('current-tenant-idkey')}`,
        sf: 'entry.tenant_id',
        'verified': verified
      }
    }).then(({ data }) => {
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
