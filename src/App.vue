<template>
  <div id="pizza-ovens-app">
    <AppHeader/>
    <div class="main-content">
      <Hero/>
      <router-view/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import AppFooter from '@/components/layout/Footer'

export default {
  name: 'app',
  components: {
    AppHeader,
    Hero,
    AppFooter
  }
}
</script>

<style lang="scss">
@import "~normalize.css";
@import "~bootstrap/scss/bootstrap-grid";
@import "~bootstrap/scss/utilities/spacing";

#pizza-ovens-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $black;
  background-color: $light-gray;
  font-size: 14px;
}

a {
  color: $black;
  text-decoration: none;
  
  &:hover{
    text-decoration: underline;
  }
}

input, select {
  border: $global-border;
  padding: 8px 15px;
  width: 100%;
  height: 34px;
  
  &:focus{
    outline: none;
  }
}

.main-content{
  padding: 60px 0 40px;
}
.container-wide{
  padding: 0 30px;
  
  @media(max-width: 768px) {
    padding: 0 15px;
  }
}

.box{
  border: $global-border;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  padding: 15px;
  margin-bottom: 15px;
  
  .title{
    border-bottom: $global-border;
    margin: 0 0 12px;
    padding-bottom: 10px;
  }
}

.list-pips{
  margin: 0;
  padding: 0;
  
  > li {
    display: inline-block;
    
    &::after{
      content: '';
      border-left: 1px solid #ccc;
      height: 12px;
      margin: 0 10px;
      display: inline-block;
      position: relative;
      top: 1px;
    }
    
    &:last-child{
      &::after{
        border: 0 none;
        margin: 0;
      }
    }
  }
}

[data-label] {
  &::before{
    content: attr(data-label);
    font-size: 12px;
    color: #666;
    margin-right: 12px;
  }
}

// Global Price tag
.price{
  color: $green;
  font-weight: bold;
}

// Global buttons style
.btn{
  background-color: #fff;
  color: $black;
  font-weight: bold;
  border: 0 none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 250ms linear;
  
  &-primary{
    background-color: $primary-color;
    color: #fff;
    
    &:hover{
      background-color: darken($primary-color, 8%)
    }
  }
  
  &:focus{
    outline: none;
  }
  &:active{
    position: relative;
    top: 1px
  }
}

// Make anything fixed
.tobeFixed{
  &.fixed{
    @media(min-width: 768px) {
      position: fixed;
      top: 76px; // header hight + padding
    }
  }
}

// Yummy loading block
.loading{
  background: url('./assets/loading.gif') no-repeat center center;
  width: 100%;
  height: 400px;
}
</style>
