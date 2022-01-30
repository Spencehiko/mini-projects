<template>
    <div>
        <div class="flex text-center mt-5 border-b-2 border-t-2 border-dashed border-white">
            <div 
                class="container border-r border-l border-dashed border-white pt-4 pb-4"
                :class="(previousCurrencyRates[index] > currencyRates[index]) ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
                v-for="(item, index) in currencyRates" :key="index"
            >
                <h2>{{ currencies[index+1] }}</h2>
                <h4 class="text-gray-800 font-bold">{{ item }}</h4>
                <h5 class="text-gray-800 font-bold">{{ currencyDifferenceRate[index] }}%</h5>
            </div>
        </div>
        <div class="pr-2 pl-2 pt-1 text-left">
            <span>rates of currencies to turkish lira</span>
            <span class="float-right">last updated: {{lastUpdateDate}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CurrenciesBar',
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    currencyRates() {
        return this.$store.state.currencyRates?.rates?.filter((curr, index) => index !== 0);
    },
    previousCurrencyRates() {
        return this.$store.state.previousCurrencyRates?.rates?.filter((curr, index) => index !== 0);
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