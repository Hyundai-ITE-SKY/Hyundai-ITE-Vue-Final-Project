import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import product from "./product";
import gnb from "./gnb";
import cart from "./cart";
import order from "./order";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { login, product, gnb, cart, order },
  plugins: [
    createPersistedState({
      paths: ['product']
    })
  ]
});
