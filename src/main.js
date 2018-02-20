import  Vue from 'vue'
import  App from './App.vue'
import  router from './router/index'
import  VueResource from 'vue-resource'
import  store from './vuex/store'
import './common/css/index.styl'
//技术栈:vue+vueresource+vue-router+vuex+stylus+es6+commonJS
//tools:npm vue-cli webstrom webpack express
Vue.use(VueResource)


new Vue({
  el:'#app',
  router,
  store,
  ...App
})
