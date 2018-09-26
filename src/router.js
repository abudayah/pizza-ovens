import Vue from 'vue'
import Router from 'vue-router'

import RestaurantList from '@/components/restaurant/List'
import RestaurantView from '@/components/restaurant/View'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'RestaurantList',
      component: RestaurantList,
      props: (route) => ({
        sortByQuery: route.query.sortBy,
        filterByCategory: route.query.filterBy
      })
    },
    {
      path: '/restaurant/:id',
      name: 'RestaurantView',
      component: RestaurantView,
      props: true
    }
  ]
})
