import axios from 'axios'
export default {
  loadLatestExchangeRates ({ commit }) {
    commit('SET_LOADING', true)
    axios.get('http://api.nbp.pl/api/exchangerates/tables/a/')
      .then(function (response) {
        commit('SET_DATE', response.data[0].effectiveDate)
        commit('SET_RATES', response.data[0].rates)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {
        commit('SET_LOADING', false)
      })
  },
}