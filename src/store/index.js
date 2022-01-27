import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    apiKey: '862817c2e59bad7baf57',
    currencies: [
      'TRY',
      'USD',
      'EUR',
      'GBP',
      'CAD',
      'CNY',
      'NOK',
    ],
    currenciesWithTRY: [
      'USD_TRY',
      'EUR_TRY',
      'GBP_TRY',
      'CAD_TRY',
      'CNY_TRY',
      'NOK_TRY',
    ],
    currencyRates: [],
  },
  mutations: {
    setCurrencyRates(state, newRates) {
      const rates = [];
      newRates.forEach((allRates) => {
        for(let i in allRates){
          rates[i] = allRates[i];
        }
      });
      const data = {
        date: new Date(),
        rates: rates,
      }
      console.log(data);
      state.currencyRates = data;
    },
  },
  actions: {
    async getCurrencyRates({commit, state}){
      await axios.get(`http://localhost:3001/rates`)
      .then(response => {
        const data = response.data;
        const lastUpdated = new Date(data[data.length-1].date);
        console.log(lastUpdated);
        console.log(new Date().getTime());
      })
      if(state.currencyRates.length === 1){
        let results = [];
        await axios.get('https://free.currconv.com/api/v7/convert?q=' + state.currenciesWithTRY[0] + ',' + state.currenciesWithTRY[1] + '&compact=ultra&apiKey=' + state.apiKey)
        .then(response => {    
          results.push(response.data);            
          axios.get('https://free.currconv.com/api/v7/convert?q=' + state.currenciesWithTRY[2] + ',' + state.currenciesWithTRY[3] + '&compact=ultra&apiKey=' + state.apiKey)
          .then(response => {    
            results.push(response.data);
            axios.get('https://free.currconv.com/api/v7/convert?q=' + state.currenciesWithTRY[4] + ',' + state.currenciesWithTRY[5] + '&compact=ultra&apiKey=' + state.apiKey)
            .then(response => {    
              results.push(response.data);
              commit('setCurrencyRates', results);
            })
          })
        })
        .catch(error => {
            console.log(error);
        })
      }
    },
  },
  modules: {
  },
  getters: {
    currencyRates(state) {
      return state.currencyRates;
    },
  },
  plugins: [createPersistedState()]
})
export default store