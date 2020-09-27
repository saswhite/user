import Vue from "vue";
import Vuex from "vuex";
import * as type from "../store/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    point: ""
  },
  mutations: {
    [type.GET_POINT](state, value) {
      state.point = value;
    }
  },
  actions: {
    getPoint({ commit }, value) {
      commit(type.GET_POINT, value);
    }
  },
  modules: {}
});
