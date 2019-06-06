export const mutationsBreadcrumb = {
  PUSH_BREADCRUMB_ITEM (store, item) {
    store.list.push(item)
  },

  CLEAR_BREADCRUMB (store) {
    store.list = [{
      label: 'Início',
      url: '/',
      icon: 'home'
    }]
  }
}

export default {}
