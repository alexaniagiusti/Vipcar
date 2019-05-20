export const actionUser = {
  logout ({commit}, router) {
    localStorage.setItem('id', '')
    localStorage.setItem('authenticated', false)
    localStorage.setItem('userName', '')
    localStorage.setItem('email', '')
    localStorage.setItem('created_at', '')
    localStorage.setItem('token', '')

    commit('LOGOUT_USER')
    router.push({name: 'Dashboard'})
  },
  login ({commit}, {user, token, profile}) {
    localStorage.setItem('id', user['id'])
    localStorage.setItem('authenticated', true)
    localStorage.setItem('userName', user.name)
    localStorage.setItem('email', user.email)
    localStorage.setItem('created_at', user.created_at)
    localStorage.setItem('token', token)
    localStorage.setItem('profile', JSON.stringify(profile))

    commit('LOGIN_USER', {
      user: user,
      token: token
    })
  }
}

export default {}
