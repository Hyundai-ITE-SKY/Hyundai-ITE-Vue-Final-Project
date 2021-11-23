import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onTabs: true,
    onProduct: 0,
  },
  getters: {
    getOnTabs(state) {
      return state.onTabs;
    },
    getOnProduct(state) {
      return state.onProduct;
    },
  },
  mutations: {
    setOnTabs(state, payload) {
      state.onTabs = payload;
    },

    setOnProduct(state, payload) {
      state.onProduct = payload;
    },
  },
  actions: {},
  modules: {},
});
