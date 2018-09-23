import ApiService from '@/services/api.service'
import { API_URL } from '@/services/api.configs'

const RestaurantService = {
  query () {
    return ApiService.get(API_URL + '/restaurants')
  },

  get (id) {

  }
}

export default RestaurantService
