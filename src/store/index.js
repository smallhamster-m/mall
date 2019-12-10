import Vue from 'vue'
import Vuex from 'vuex';

import mutations from "./mutations";
import actions from "./actions";
import state from "./state";
// 安装插件
Vue.use(Vuex)
// 创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store

