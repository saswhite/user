import Vue from "vue";
import Vuex from "vuex";
import * as type from "../store/mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    point: "",
    list: JSON.parse(localStorage.getItem("userInfo")) || {}
  },
  mutations: {
    [type.GET_POINT](state, value) {
      state.point = value;
    },
    [type.GET_USER_INFO](state, value) {
      console.log(value);
      state.list = value;
    }
  },
  actions: {
    getPoint({ commit }, value) {
      commit(type.GET_POINT, value);
    },
    getUserInfo({ commit }, value) {
      localStorage.setItem("userInfo", JSON.stringify(value));
      commit(type.GET_USER_INFO, value);
    }
  },
  modules: {}
});
