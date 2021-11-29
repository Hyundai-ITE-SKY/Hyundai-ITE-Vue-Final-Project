import Vue from "vue";
import Vuex from "vuex";
import login from "./login";
import product from "./product";
import gnb from "./gnb";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { login, product, gnb },
  plugins: [
    createPersistedState({
      paths: ['product']
    })
  ]
});
