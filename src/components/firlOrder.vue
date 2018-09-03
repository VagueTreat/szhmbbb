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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form :model="OrderForm" status-icon :rules="rules" ref="orderForm" label-width="100px" class="demo-orderForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收获人姓名" style="width:500px" prop="accept_name">
                                        <el-input v-model="OrderForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" style="width:600px" prop="area">
                                        <v-distpicker :province="OrderForm.area.province.value" :city="OrderForm.area.city.value" :area="OrderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" style="width:500px" prop="address">
                                        <el-input v-model="OrderForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" style="width:500px" prop="mobile">
                                        <el-input v-model="OrderForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系号码" style="width:500px" prop="phone">
                                        <el-input v-model="OrderForm.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" style="width:500px" prop="email">
                                        <el-input v-model="OrderForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" style="width:300px" prop="post_code">
                                        <el-input v-model="OrderForm.post_code"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="OrderForm.payment_id" label="6">在线支付</el-radio><span>手续费：0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="labelChange(20)" v-model="OrderForm.express_id" label="1">顺丰快递（20元）</el-radio>
                                        <el-radio @change="labelChange(10)" v-model="OrderForm.express_id" label="2">圆通快递（10元）</el-radio>
                                        <el-radio @change="labelChange(8)" v-model="OrderForm.express_id" label="3">韵达快递（8元）</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in message" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <el-input
                                                    type="textarea"
                                                    :rows="2"
                                                    placeholder="请输入内容"
                                                    v-model="OrderForm.message">
                                                </el-input>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">1</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{OrderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{OrderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{OrderForm.goodsAmount + OrderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="goodSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>

<script>
//引入省级联动的插件
import VDistpicker from "v-distpicker";

export default {
  name: "firlOrder",

  components: { VDistpicker },

  methods: {
    labelChange(price) {
      this.OrderForm.expressMoment = price;
    },
    goodSubmit(){
        this.$axios.post('site/validate/order/setorder',this.OrderForm).then(result=>{
            //判断是不是请求成功
            if(result.data.status == 0){
                //跳转到支付页面
                this.$router.push('/payOrder/'+result.data.message.orderid);
                //删除购物车里面的被购买的数据,因为message里面存有id所以可以直接便利message
                
                
                this.message.forEach(v=>{
                    //调用vuex里面的方法
                    this.$store.commit('delCart',v.id);
                })
                
            }
        })
    }
  },

  created() {
    this.OrderForm.goodsids = this.$route.params.ids;

    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(result => {
          //命名一个变量保存总金额
        let total = 0;
        //保存商品详情数据
        let cargoodsobj = {};
        //设置数量还有金额
        result.data.message.forEach(v => {

          v.buycount = this.$store.state.cartCount[v.id];

          v.totalamount = v.buycount * v.sell_price;

          total += v.totalamount;

          cargoodsobj[v.id] = v.buycount;
        });
        this.OrderForm.goodsAmount = total;

        this.OrderForm.cargoodsobj = cargoodsobj;

        this.message = result.data.message;
      });
  },

  data: function() {
    // 自定义验证的规则 触发验证时 会执行这个函数 手机号验证
    var checkMobile = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error("年龄不能为空"));
      //   }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        //   if (value < 18) {
        //     callback(new Error("必须年满18岁"));
        //   } else {
        //     callback();
        //   }
        // }
        // 定义正则规则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value) == true) {
          // 正确的时候干的事情
          callback();
        } else {
          callback(new Error("你的手机号不对"));
        }
      }, 500);
    };
    // 邮箱
    var checkEmail = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      // console.log(value);
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱"));
        }
      } else {
        callback();
      }
    };
    // 邮编
    var checkPostCode = (rule, value, callback) => {
      if (value.trim().length != 0) {
        // 验证
        // 邮箱的正则
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮编"));
        }
      } else {
        callback();
      }
    };
    return {
      OrderForm: {
        goodsAmount: 0, // 总金额
        expressMoment: 20, // 快递费
        accept_name: "唐先生", // 收货人姓名,
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        }, // 省市区
        address: "中粮商务公园18楼天台", // 详细地址
        mobile: "18888881234", // 手机号
        email: "tangSir@qq.com", // 邮箱
        post_code: "518300", // 邮编,
        payment_id: "6", // 支付方式
        express_id: "1", // 快递
        message: "快点发货,不要用三通一达,记得信息要保密哦",
        goodsids: "", //购买的商品id,
        cargoodsobj: {}, // 购买的商品 id 跟件数的关系
        phone: "1008611" // 联系电话
      },
      // 服务器返回的商品数据
      message: [],

      rules: {
        //   需要跟字段相对应
        accept_name: [
          // required 是否必须  message 提示消息 trigger 触发的方式
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          // min 最短 max 最长 少数民族
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        // 地址的验证规则
        address: [
          {
            required: true,
            message: "请输入地址,没有我送给谁呀",
            trigger: "blur"
          }
        ],
        // 手机号验证
        mobile: [{ validator: checkMobile, trigger: "change" }],
        // 邮箱验证
        email: [{ validator: checkEmail, trigger: "change" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "change" }]
      }
    };
  }
};
</script>

<style>
</style>


