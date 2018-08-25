import Vue from 'vue';

import App from './App.vue';

import VueRouter from 'vue-router';

//首页
import Index from './components/index';
//详情页面
import Detail from './components/productDetail';

//引入輪播圖插件
import ElementUI from 'element-ui';
//輪播圖插件的樣式
import 'element-ui/lib/theme-chalk/index.css';

//引入固定顶部插件，iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

import moment from "moment";

//注册路由
Vue.use(VueRouter);

//注册插件
Vue.use(ElementUI);

//懒加载
import VueLazyload from 'vue-lazyload';
//注册路由
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  //这里要用模块化导入
  loading: require('./assets/img/dd50fe9822ab0147e7d72836e8bfd071.gif'),
  attempt: 1
})

//全局
// 注册全局管道
Vue.filter('capitalize', function (value) {
  // 返回处理后的值
  return moment(value).format("YYYY年MM月DD日");
})

const routes = [
 
  {
    path: '/index',
    component: Index
  }, 
   //使用重定向来解决
   {
    path: '/',
    // component: Index
    redirect:'/index'
  }, 
  // 调转到详情页面
  {
    path: '/detail/:id',
    component: Detail
  }, 
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')