import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spotifyObj: null
  },
  mutations: {
    authSpotify(state,payload){
      state.spotifyObj = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
