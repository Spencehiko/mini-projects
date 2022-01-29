<template>
  <div class="home w-full h-px[300]">
    <CurrenciesBar/>
    <div class="absolute top-1/3 w-full">
      <h1><span class="text-red-600 font-extrabold text">w</span>elcome to <span class="text-red-600 font-extrabold">c</span>urrency <span class="text-red-600 font-extrabold">c</span>onverter <span class="text-red-600 font-extrabold">a</span>pp<span class="text-red-600 font-extrabold">.</span></h1>
      <h2 class="mt-5">in this simple app, you can convert currencies<span class="text-red-600 font-extrabold">;</span></h2>
      <h2 class="mt-5">currency rates are refreshed every 60 minutes<span class="text-red-600 font-extrabold">;</span></h2>
      <h2 class="mt-5">supported currencies are<span class="text-red-600 font-extrabold">:</span></h2>
      <h2 class="mt-5 mb-10">usd<span class="text-red-600 font-extrabold">,</span> eur<span class="text-red-600 font-extrabold">,</span> gbp<span class="text-red-600 font-extrabold">,</span> cad<span class="text-red-600 font-extrabold">,</span> cny<span class="text-red-600 font-extrabold">,</span> nok</h2>
      <router-link to="/currency-converter" class="text-2xl bg-black p-4 rounded-full border-dashed border-white border-2 hover:bg-white hover:text-black hover:border-black">convert now<span class="text-red-600 font-extrabold">.</span></router-link>
    </div>
  </div>
</template>

<script>
import CurrenciesBar from './CurrenciesBar.vue'

export default {
  name: 'Home',
  components: {
    CurrenciesBar,
  },
  props: {
  },
  data() {
    return {
    };
  },
  beforeMount() {
    this.$store.dispatch('getCurrencyRates');
  },
  methods: {
  },
  computed: {
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
