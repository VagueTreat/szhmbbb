<template>

<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="message.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in message" :key="index">
                                    <td>
                                        <el-switch v-model="item.select" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img width="60px" :src="item.img_url" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td><el-input-number @change="updataCart($event,item.id)" size="mini" :min="1" v-model="item.baycount"></el-input-number></td>
                                    <td>{{item.sell_price*item.baycount}}</td>
                                    <td><el-button type="danger" @click="delCart(item.id)" icon="el-icon-delete" circle></el-button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{goodsCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{goodsPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAnd">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
    data:function () { 
        return{
            message:[],
        }
     },
    created(){
        let cartcount = this.$store.state.cartCount;

        let ids = []

        for (const key in cartcount) {
            ids += key
            ids += ','
        }

        ids = ids.slice(0,-1);
        
        this.$axios.get(`site/comment/getshopcargoods/${ids}`)
        .then(result=>{
            
            result.data.message.forEach(v => {
                v.baycount = cartcount[v.id]
                v.select = true;
            });
            this.message = result.data.message;
        })
        
    },
    computed:{
        goodsCount(){
            let goodscount = 0;
            this.message.forEach((v,i)=>{
                if(v.select == true){
                    goodscount += parseInt(v.baycount);
                }
            });
            return goodscount;
        },
        goodsPrice(){
            let goodsprice = 0;
            this.message.forEach(v=>{
                if(v.select == true){
                    goodsprice += v.sell_price*v.baycount;
                }
            });
            return goodsprice;    
        }

    },
    methods:{
        checkAnd(){
            //如果没有买东西，就弹出一个框框
            if(this.goodscount == 0){
                this.$message.error('买点东西呗！')
            }

            let ids = '';

            this.message.forEach(v=>{
                ids += v.id;
                ids += ','
            })
            ids = ids.slice(0,-1);

            //这里直接跳转，再main页面有导航守卫做判断
            this.$router.push(`/order/${ids}`);

            // else{
            //     this.$axios.get('site/account/islogin')
            //     .then(result=>{
            //         this.loading2 = false;

            //         if(result.data.code == "nologin"){
            //             //如果没有登陆就跳转到登陆页面
            //             this.$router.push('/login')
            //         }else{
            //             //如果登陆了就跳转到结算页面
            //             this.$router.push('/order')
            //         }
                    
            //     })
                
                
                
            // }
        },
        delCart(id){
            console.log(id);
            
            this.$store.commit('delCart',id);

            this.message.forEach((v,i) => {
                if(v.id == id){
                    this.message.splice(i,1);
                }
            });
        },
        updataCart(num,id){
            this.$store.commit('updateCommit',{
                goodsId:id,
                goodsNum:num
            })
        }
    }
}
</script>

<style>

</style>


