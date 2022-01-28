import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    apiKey: '862817c2e59bad7baf57',
    currencies: [
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
    previousCurrencyRates: [],
    lastUpdateDate: '',
  },
  mutations: {
    async setCurrencyRates(state, newRates) {
      let rates = [];
      newRates.forEach((allRates) => {
        for(let i in allRates){
          rates.push(allRates[i]);
        }
      });
      const data = {
        date: new Date(),
        rates: rates,
      }
      await axios.post(`http://localhost:3001/rates`, data);
      state.currencyRates = data;
    },
  },
  actions: {
    async getCurrencyRates({commit, state}){
      await axios.get(`http://localhost:3001/rates`)
      .then(response => {
        const data = response.data;
        const lastUpdated = new Date(data[data.length-1].date);
        const differenceInMinutes = (new Date().getTime() - lastUpdated.getTime())/(60*1000);
        if(differenceInMinutes > 60 && new Date().getHours() < 21 && new Date().getHours() > 10){
          state.previousCurrencyRates = data[data.length-1];
          let results = [];
          // Since the API is in the free version, we cannot send all 6 currencies together. Maximum is 2 currencies per call.
          axios.get('https://free.currconv.com/api/v7/convert?q=' + state.currenciesWithTRY[0] + ',' + state.currenciesWithTRY[1] + '&compact=ultra&apiKey=' + state.apiKey)
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
        } else {
          state.currencyRates = data[data.length-1];
          state.previousCurrencyRates = data[data.length-2];
        }
      })
    }
  },
  modules: {
  },
  getters: {
    currencyRates(state) {
      return state.currencyRates.rates;
    },
    previousCurrencyRates(state) {
      return state.previousCurrencyRates.rates;
    },
    lastUpdateDate(state) {
      let date = new Date(state.currencyRates.date);
      date = date.getDate() + '/' +  ("0" + (date.getMonth() + 1)).slice(-2)+ '/' + date.getFullYear() + ' ' + ("0" + date.getHours()).slice(-2) + ':' + date.getMinutes() + ':' + date.getSeconds()
      return date;
    },
  },
  plugins: [createPersistedState()]
})
export default store