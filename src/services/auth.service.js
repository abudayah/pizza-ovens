import { API_URL } from '@/services/api.configs'

const AuthService = {
  requestToken () {
    const token = this.getToken()

    if (!token) {
      return fetch(`${API_URL}/auth`).then(data => {
        return data.json()
      })
    }

    return Promise.resolve({ token: token })
  },

  refreshToken () {
    this.destroyToken()
    return this.requestToken()
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
