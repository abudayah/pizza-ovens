<template>
  <router-link class="item" :to="{ name: 'RestaurantView', params: { id: this.id }}">
    <div class="d-flex">
      
      <div class="logo">
        <img :src="getlogo" width="150" :alt="name">
      </div>
      
      <div class="content d-flex flex-column flex-wrap">
        <h2>{{ name }}</h2>
        <p class="categories">{{ categoriesList }}</p>
        <rating-stars :rating='rating' />
        <p v-show="randOffer()" class="badge-discount">50% OFF on all orders</p>
        
        <ul class="list-pips">
          <li>Potsdamer Straße 58, 10785 Berlin</li>
          <li>Avg: 25 mints</li>
          <li>Avg: 25 mints</li>
          <li>Delivery: FREE</li>
        </ul>
      </div>
      
    </div>
  </router-link>
</template>

<script>
import RatingStars from '../common/Stars'
import helpers from '@/helpers'

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
      return (this.categories.length) ? this.categories[0].split(',').map(item => helpers.ucfirst(item)).join(' • ') : ''
    }
  },

  methods: {
    randOffer () {
      return (Math.floor((Math.random() * 99) + 1) % 3 === 0) ? true : false;
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  color: $black;
  border-bottom: $global-border;
  text-decoration: none;
  display: block;
  padding: 12px 0;
  
  .categories{
    margin: 12px 0;
  }
  .content{
    margin-left: 15px;
  }
  img {
    border-radius: 4px;
  }
  
  &:hover{
    background-color: $light-gray
  }
  
  &:last-child{
    border: 0 none;
  }

  h2{
    margin: 0
  }
  
  .list-pips{
    margin-top: auto;
  }
  
  .badge{
    border: 1px solid;
    padding: 1px 3px;
    border-radius: 3px;
    display: inline-block;
    
    &-discount{
      color: red;
    }
  }
}
</style>
