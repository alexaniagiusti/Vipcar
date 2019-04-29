export const mutationsUser = {
  LOGOUT_USER (state) {
    state.userName = null
    state.email = null
    state.created_at = null
    state.token = null
    state.authenticated = false
  },
  LOGIN_USER (state, {user, token}) {
    state.userName = user.name
    state.email = user.email
    state.token = token
    state.authenticated = true
  }
}

export default {}
