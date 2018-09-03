<template>
<div v-loading="loading"
    style="width: 100%">
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model="name"  placeholder="请输入用户名"></el-input>
                        <br>
                        <br>
                        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
                        <br>
                        <br>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
export default {
    name:"index",
    data:function () { 
        return{
            name:"",
            password:"",
            loading:false
        }
     },
     methods:{
         login(){
             this.loading = true;
             this.$axios.post('site/account/login',{
                 user_name:this.name,
                 password : this.password
             }).then(result=>{
                 
                 this.loading = false;

                 if(result.data.message == "用户名或密码错误"){
                     this.$message.error(result.data.message);
                 }else{
                    //修改状态
                    this.$store.commit('isOrLogin',true);

                    //跳转回去之前来的页面
                    this.$router.push(this.$store.state.fromPath);
                 }
             })
         },
     }
}
</script>
<style>

</style>


