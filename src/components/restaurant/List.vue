<template>
  <div class="container">
    <template v-if="restaurants.length">
      <div class="restaurant-list">
        
        <div class="filters">
          <select name="sortBy" @change="handleSortBy(sortType)" v-model="sortType">
            <option value="">Sort by..</option>
            <option v-for="(option, key) in sortOptions" :key="key" :value="key">{{option.text}}</option>
          </select>
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
</template>

<script>
import RestaurantService from '@/services/restaurant.service'
import RestaurantItem from './Item'

export default {
  name: 'RestaurantList',
  components: {
    RestaurantItem
  },
  props: {
    sortByQuery: {
      type: String,
      required: true,
      default: 'nameASC'
    }
  },
  
  data () {
    return {
      restaurants: [],
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

  methods: {
    getList () {
      RestaurantService.query().then(response => {
        this.unsortedData = response.data.data
        this.handleSortBy(false)
      })
    },
    
    handleSortBy (fresh = true) {
      if (this.sortType && this.sortOptions.hasOwnProperty(this.sortType)) {
        const sortOption = this.sortOptions[this.sortType]
        this.restaurants = this[sortOption.method](sortOption.order)
        
        if (fresh) {
          this.$router.push({
            path: '/',
            query: {
              sortBy: this.sortType
            }
          })
        }
      } else {
        this.restaurants = this.unsortedData
      }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.restaurant-list{
  .filters{
    text-align: right;
    margin-bottom: 12px;
  }
}
</style>
