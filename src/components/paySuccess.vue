<template>
    <div class="center">
            <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="goodsinfo routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="javascript:;">支付中心</a>
                                </div>
                            </div>
                            <div class="section">
                                <div class="wrapper">
                                    <div class="bg-wrap">
                                        <div class="nav-tit pay">
                                            <a href="javascript:;" class="selected">支付中心</a>
                                        </div>
                                        <div class="msg-tips">
                                            <div class="icon">
                                                <i class="iconfont icon-check"></i>
                                            </div>
                                            <div class="info">
                                                <strong>订单已支付成功！</strong>
                                                <span><span style="font-size:20px;color:red;">{{num}}</span>秒之后跳转</span>
                                                <p>您可以点击这里进入
                                                   <router-link to="/userCenter">会员中心</router-link> 查看订单状态！</p>
                                                <p>如有其它问题，请立即与我们客服人员联系。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    name:"paySuccess",
    data:function () { 
        return{
            num:4
        }
     },
     //再页面渲染完成之后
     mounted(){
         //设置一个倒计时
         let timeId = setInterval(()=>{
             this.num--;
             if(this.num == 0){
                 //如果已经到了0 的话，就跳转到订单详情页面
                    this.$router.push('/orderDetail/'+this.$route.params.id);
                    //清除定时器
                    clearInterval(timeId);
             }
         },1000)
     }
}
</script>
<style>

</style>


