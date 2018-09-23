import axios from 'axios'

import AuthService from '@/services/auth.service'

class ApiService {
  constructor () {
    let service = axios.create({})

    service.interceptors.request.use((config) => {
      if (!config.headers.hasOwnProperty('token')) {
        return AuthService.requestToken().then((data) => {
          config.headers.common['token'] = data.token
          AuthService.saveToken(data.token)

          return Promise.resolve(config)
        })
      } else {
        return Promise.resolve(config)
      }
    })

    // Retry if token expired
    service.interceptors.response.use(null, (error) => {
      if (error.config && error.response && error.response.status === 401) {
        return AuthService.refreshToken().then((data) => {
          error.config.headers.token = data.token
          AuthService.saveToken(data.token)

          return service.request(error.config)
        })
      }
    })
    this.service = service
  }

  get (path) {
    return this.service.get(path)
  }
}

export default new ApiService()
