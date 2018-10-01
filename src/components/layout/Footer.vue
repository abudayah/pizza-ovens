<template>
  <footer id="app-footer">
    <div class="container-wide">
      &copy; Pizza Ovens - Anas Abudayah <a target="_blank" href="http://github.com/abudayah/pizza-ovens">github.com/abudayah/pizza-ovens</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
#app-footer{
  margin-top: 40px;
  padding: 30px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
  border-top: $global-border;
}
</style>
