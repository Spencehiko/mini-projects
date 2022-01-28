<template>
  <div class="home">
    <div class="w-full flex text-center mt-5 border-b-2 border-t-2 border-solid border-white">
      <div 
        class="container border-r border-l border-dashed border-white"
        :class="(previousCurrencyRates[index] > currencyRates[index]) ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
        v-for="(item, index) in currencyRates" :key="index"
      >
        <h4>{{ currencies[index] }}</h4>
        <p>{{ item }}</p>
      </div>
    </div>
    <div class=" w-full pr-2 pt-1 border-b text-left">
      <span>Rates of Currencies to TRY</span>
      <span class="float-right">Last Updated: {{lastUpdateDate}}</span>
    </div>
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
    currencyRates() {
        return this.$store.getters.currencyRates;
    },
    previousCurrencyRates() {
        return this.$store.getters.previousCurrencyRates;
    },
    lastUpdateDate() {
        return this.$store.getters.lastUpdateDate;
    },
    currencies() {
        return this.$store.state.currencies;
    },
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
