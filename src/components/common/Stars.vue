<template>
  <span class="stars">
    {{stars}}<span :style="average">{{stars}}</span>
  </span>
</template>

<script>
export default {
  name: 'rating-stars',
  props: {
    rating: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  
  data () {
    return {
      stars: '★★★★★'
    }
  },

  computed: {
    average () {
      const average = this.rating.average * 2 * 10
      return `width: ${average}%`
    }
  }
}
</script>

<style lang="scss" scoped>
.stars{
  position: relative;
  display: inline-block;
  font-size: 18px;
  color: #ccc;
  cursor: default;
  align-self: flex-start;
  
  > span {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    color: $red;
  }
}
</style>
