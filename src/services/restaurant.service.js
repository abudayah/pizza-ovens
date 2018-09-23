import ApiService from '@/services/api.service'
import { API_URL } from '@/services/api.configs'

const RestaurantService = {
  query () {
    return ApiService.get(API_URL + '/restaurants')
  },

  get (id) {
    return ApiService.get(API_URL + '/restaurants/' + id)
  }
}

export default RestaurantService
