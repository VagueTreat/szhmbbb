import Vue from 'vue';

import App from './App.vue';

import VueRouter from 'vue-router';

import Index from './components/index';

//引入輪播圖插件
import ElementUI from 'element-ui';
//輪播圖插件的樣式
import 'element-ui/lib/theme-chalk/index.css';

//注册路由
Vue.use(VueRouter);

//注册插件
Vue.use(ElementUI);

const routes = [
  //使用重定向来解决
  {
    path: '/',
    // component: Index
    redirect:'/index'
  }, 
  {
    path: '/index',
    component: Index
  }, 
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')