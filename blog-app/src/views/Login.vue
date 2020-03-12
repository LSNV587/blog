<template>
  <div id="login" v-title data-title="登录 - For Fun">
    <img src="../assets/img/pink.jpg" alt="">
    <!--<video preload="auto" class="me-video-player" autoplay="autoplay" loop="loop">
          <source src="../../static/vedio/sea.mp4" type="video/mp4">
      </video>-->
    <div class="me-login-box me-login-box-radius">
      <h1>ForFun 登录</h1>
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" @keyup.enter.native="login" v-model="userForm.password" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        userForm: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            const loginData = {
              account: this.userForm.account,
              password: this.userForm.password
            }
            this.$store.dispatch('LoginByUsername', loginData).then(() => {
              this.$router.go(-1)
            }).catch((error) => {
              if (error !== 'error') {
                this.$message({message: error, type: 'error', showClose: true});
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang='less'>
  #login {
    min-width: 100%;
    min-height: 670px;
    background-color: #FBD6DD;
    img {
      width: 100%
    }
    .me-login-box {
      position: absolute;
      width: 300px;
      height: 260px;
      margin-top: -150px;
      margin-left: -180px;
      left: 50%;
      top:50%;
      padding: 30px;
    }
    .me-login-box-radius {
      border-radius: 10px;
      box-shadow: 0px 0px 1px 1px rgba(76, 152, 24, 1); 
      background-color: #000;
      opacity: 0.4;
    }
    .me-login-box h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
      vertical-align: middle;
      color: #ffffff 
    }
    .me-login-button {
      text-align: center;
    }
    .me-login-button button {
      width: 100%;
   
  }
  
    }
  // .me-video-player {
  //   background-color: transparent;
  //   width: 100%;
  //   height: 100%;
  //   object-fit: fill;
  //   display: block;
  //   position: absolute;
  //   left: 0;
  //   z-index: 0;
  //   top: 0;
  // }
</style>
