<template>
  <header id="app-header" class="">
    <div class="container-wide">
      <div class="d-flex flex-row justify-content-between">
        <div class="align-self-center">
          <router-link class="logo" :to="{ path: '/'}">
            <img src="@/assets/logo-retina.png" alt="PizzaOvens">
          </router-link>
        </div>
        
        <div class="align-self-center">
          <div class="current-address " data-label="DELIVERING TO :">
            <a href="javascript:;">1193 Robson Street, Vancouver V6E 4H6</a>
          </div>
        </div>
        
        <div class="ml-md-auto align-self-center">
          <ul class="list-pips">
            <li><a href="javascipt:;">Account</a></li>
            <li><a href="javascipt:;">Orders</a></li>
            <li><a href="javascipt:;" data-count="3">Cart</a></li>
            <li><a href="javascipt:;">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    logo () {
      return '@/assets/logo.png'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#app-header{
  height: 60px;
  background-color: #fff;
  padding: 12px 0;
  
  .current-address{
    margin-left: 30px;
  }
  
  a {
    color: $black;
    text-decoration: none;
    
    &:hover{
      text-decoration: underline;
    }
  }
  
  .logo{
    display: inline-block;
    
    > img{
      color: #ff6161;
      width: 180px;
    }
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
