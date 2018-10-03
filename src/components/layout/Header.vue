<template>
  <header id="app-header">
    <div class="container-wide">
      
      <div class="d-flex flex-row justify-content-between">
        <div class="align-self-center">
          <router-link class="logo" :to="{ path: '/'}">
            <img :src="logo" alt="PizzaOvens">
          </router-link>
        </div>
        
        <div class="align-self-center d-none d-sm-block">
          <div class="current-address" data-label="DELIVERING TO :">
            <a href="javascript:;">1193 Robson Street, Vancouver V6E 4H6</a>
          </div>
        </div>
        
        <div class="ml-md-auto align-self-center d-none d-sm-block">
          <ul class="list-pips">
            <li><a href="javascipt:;">Account</a></li>
            <li><a href="javascipt:;">Orders</a></li>
            <li><a href="javascipt:;" :data-count="cartCount" data-test="cartCount">Cart</a></li>
            <li><a href="javascipt:;">Logout</a></li>
          </ul>
        </div>
        
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      isFixed: false
    }
  },
  computed: {
    logo () {
      return (this.isRetina) ? require('@/assets/logo-retina.png') : require('@/assets/logo.png')
    },
    cartCount () {
      return this.$store.getters.cartCount
    }
  },
  methods: {
    isRetina () {
      return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches)) || (window.devicePixelRatio && window.devicePixelRatio >= 2)) && /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
    }
  }
}
</script>

<style lang="scss" scoped>
#app-header{
  height: 60px;
  background-color: #fff;
  padding: 12px 0;
  position: fixed;
  transition: all 200ms linear;
  width: 100%;
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  .logo{
    display: inline-block;
    
    > img{
      color: #ff6161;
      width: 180px;
    }
  }

  .current-address{
    margin-left: 30px;
  }
}
[data-count] {
  position: relative;
  
  &:hover{
    &::after{
      text-decoration: none
    }
  }
  
  &::after{
    content: attr(data-count);
    background-color: $red;
    color: #fff;
    padding: 1px 3px;
    font-size: 11px;
    position: absolute;
    top: -5px;
    border-radius: 100%;
    z-index: 1;
    right: -7px;
    font-weight: bold;
  }
}
</style>
