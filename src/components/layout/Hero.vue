<template>
  <div id="hero-box" class="container-wide">
    <h1>Berlin, Mitte</h1>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#hero-box{
  height: 130px;
  background: url('../../assets/hero-image.jpg') center center $black;
  margin-bottom: 15px;
  
  h1{
    color: #fff;
    font-size: 42px;
    margin: 0;
    padding-top: 40px;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.4);
  }
}
</style>
