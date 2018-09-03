import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

//首页
import Index from './components/index';
//详情页面
import Detail from './components/productDetail';
//购物车页面
import ShoppingCart from './components/ShoppingCart';
//登陆页面
import Login from './components/login';
//订单页面
import Order from './components/firlOrder';
//订单支付页面
import payOrder from './components/payOrder';
//订单支付成功页面
import paySuccess from './components/paySuccess';
//会员中心页面
import userCenter from './components/userCenter';
//订单列表
import OrderList from './components/OrderList';
//订单详情
import orderDetail from './components/orderDetail';


//引入輪播圖插件
import ElementUI from 'element-ui';
//輪播圖插件的樣式
import 'element-ui/lib/theme-chalk/index.css';


//导入axios
import axios from 'axios';
//修改基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//设置axios能够保存cookie，默认是不会保存的
axios.defaults.withCredentials = true;
//添加到vue的原型
Vue.prototype.$axios = axios;


//放大镜的插件
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);


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



//添加购物车插件 从子向父传递数据
import Vuex from 'vuex'
//注册路由
Vue.use(Vuex)
//
const store = new Vuex.Store({
  state: {
    cartCount:JSON.parse(window.localStorage.getItem('goodkey')) || {},
    //定义是不是登陆的变量
    isLogin:false,
    //保存来时的地址
    fromPath:"",
  },
  //
  mutations: {
    addcommint (state,goodsInfo) {
      if(state.cartCount[goodsInfo.goodsId] == undefined){
        //吧数据设置到对象中
        Vue.set(state.cartCount,goodsInfo.goodsId,goodsInfo.goodsNum);
      }else{
        //如果有这个ID了，那就把数量累加进去
        state.cartCount[goodsInfo.goodsId] += goodsInfo.goodsNum
      }
    },
    updateCommit(state,goodsInfo){
      state.cartCount[goodsInfo.goodsId] = goodsInfo.goodsNum;
    },
    delCart(state,goodsId){
      Vue.delete(state.cartCount,goodsId);
    },
    //修改是不是登陆
    isOrLogin(state,isLogin){
      state.isLogin = isLogin;
    }
  },
  //计算数量
  getters: {
    cartNum: state => {
      let num = 0;
      for (const key in state.cartCount) {
          num += state.cartCount[key]
      }
      return num;
    }
  },

})

//把数据保存到localStorage里面
window.onbeforeunload = function () { 
  window.localStorage.setItem("goodkey",JSON.stringify(store.state.cartCount));
 }

//全局
// 注册全局管道
Vue.filter('capitalize', function (value,timeOrder) {
  if(timeOrder == undefined){
    // 返回处理后的值
    return moment(value).format("YYYY年MM月DD日");
  }else{
    return moment(value).format(timeOrder);
  }

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
  {
    path: '/cart',
    component: ShoppingCart
  }, 
  {
    path: '/login',
    component: Login
  },
  {
    path: '/order/:ids',
    component: Order,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
  {
    path: '/payOrder/:id',
    component: payOrder,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
  {
    path: '/paySuccess/:id',
    component: paySuccess,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
  {
    path: '/userCenter',
    component: userCenter,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
  {
    path: '/orderList',
    component: OrderList,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
  {
    path: '/orderDetail/:id',
    component: orderDetail,
    //定义路由的时候可以配置 meta 字段：
    meta: { checkLogin: true }
  }, 
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

//导航守卫
//to 去到哪个页面
//from 从哪个页面过来
router.beforeEach((to, from, next) => {
  //保存来的地址
  store.state.fromPath = from.path;
  //判断是不有这个路由元，是不是为true
  if(to.meta.checkLogin == true){
    axios.get('site/account/islogin').then(result=>{
      if(result.data.code != 'nologin'){
        next()
      }else{
        next('/login');
      }
    })
  }else{
    next()
  }
  
})

new Vue({
  render: h => h(App),
  router,
  store,  
  //生命周期，再最外层这里设置是否登陆的判断
  beforeCreate(){
    axios.get('site/account/islogin').then(result=>{
      if(result.data.code == 'logined'){
        store.state.isLogin = true;
      }
    })
  }
}).$mount('#app')