<template>
  <div class="list">
    <template v-if="restaurants.length">
      <restaurant-item
        v-for="(item, key) in restaurants"
        v-bind:restaurant="item"
        v-bind:key="key">
      </restaurant-item>
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import RestaurantService from '@/services/restaurant.service'
import RestaurantItem from './Item'

export default {
  name: 'RestaurantList',
  components: {
    RestaurantItem
  },
  data () {
    return {
      restaurants: []
    }
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      RestaurantService.query().then(response => {
        this.restaurants = response.data.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
