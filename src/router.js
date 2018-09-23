import Vue from 'vue'
import Router from 'vue-router'

import RestaurantsList from '@/components/restaurant/List'
// import RestaurantsView from '@/components/restaurant/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RestaurantsList',
      component: RestaurantsList
    }
    // {
    //   path: '/restaurant/:id',
    //   name: 'RestaurantView',
    //   component: RestaurantView,
    //   props: true
    // }
  ]
})
