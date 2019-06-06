export const stateUser = {
  id: window.localStorage.getItem('id'),
  userName: window.localStorage.getItem('userName'),
  email: window.localStorage.getItem('email'),
  authenticated: window.localStorage.getItem('authenticated') === 'true',
  token: window.localStorage.getItem('token'),
  profile: JSON.parse(window.localStorage.getItem('profile'))
}

export default {}
