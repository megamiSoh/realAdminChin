<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="logo_img"><img :src="logoImg" /></div>
      <h3 class="title">DESCENTE <i>Training</i></h3>
      <div class="admin_text">관리자 홈페이지</div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <icon-svg icon-class="yonghuming" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="loginForm" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <icon-svg icon-class="mima" />
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="비밀번호" />
        <span class='show-pwd' @click='showPwd'><icon-svg icon-class="yanjing" /></span>
      </el-form-item>
      
      <el-button type="primary" style="width:50%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">로그인</el-button>
    </el-form>

  </div>
</template>

<script>
import logoImg from '@/styles/images/logo.png'
import { isvalidUsername } from '@/utils/validate'
import socialSign from './socialsignin'
export default {
  components: { socialSign },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('올바른 사용자 이름을 입력하십시오.'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('암호는 6 자 이상이어야합니다.'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1234'
      },
      logoImg,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
                // this.showDialog = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
          // const hash = window.location.hash.slice(1)
          // const hashObj = getQueryObject(hash)
          // const originUrl = window.location.origin
          // history.replaceState({}, '', originUrl)
          // const codeMap = {
          //   wechat: 'code',
          //   tencent: 'code'
          // }
          // const codeName = hashObj[codeMap[this.auth_type]]
          // if (!codeName) {
          //   alert('제 3 자 로그인에 실패했습니다.')
          // } else {
          //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
          //     this.$router.push({ path: '/' })
          //   })
          // }
    }
  },
  created() {
        // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#000;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  #app {height: 100%; background-color: #000;}
  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    .logo_img {
      text-align: center;
      img {width: 100px;}
    }
    input {
      background: #fff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 30px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      i{ color: red;}
    }
    .admin_text {
      color: #fff;
      font-weight: bold;
      text-align: center;
      padding: 0 0 10px;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 0 auto;
      text-align: center;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
