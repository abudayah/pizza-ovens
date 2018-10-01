<template>
  <section class="container-wide">
    <template v-if="restaurants.length">
      <div class="row">
        <div class="col-md-3">
          
          <Filters :filters="filters" />
          
        </div>
        <div class="col-md-9">
          <div class="box">
            <div id="restaurantList" class="restaurant-list">
              
              <div class="filters">
                <div class="row">
                  <div class="col-md-9">
                    <div class="results-total">
                      We found <b>{{restaurants.length}}</b> restaurant(s) for you
                    </div>
                  </div>
                  <div class="col-md-3">
                    <select name="sortBy" @change="sortResults(sortType)" v-model="sortType">
                      <option value="">Sort by..</option>
                      <option v-for="(option, key) in sortOptions" :key="key" :value="key">{{option.text}}</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <RestaurantItem v-for="(item, key) in restaurants"
                :id="item.id"
                :name="item.general.name"
                :logoUri="item.general.logo_uri"
                :categories="item.general.categories"
                :rating="item.rating"
                :address="item.address"
                :key="key">
              </RestaurantItem>
            
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
import RestaurantItem from '@/components/restaurant/Item'
import Filters from '@/components/restaurant/Filters'

import RestaurantHelper from '@/helpers/restaurant'
import RestaurantService from '@/services/restaurant.service'

export default {
  name: 'RestaurantList',
  components: {
    RestaurantItem,
    Filters
  },
  
  props: {
    sortByQuery: {
      type: String,
      required: true,
      default: 'nameASC'
    },
    filterByCategory: {
      type: String,
      required: true,
      default: ''
    }
  },
  
  data () {
    return {
      filters: [],
      response: [],
      restaurants: [],
      unsortedData: [],
      sortType: this.sortByQuery,
      sortOptions: {
        nameASC: {
          text: 'Name: (A-Z)',
          order: 'ASC',
          method: 'sortByName'
        },
        nameDESC: {
          text: 'Name: (Z-A)',
          order: 'DESC',
          method: 'sortByName'
        },
        reviewsDESC: {
          text: 'Reviews: (High - Low)',
          order: 'DESC',
          method: 'sortByReviews'
        },
        reviewsASC: {
          text: 'Reviews: (Low - High)',
          order: 'ASC',
          method: 'sortByReviews'
        }
      }
    }
  },
  
  created () {
    this.getList()
  },
  
  watch: {
    '$route.query': 'filterResults'
  },
  
  methods: {
    getList () {
      RestaurantService.query().then(response => {
        this.response = response
        this.unsortedData = this.response.data.data
        this.getFilters()
        this.filterResults(false)
      })
    },
    
    filterResults (reset = true) {
      if (reset) {
        this.resetResults()
      }
      
      if (this.filterByCategory) {
        let filteredData = this.unsortedData.filter((item, index, self) => {
          return (item.general.categories[0].indexOf(this.$route.query.filterBy.toLowerCase()) >= 0)
        })
        
        this.unsortedData = filteredData
      }
      this.sortResults(false)
    },
    
    sortResults (fresh = true) {
      if (this.sortType && this.sortOptions.hasOwnProperty(this.sortType)) {
        const sortOption = this.sortOptions[this.sortType]
        this.restaurants = this[sortOption.method](sortOption.order)
        
        if (fresh) {
          const route = {
            path: '/',
            query: {
              sortBy: this.sortType
            }
          }
          if (this.filterByCategory.length) {
            route.query.filterBy = this.filterByCategory
          }
          this.$router.push(route)
        }
      } else {
        this.restaurants = this.unsortedData
      }
    },
    
    resetResults () {
      this.unsortedData = this.response.data.data
      window.scrollTo(0, 0)
    },
    
    sortByName (order = 'ASC') {
      const sortedData = this.unsortedData.sort((a, b) => {
        const valueA = a.general.name.toUpperCase()
        const valueB = b.general.name.toUpperCase()
        
        if (order === 'DESC') {
          return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0
        } else {
          return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
        }
      })
      
      return sortedData
    },
    
    sortByReviews (order = 'ASC') {
      const sortedData = this.unsortedData.sort((a, b) => {
        const valueA = a.rating.average
        const valueB = b.rating.average
        
        if (order === 'DESC') {
          return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0
        } else {
          return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
        }
      })
      
      return sortedData
    },
    
    getFilters () {
      if (this.unsortedData) {
        let allFilters = []
        this.unsortedData.forEach(item => {
          if (item.general.categories.length) {
            item.general.categories[0].split(',').forEach(category => allFilters.push(RestaurantHelper.ucfirst(category)))
          }
        })
        this.filters = RestaurantHelper.uniqueArray(allFilters)
      }
    }
    
  }
}
</script>

<style lang="scss" scoped>
.restaurant-list{
  .results-total{
    text-align: left;
    line-height: 34px;
  }
  .filters{
    text-align: right;
    border-bottom: $global-border;
    padding-bottom: 12px;
  }
}
</style>
