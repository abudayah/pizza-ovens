<template>
  <div class="item">
    <router-link class="item" :to="{ name: 'RestaurantView', params: { id: restaurant.id }}">
      {{ restaurant.id}}: {{ restaurant.general.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'restaurant-item',
  props: ['restaurant']
}
</script>

<style lang="scss" scoped>

</style>
