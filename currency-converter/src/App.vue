<template>
  <div class="bg-gray-800 text-white h-full min-h-screen relative">
    <div id="nav">
      <router-link to="/">home</router-link> |
      <router-link to="/currency-converter">currency converter</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
