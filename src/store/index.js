import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user.js'
import cart from '@/store/modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
