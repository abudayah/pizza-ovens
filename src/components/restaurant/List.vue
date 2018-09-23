<template>
  <div class="list">
    Restaurant List
  </div>
</template>

<script>
import RestaurantService from '@/services/restaurant.service'

export default {
  name: 'RestaurantList',
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
        console.log(response.data.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
