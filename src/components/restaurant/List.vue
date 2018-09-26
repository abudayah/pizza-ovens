<template>
  <div class="container-wide">
    <div class="row">
      <div class="col-md-3">
        
        <template v-if="filters.length">
          <Filters :filters="filters" />
        </template>
        <template v-else>
          Loading...
        </template>
        
      </div>
      <div class="col-md-9">
        <div class="box">
          
          <template v-if="restaurants.length">
            <div class="restaurant-list">
              
              <div class="filters">
                <div class="row">
                  <div class="col-md-9">
                    <div class="results-total">
                      We found <b>{{this.restaurants.length}}</b> restaurant(s) for you
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
              
              <restaurant-item v-for="(item, key) in restaurants"
                :id="item.id"
                :name="item.general.name"
                :logoUri="item.general.logo_uri"
                :categories="item.general.categories"
                :rating="item.rating"
                :key="key">
              </restaurant-item>
              
            </div>
          </template>
          <template v-else>
            Loading...
          </template>
          
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import RestaurantService from '@/services/restaurant.service'
import RestaurantItem from './Item'
import Filters from './Filters'
import helpers from '@/helpers'

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
      restaurants: [],
      response: [],
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
    this.unsortedData = []
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
            item.general.categories[0].split(',').forEach(category => allFilters.push(helpers.ucfirst(category)))
          }
        })
        this.filters = helpers.uniqueArray(allFilters)
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
