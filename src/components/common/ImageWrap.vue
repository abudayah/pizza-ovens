<template>
  <img
    :src="imageSource"
    :alt="alt"
    :width="width"
    :hight="hight"
    @error="loadDefault"
    :class="{ 'lazy-loaded': lazyLoaded, 'restaurant-logo': true }"
  />
</template>

<script>
export default {
  name: 'ImageWrap',
  props: {
    logo_uri: {
      type: String,
      required: true,
      default: ''
    },
    alt: {
      type: String,
      required: true,
      default: ''
    },
    width: {
      type: Number,
      required: false,
      default: 150
    },
    hight: {
      type: Number,
      required: false,
      default: 150
    }
  },
  
  mounted () {
    this.lazyload()
  },
  
  data () {
    return {
      imageSource: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      lazyLoaded: false
    }
  },
  
  methods: {
    lazyload () {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            this.loadImage(this.$el)
            obs.unobserve(this.$el)
          }
        })
      })
      obs.observe(this.$el)
    },
    
    loadImage () {
      this.imageSource = this.logo_uri
      this.lazyLoaded = true
    },
    
    loadDefault () {
      this.imageSource = `https://via.placeholder.com/${this.width}x${this.hight}/DEDEDE/999999?text=Yummy!`
    }
  }
}
</script>

<style lang="scss" scoped>
.restaurant-logo {
  border-radius: 4px;
  opacity: 0;
  transition: opacity 250ms linear;
  
  &.lazy-loaded{
    opacity: 1;
  }
}
</style>
