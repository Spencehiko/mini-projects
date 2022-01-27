<template>
  <div class="home">
    HOME
    <h1 class="text-3xl font-bold">
      Hello world!
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch('getCurrencyRates');
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  html,body{
    margin: 0;
    padding: 0;
    font-size: 18px;
  }
</style>
