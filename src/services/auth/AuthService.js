class AuthService {
  constructor () {
    this.authenticated = localStorage.getItem('authenticated') === 'true'
    this.jwt = false
    this.userName = localStorage.getItem('userName')
    this.email = localStorage.getItem('email')
  }

  hasAuthentication () {
    return window.localStorage.getItem('authenticated') === 'true'
  }

  attempt (user, token, component) {
    // let findedUserName = 'Paulo Silva'
    // let findedEmail = '05.paulotarso@gmail.com'

    this.authenticated = true

    component.$store.commit('user/USER_LOGIN', {
      authenticated: true,
      user: user,
      token: token
    })
    // this.userName = findedUserName
    // this.email = findedEmail
  }
  logout () {
    this.authenticated = false
    this.jwt = null
    this.userName = null
    this.email = null
    localStorage.setItem('authenticated', false)
    localStorage.setItem('userName', '')
    localStorage.setItem('email', '')
  }
}

export const auth = new AuthService()

export default {}
