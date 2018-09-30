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

<style lang="scss" scoped>
#hero-box{
  height: 130px;
  background: url('../../assets/hero-image.jpg') center center $black;
  background-size: cover;
  margin-bottom: 15px;
  z-index: 1;
  position: relative;
  
  h1{
    color: #fff;
    font-size: 42px;
    margin: 0;
    padding-top: 40px;
    text-shadow: 1px 2px 2px rgba(0,0,0,0.1);
    
    @media(max-width: 768px) {
      text-align: center;
      font-size: 30px;
      padding-top: 48px;
      text-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
  }
}
</style>
