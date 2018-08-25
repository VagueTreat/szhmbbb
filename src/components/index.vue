<template>
  <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemSon , indexSon) in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemSon, indexSon) in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel >
                            <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | capitalize}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in groupDate" :key="item.catetitle">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img :src="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导包
import axios from "axios";

import moment from 'moment';


export default {
  // name: 'index'，
  data: function() {
    return {
      catelist: [], //购物商场
      sliderlist: [], //轮播图
      toplist: [], //右侧栏
      groupDate:[]
    };
  },
  //创建之后
  created: function() {
      //顶部数据
    axios.get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(result => {
        //    console.log(result);
        this.catelist = result.data.message.catelist;
        this.sliderlist = result.data.message.sliderlist;
        this.toplist = result.data.message.toplist;
      });

        //底部数据
        axios.get('http://47.106.148.205:8899/site/goods/getgoodsgroup')
        .then(result=>{
            this.groupDate= result.data.message;
            
        });
  },
  //筛选
  filters: {
    capitalize: function(value) {
      return moment(value).format('YYYY年MM月DD日');
    }   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel img{
    width: 100%;
    height: 100%;
    display: block;
}
 
</style>
