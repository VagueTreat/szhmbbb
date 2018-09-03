<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images = "images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" @change="handleChange" size="small" :min="0" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add" id="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <!-- 给一个变量，互斥原理 -->
                                        <a href="javascript:;" @click="showDisuess = false" :class="{selected:!showDisuess}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="showDisuess = true" :class="{selected:showDisuess}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-show="!showDisuess" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="showDisuess">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model.trim="commentInfo" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="submitClick" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comment.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comment" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | capitalize}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" @on-change='pageCount' @on-page-size-change='pagesizeCount' show-elevator show-sizer placement="top" :page-size-opts="[5, 6, 8, 10]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | capitalize}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 iview -->
        <BackTop></BackTop>
        <!-- 动画图片 如果数据还们没有请求过来就先不显示img-->
        <img :src="imglist[0].original_path" class="moveImg" v-if="imglist.length != 0" alt="">
    </div>
</template>

<script>
//引入jQuery
import $ from 'jquery';
export default {
  //姓名
  name: "detail",
  data: function() {
    return {
      productId: undefined,
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyCount: "",
      showDisuess: false,
      //放大镜
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      },
      pageNum : 1,
      pageSizeNum : 10,
      comment:[],
      totalCount:0,
      commentInfo:'',  //评论内容

    };
  },
  methods: {
    handleChange() {
    //   console.log("点击啦");
    },
    gotoDetail(){
      this.productId = this.$route.params.id;
      //发起请求
      this.$axios
        .get(
          `/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(result => {
          // console.log(result);
          this.goodsinfo = result.data.message.goodsinfo;
          this.hotgoodslist = result.data.message.hotgoodslist;
          this.imglist = result.data.message.imglist;

          let tem = [];
          this.imglist.forEach(v => {
            tem.push({
              id: v.id,
              url: v.original_path
            });
          });
          this.images.normal_size = tem;
        });
    },
    //获取评论的数据
    getComments(){
        this.$axios.get(`/site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSizeNum}`)
        .then(result=>{
            // console.log(result);
            
            this.comment = result.data.message;
            this.totalCount = result.data.totalcount;
        })
    },
    //分页页码
    pageCount(page){
        this.pageNum = page;
        this.getComments()
    },
    //分页
    pagesizeCount(pagesize){
        this.pageSizeNum = pagesize;
        if(this.pageNum == 1){
            this.getComments();
        } 
    },
    //提交评论
    submitClick(){
        //如果评论的内容为空就弹出这个
        if(this.commentInfo==''){
            this.$Message.warning('请输入评论内容');
        }else{
            this.$axios.post(`/site/validate/comment/post/goods/${this.productId}`,{
            "commenttxt":this.commentInfo  
         }).then(result=>{
             this.$Message.success(result.data.message);
             this.getComments();
             this.commentInfo='';
         })
        }

    },
    //添加到购物车
    cartAdd(){
        if(this.buyCount == 0){
            this.$Message.error('买点呗')
            return
        }
        //获取加入购物车的坐标
        var carCoord = $('#add').offset();
        
        //获取购物车坐标
        var shoppingCoord = $('.icon-cart').offset();
         
        //让图片显示并且加上动画
        $('.moveImg').stop().show().addClass('move').css(carCoord).animate(shoppingCoord,function () { 
            $(this).hide().removeClass('move');
         })

        //  this.$store.commit('increment',1);
        this.$store.commit('addcommint',{
            goodsId:this.productId,
            goodsNum:this.buyCount
        })
    }
  },
  created: function() {
      this.gotoDetail();

      this.getComments();
  },
  watch:{
      $route(){
          this.images.normal_size=[];
          this.gotoDetail();
      }
  }
};
</script>

<style lang='less'>
.tab-content img {
  width: 100%;
  display: block;
}
.tab-content img {
  width: 100%;
  /* 去除图片底部的 间隙 */
  display: block;
}
/* iview的回到顶部 */
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
  
}
//设置要移动图片的样式
.moveImg{
      position: absolute;
      width: 50px;
      height: 50px;
  }
.moveImg.move{
    transition: transform 2s,opacity 1s;
    transform: scale(.2) rotate(7200deg);
    opacity: .2;
}
</style>

