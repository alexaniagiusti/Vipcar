export const actionBreadcrumb = {
  PUSH_BREADCRUMB_ITEM ({ commit }, { stack }) {
    commit('CLEAR_BREADCRUMB')

    stack.forEach((item) => {
      commit('PUSH_BREADCRUMB_ITEM', item)
    })
  },
  POP_BREADCRUMB_ITEM ({ commit }, label) {
    commit('POP_BREADCRUMB_ITEM', label)
  },
  CLEAR_BREADCRUMB () {

  }
}

export default {}
