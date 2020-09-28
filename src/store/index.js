import Vue from "vue";
import Vuex from "vuex";
import * as type from "../store/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    point: "",
    list: {}
  },
  mutations: {
    [type.GET_POINT](state, value) {
      state.point = value;
    },
    [type.GET_USER_INFO](state, value) {
      state.list = value;
    }
  },
  actions: {
    getPoint({ commit }, value) {
      commit(type.GET_POINT, value);
    },
    getUserInfo({ commit }, value) {
      console.log(value);
      commit(type.GET_USER_INFO, value);
    }
  },
  modules: {}
});
