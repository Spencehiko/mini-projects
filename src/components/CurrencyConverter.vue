<template>
  <div class="currencyConverter">
    <h2 class="mt-20">select 2 currencies and convert<span class="text-red-600 font-extrabold">.</span></h2>
    <div class="convertCurrencies flex mt-14 px-40">
      <input
      type="text"
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" v-model="fromCurr">
        <option value="try">try</option>
        <option v-for="(item, index) in currencies" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exchange-alt" class="svg-inline--fa fa-exchange-alt w-6 h-6 m-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"></path>
      </svg>
      <input
      type="text"
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" v-model="toCurr">
        <option value="try">try</option>
        <option v-for="(item, index) in currencies" :key="index" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  props: {
  },
  data() {
    return {
      fromCurr: 'try',
      toCurr: 'usd',
      fromCurrAmount: 0,
      toCurrAmount: 0,
    };
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    currencyRates() {
        return this.$store.getters.currencyRates;
    },
    lastUpdateDate() {
        return this.$store.getters.lastUpdateDate;
    },
    currencies() {
        return this.$store.state.currencies;
    },
  },
  watch: {
    fromCurr(val) {
      console.log(val);
    },
    toCurr(val) {
      console.log(val);
    },
    fromCurrAmount(val) {
      console.log(val);
    },
    toCurrAmount(val) {
      console.log(val);
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
