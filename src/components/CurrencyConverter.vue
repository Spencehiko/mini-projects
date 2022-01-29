<template>
  <div class="currencyConverter">
    <CurrenciesBar/>
    <h2 class="mt-20">select <span class="text-red-600 font-extrabold">2</span> currencies and <span class="text-red-600">convert</span></h2>
    <div class="convertCurrencies flex mt-14 px-40">
      <input
      type="number"
      min="0"
      class="
        mr-10
        ml-5
        flex-auto
        form-control
        block
        w-1/5
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      placeholder="0"
      v-model="fromCurrAmount"
      />
      <select name="fromCurr" id="fromCurr" class="
        mr-10
        flex-none
        form-select 
        appearance-none
        block
        w-1/12
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        cursor-pointer
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" v-model="fromCurr">
        <option v-for="(item, index) in currencies" :key="index" :value="index" :disabled="index === toCurr">
          {{ item }}
        </option>
      </select>
      <svg @click="switchOrder" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange-alt" class="svg-inline--fa fa-exchange-alt w-6 h-6 m-auto cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
      </svg>
      <input
      type="number"
      min="0"
      class="
        mr-10
        ml-10
        flex-auto
        form-control
        block
        w-1/5
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      placeholder="0"
      v-model="toCurrAmount"
      disabled
      />
      <select name="toCurr" id="toCurr" class="
        mr-5
        flex-none
        form-select 
        appearance-none
        block
        w-1/12
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        cursor-pointer
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" v-model="toCurr">
        <option v-for="(item, index) in currencies" :key="index" :value="index" :disabled="index === fromCurr">
          {{ item }}
        </option>
      </select>
    </div>
    <h3 class="mt-20">you can click the button on the <span class="text-red-600">middle</span></h3>
    <h3>to <span class="text-red-600">switch between</span> the selected currencies<span class="text-red-600 font-extrabold">.</span></h3>
  </div>
</template>

<script>
import CurrenciesBar from './CurrenciesBar.vue'

export default {
  name: 'CurrencyConverter',
  components: {
    CurrenciesBar,
  },
  props: {
  },
  data() {
    return {
      fromCurr: 1,
      toCurr: 0,
      fromCurrAmount: 0,
      toCurrAmount: 0,
    };
  },
  beforeMount() {
    this.$store.dispatch('getCurrencyRates');
  },
  methods: {
    updateResult() {
      if(!this.fromCurrAmount){
        this.toCurrAmount = 0;
        this.fromCurrAmount = 0;
        return;
      } 
      if(this.fromCurrAmount < 0){
        this.fromCurrAmount = -this.fromCurrAmount;
        return;
      }
      this.fromCurrAmount = Number(this.fromCurrAmount).toString();
      this.toCurrAmount = this.fromCurrAmount * this.currencyRates[this.fromCurr] / this.currencyRates[this.toCurr];
    },
    switchOrder() {
      const temp = this.fromCurr;
      this.fromCurr = this.toCurr;
      this.toCurr = temp;
      this.updateResult();
    }
  },
  computed: {
    currencyRates() {
        return this.$store.state.currencyRates.rates;
    },
    lastUpdateDate() {
        return this.$store.state.previousCurrencyRates;
    },
    currencies() {
        return this.$store.state.currencies;
    },
  },
  watch: {
    fromCurr() {
      this.updateResult();
    },
    toCurr() {
      this.updateResult();
    },
    fromCurrAmount() {
      this.updateResult();
    },
    toCurrAmount() {
      this.updateResult();
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
