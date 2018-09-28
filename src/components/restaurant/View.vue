<template>
  <section class="restaurant-view">
    <template v-if="restaurant">
      
      <div class="container-wide">
        
        <div class="row">
          <div class="col-md-3">
            <div class="box tobeFixed">
              
              <div class="restaurant-details">
                <div class="logo">
                  <ImageWrap :logo_uri="this.restaurant.info.logoUri" :alt="restaurant.info.name" :width="150" :hight="150"/>
                </div>
                <h1>{{ restaurant.info.name }}</h1>
                <p class="categories">{{ categoriesFormatted }}</p>
                <rating-stars :rating='restaurant.rating' />
                <ul class="list-properties">
                  <li>{{addressFormatted}}</li>
                  <li>Avg: 25 mints</li>
                  <li>Delivery: FREE</li>
                </ul>
              </div>
              
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="box">

              <div class="menu-section" v-for="(section, key) in restaurant.sections" :key="key">
                <h2>{{section.name}}</h2>
                <ul class="list">
                  <li class="item d-flex justify-content-between" v-for="item in section.items" :key="item.id">
                    <div class="">
                      <h4>{{item.name}}</h4>
                      <p>{{item.description}}</p>
                    </div>
                    <div class="">
                      <span class="price">{{item.price}}€</span>
                      <button class="btn btn-primary" type="button" name="button" @click="addToCart(item)">+ Add</button>
                    </div>
                  </li>
                </ul>
              </div>
            
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="box tobeFixed">
              <h4 class="title">Order Summery</h4>
              <div v-show="!order_summery.length">You haven't selected anything yet!</div>
              <ul class="order-summery" v-show="order_summery.length">
                <li v-for="(item, key) in order_summery" :key="key">{{item}}</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    
    </template>
    <template v-else>
      <div class="loading"></div>
    </template>
  </section>
</template>

<script>
import ImageWrap from '../common/ImageWrap'
import RatingStars from '../common/Stars'

import Sticky from '@/helpers/sticky'
import RestaurantHelper from '@/helpers/restaurant'
import RestaurantService from '@/services/restaurant.service'

export default {
  name: 'restaurant-view',
  components: {
    RatingStars,
    ImageWrap
  },
  
  mounted () {
    this.getView()
    window.scrollTo(0, 0)
  },
  
  data () {
    return {
      id: this.$route.params.id,
      restaurant: null,
      order_summery: []
    }
  },
  
  computed: {
    addressFormatted () {
      return RestaurantHelper.formatAddress(this.restaurant.address)
    },
    categoriesFormatted () {
      return (this.restaurant.info.categories) ? RestaurantHelper.formatCategories(this.restaurant.info.categories) : ''
    }
  },
  
  methods: {
    getView () {
      if (typeof this.id !== 'undefined') {
        RestaurantService.get(this.id).then(response => {
          this.restaurant = response.data
        }).then(() => {
          Sticky.init()
        })
      }
    },
    addToCart (item) {
      console.log(item.id)
      this.order_summery.push(item.name)
    }
  },
  
  destroyed () {
    Sticky.destroy()
  }
}
</script>

<style lang="scss" scoped>
.restaurant-details{
  text-align: center;
}
.list-properties{
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  
  > li {
    padding: 4px 0
  }
}
.menu-section{
  .section-title{
    color: $red
  }
  .list{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .item {
    border-bottom: $global-border;
    padding: 12px 0;
    transition: all 250ms linear;
    
    &:last-child {
      border: 0 none;
    }
    
    &:hover{
      background-color: $light-gray
    }
    
    h4 {
      margin: 0 0 8px;
    }
    p {
      margin: 0;
      color: #666
    }
    .price {
      padding: 0 12px;
    }
  }
}
.order-summery{
  margin: 0;
  padding: 0;
  list-style: none;
  
  > li {
    border-bottom: 1px dotted #dedede;
    padding: 10px 0;
    
    &:last-child{
      border: 0 none;
    }
  }
}
</style>
