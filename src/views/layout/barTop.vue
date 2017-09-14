<template>
  <el-menu class="bartop" mode="horizontal">
   <div>
      <div class="logo_img"><img :src="logoImg" /></div>
    <h1>DESCENTE <i>TRAINING</i></h1>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
   </div>
    <!-- <levelbar></levelbar> -->
  <!--   <tabs-view></tabs-view> -->
    <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    <screenfull class='screenfull'></screenfull>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">master
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            홈
          </el-dropdown-item>
        </router-link>
        <a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">
          <el-dropdown-item>
            프로젝트 주소
          </el-dropdown-item>
        </a>
        <el-dropdown-item divided><span @click="logout" style="display:block;">로그온 종료</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import logoImg from '@/styles/images/logo.png'
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from 'components/Hamburger'
import Screenfull from 'components/Screenfull'
import ErrorLog from 'components/ErrLog'
import errLogStore from 'store/errLog'
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog
    }
  },
  logoImg,
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// 버그를 피하기 위해 vue-router 객체를 다시 인스턴스화하려면
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bartop {
      height: 50px;
      line-height: 50px;
      border-radius: 0px !important;
      // z-index: 11111;
     background-color: #000;
     .logo_img {
      text-align: center;
      float: left;
      img {width: 100px;}
    }
      .hamburger-container {
          line-height: 58px;
          height: 50px;
          position: absolute;
          background-color: #fff;
          top: 0;
          padding: 0 10px;
          font-weight: normal;
      }
      h1 {margin: 0;
          color: #fff;
          font-weight: normal;
          i {
            color: red;
          }
          }
      .errLog-container {
          display: inline-block;
          position: absolute;
          right: 150px;
      }
      .screenfull {
          position: absolute;
          right: 90px;
          top: 16px;
          color: red;
      }
      .avatar-container {
          height: 50px;
          display: inline-block;
          position: absolute;
          right: 35px;
          top: 0;
          .avatar-wrapper {
              cursor: pointer;
              margin-top: 5px;
              position: relative;
              color: #fff;
              .user-avatar {
                  width: 55px;
                  height: 40px;
                  border-radius: 10px;
              }
              .el-icon-caret-bottom {
                  position: absolute;
                  right: -20px;
                  top: 25px;
                  font-size: 12px;
              }
          }
      }
  }
</style>



