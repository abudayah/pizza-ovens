<template>
  <div class="restaurant-view">
    <template v-if="restaurant">
      {{ restaurant.info.name }}
    </template>
    <template v-else>
      Loading...
    </template>
  </div>
</template>

<script>
import RestaurantService from '@/services/restaurant.service'

export default {
  name: 'restaurant-view',
  mounted () {
    this.getView()
  },
  data () {
    return {
      id: this.$route.params.id,
      restaurant: null
    }
  },
  methods: {
    getView () {
      if (typeof this.id !== 'undefined') {
        RestaurantService.get(this.id).then(response => {
          this.restaurant = response.data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
