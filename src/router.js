import Vue from 'vue'
import Router from 'vue-router'

import RestaurantList from '@/components/restaurant/List'
import RestaurantView from '@/components/restaurant/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RestaurantList',
      component: RestaurantList
    },
    {
      path: '/restaurant/:id',
      name: 'RestaurantView',
      component: RestaurantView,
      props: true
    }
  ]
})
