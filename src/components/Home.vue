<template>
  <div class="home w-full h-px[300]">
    <div class="flex text-center mt-5 border-b-2 border-t-2 border-dashed border-white">
      <div 
        class="container border-r border-l border-dashed border-white pt-4 pb-4"
        :class="(previousCurrencyRates[index] > currencyRates[index]) ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
        v-for="(item, index) in currencyRates" :key="index"
      >
        <h2>{{ currencies[index] }}</h2>
        <h4 class="text-gray-800 font-bold">{{ item }}</h4>
        <h5 class="text-gray-800 font-bold">{{ currencyDifferenceRate[index] }}%</h5>
      </div>
    </div>
    <div class="pr-2 pl-2 pt-1 text-left">
      <span>rates of currencies to turkish lira</span>
      <span class="float-right">last updated: {{lastUpdateDate}}</span>
    </div>
    <div class="absolute top-1/3 w-full">
      <h1><span class="text-red-600 font-extrabold text">w</span>elcome to <span class="text-red-600 font-extrabold">c</span>urrency <span class="text-red-600 font-extrabold">c</span>onverter <span class="text-red-600 font-extrabold">a</span>pp<span class="text-red-600 font-extrabold">.</span></h1>
      <h2 class="mt-5">in this simple app, you can convert currencies<span class="text-red-600 font-extrabold">;</span></h2>
      <h2 class="mt-5">currency rates are refreshed every 60 minutes<span class="text-red-600 font-extrabold">;</span></h2>
      <h2 class="mt-5">supported currencies are<span class="text-red-600 font-extrabold">:</span></h2>
      <h2 class="mt-5 mb-10">usd, eur, gbp, cad, cny, nok<span class="text-red-600 font-extrabold">.</span></h2>
      <router-link to="/currency-converter" class="text-2xl bg-black p-4 rounded-full border-dashed border-white border-2 hover:bg-white hover:text-black hover:border-black">convert now<span class="text-red-600 font-extrabold">.</span></router-link>
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
    currencyDifferenceRate() {
      const temp = [];
      this.currencyRates.forEach((rate,index) => {
        temp.push(((rate - this.previousCurrencyRates[index])*100 / rate).toFixed(4));
      });
      return temp;
    }
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
