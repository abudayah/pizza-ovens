import { API_URL } from '@/services/api.configs'

const AuthService = {
  requestToken () {
    const token = AuthService.getToken()

    if (!token) {
      return fetch(`${API_URL}/auth`).then(data => {
        return data.json()
      })
    }

    return Promise.resolve({ token: token })
  },

  refreshToken () {
    AuthService.destroyToken()
    return AuthService.requestToken()
  },

  getToken () {
    return window.localStorage.getItem('auth_token')
  },

  saveToken (token) {
    window.localStorage.setItem('auth_token', token)
  },

  destroyToken () {
    window.localStorage.removeItem('auth_token')
  }
}

export default AuthService
