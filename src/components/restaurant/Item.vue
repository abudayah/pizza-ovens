<template>
  <router-link class="item row" :to="{ name: 'RestaurantView', params: { id: this.id }}">
    <div class="item--logo">
      <img :src="getlogo" :alt="name">
    </div>
    <div class="item--content">
      <h2>{{ name }}</h2>
      <p>{{ categoriesList }}</p>
      <rating-stars :rating='rating' />
    </div>
  </router-link>
</template>

<script>
import RatingStars from '../common/Stars'

export default {
  name: 'restaurant-item',
  props: {
    id: {
      type: String,
      required: true,
      default: '0'
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    logoUri: {
      type: String,
      required: true,
      default: ''
    },
    categories: {
      type: Array,
      required: true,
      default: () => []
    },
    rating: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  
  components: {
    RatingStars
  },

  computed: {
    getlogo () {
      return this.logoUri
    },
    categoriesList () {
      return (this.categories.length) ? this.categories[0].split(',').map(item => this.ucfirst(item)).join(', ') : ''
    }
  },

  methods: {
    ucfirst (string) {
      return (string.length) ? string.charAt(0).toUpperCase() + string.slice(1) : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  border: 1px solid #ddd;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row;
  text-decoration: none;
  color: #111;
  border-radius: 4px;

  h2{
    margin: 0
  }

  &:hover{
  }

  &--logo{
    flex-flow: column;
    display: flex;
    img {
      max-width: 160px;
    }
  }
  &--content{
    flex-flow: column;
    padding: 10px 15px;
  }
}
</style>
