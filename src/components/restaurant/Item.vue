<template>
  <router-link data-test="restaurantItemLink" class="item" :to="{ name: 'RestaurantView', params: { id: this.id }}">
    <div class="row">
      
      <div class="col col-sm-2">
        <ImageWrap :logo_uri="logoUri" :alt="name" :width="150" :hight="150" />
      </div>
      
      <div class="content col-md-10">
        <h2>{{ name }}</h2>
        <p class="categories">{{ categoriesFormatted }}</p>
        <RatingStars :rating='rating' />
        <p v-show="randOffer()" class="badge-discount">50% OFF on all orders</p>
        <ul class="list-pips">
          <li>{{addressFormatted}}</li>
          <li>Avg: 25 mints</li>
          <li>Delivery: FREE</li>
        </ul>
      </div>
      
    </div>
  </router-link>
</template>

<script>
import RatingStars from '@/components/common/Stars'
import ImageWrap from '@/components/common/ImageWrap'

import RestaurantHelper from '@/helpers/restaurant'

export default {
  name: 'RestaurantItem',
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
    },
    address: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  
  components: {
    RatingStars,
    ImageWrap
  },

  computed: {
    addressFormatted () {
      return RestaurantHelper.formatAddress(this.address)
    },
    categoriesFormatted () {
      return (this.categories.length) ? RestaurantHelper.formatCategories(this.categories[0].split(',')) : ''
    }
  },

  methods: {
    // Generate randomly dummy offers
    randOffer () {
      return (Math.floor((Math.random() * 99) + 1) % 3 === 0)
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
  transition: all 250ms linear;
  
  &:hover{
    background-color: $light-gray
  }
  &:last-child{
    border: 0 none;
  }
  
  .categories{
    margin: 12px 0;
  }
  .content{
    display: flex;
    flex-direction: column;
    
    > h2{
      margin: 0
    }
  }
  
  .list-pips{
    margin-top: auto;
  }
  
  .badge{
    &-discount{
      color: red;
    }
  }
}
</style>
