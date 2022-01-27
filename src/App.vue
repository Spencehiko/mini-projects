<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/currency-converter">Currency Converter</router-link>
  </div>
  <router-view />
  <!-- <div>
    <Home/>
  </div> -->
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
