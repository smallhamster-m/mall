import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from "store/index";
import obj from "components/common/toast/index";
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false

// 实例可以作为事件总线
Vue.prototype.$bus = new Vue()

// 安装插件
Vue.use(obj)
// 图片的懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/lazyload/hamster.png')//占位图
})
// 解决移动端延迟300ms
FastClick.attach(document.body)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
