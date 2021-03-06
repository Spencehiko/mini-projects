import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    apiKey: '862817c2e59bad7baf57',
    currencies: [
      'try',
      'usd',
      'eur',
      'gbp',
      'cad',
      'cny',
      'nok',
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
      let rates = [1];
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
        if(differenceInMinutes > 60){
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
      if(state.currencyRates.length){
        return state.currencyRates.rates.filter((curr, index) => index !== 0);
      }
      return [];
    },
    previousCurrencyRates(state) {
      if(state.previousCurrencyRates.length){
        return state.previousCurrencyRates.rates.filter((curr, index) => index !== 0);
      }
      return [];
    },
    lastUpdateDate(state) {
      let date = new Date(state.currencyRates.date);
      date = date.getDate() + '/' +  ("0" + (date.getMonth() + 1)).slice(-2)+ '/' + date.getFullYear() + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2)+ ':' + ("0" + date.getSeconds()).slice(-2)
      return date;
    },
  },
  plugins: [createPersistedState()]
})
export default store