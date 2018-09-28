<template>
  <footer id="app-footer">
    <div class="container-wide">
      &copy; Pizza Ovens - Anas Abudayah <a target="_blank" href="http://github.com/abudayah/pizza-ovens">github.com/abudayah</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
#app-footer{
  margin-top: 40px;
  padding: 30px 0;
  text-align: center;
  font-size: 14px;
  border-top: $global-border;
}
</style>
