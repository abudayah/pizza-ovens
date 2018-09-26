<template>
  <div class="box">
    <h3 class="title">Fitler by</h3>
    <ul class="list-filters">
      <li><router-link :to="{ path: '/'}">Show All</router-link></li>
      <li v-for="(category, key) in sortedFilters()" :key="key">
        <router-link :to="{ path: '/', query: { filterBy: category }}">
          {{category}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filters: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  
  methods: {
    sortedFilters () {
      const sortedData = this.filters.sort((a, b) => {
        const valueA = a.toUpperCase()
        const valueB = b.toUpperCase()
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
      })
      
      return sortedData
    }
  }
}
</script>

<style lang="scss" scoped>
.list-filters{
  margin: 15px 0 0;
  padding: 0;
  list-style: none;

  > li {
    margin-bottom: 3px;
    
    a {
      color: #999;
      text-decoration: none;
      display: block;
      padding: 4px 0;
      
      &.is-active{
        color: $black;
        font-weight: bold;
      }
      
      &:hover{
        color: $black
      }
    }
  }
}
</style>
