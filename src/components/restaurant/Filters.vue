<template>
  <aside id="filters-sidebar" :class="{ fixed: isFixed, box: true }">
    <h3 class="title">Fitler by</h3>
    <ul class="list-filters">
      <li><router-link :to="{ path: '/'}">Show All</router-link></li>
      <li v-for="(category, key) in sortedFilters" :key="key">
        <router-link :to="{ path: '/', query: { filterBy: category }}">
          {{category}}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'Filters',
  props: {
    filters: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  
  data () {
    return {
      isFixed: false,
      fixedStyle: '',
      filterSidebarEl: '',
      filterSidebarElRect: ''
    }
  },
  
  mounted () {
    this.filterSidebarEl = document.getElementById('filters-sidebar')
    this.filterSidebarElRect = this.filterSidebarEl.getBoundingClientRect()
  },
  
  computed: {
    sortedFilters () {
      let unsortedFilters = this.filters
      const sortedData = unsortedFilters.sort((a, b) => {
        const valueA = a.toUpperCase()
        const valueB = b.toUpperCase()
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
      })
      
      return sortedData
    }
  },
  
  methods: {
    // Handle sticky header animation
    handleScroll () {
      this.isFixed = (this.filterSidebarElRect.top <= window.scrollY + 75)
      
      if (this.isFixed) {
        this.filterSidebarEl.style.width = this.filterSidebarElRect.width + 'px'
      }
    }
  },
  created () {
    // throttle used to not call handleScroll function everytime scroll event triggered
    window.addEventListener('scroll', throttle(this.handleScroll, 150))
  },
  destroyed () {
    window.removeEventListener('scroll', throttle(this.handleScroll, 150))
  }
}
</script>

<style lang="scss" scoped>
#filters-sidebar{
  &.fixed{
    position: fixed;
    top: 76px;
  }
}
.list-filters{
  margin: 15px 0 0;
  padding: 0;
  list-style: none;

  > li {
    margin-bottom: 3px;
    
    > a {
      color: #999;
      text-decoration: none;
      display: block;
      padding: 4px 0;
      transition: color 250ms ease;
      
      &:hover{
        color: $black;
      }
      
      &.is-active{
        color: $black;
        font-weight: bold;
      }
    }
  }
}
</style>
