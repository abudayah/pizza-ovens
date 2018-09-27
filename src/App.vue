<template>
  <div id="pizza-ovens-app">
    <Header/>
    <div class="main-content">
      <Hero/>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import Footer from '@/components/layout/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Hero,
    Footer
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
.main-content{
  padding: 60px 0 40px;
}
.container-wide{
  padding: 0 30px;
}
.box{
  border: $global-border;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  padding: 15px;
  
  .title{
    border-bottom: $global-border;
    margin: 0;
    padding-bottom: 10px;
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
</style>
