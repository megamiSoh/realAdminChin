<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header">
        <span style="line-height: 36px;">환경 설정</span>
        <a class='link-type link-title' target="_blank" href='https://segmentfault.com/a/1190000009762198#articleHeader2'>동적 스키닝 튜토리얼</a>
      </div>
      <div class="box-item">
        <span class="field-label">변화:</span>
        <el-switch v-model="theme" on-text="" off-text="">
        </el-switch>
      </div>
    </el-card>

    <div class="block">
      <span class="demonstration">Button: </span>
      <span class="wrapper">
        <el-button type="success">성공</el-button>
        <el-button type="warning">경고</el-button>
        <el-button type="danger">위험</el-button>
        <el-button type="info">정보</el-button>
       </span>
    </div>

    <div class="block">
      <el-tag class='tag-item' v-for="tag in tags" :type="tag.type" :key='tag.type'>
        {{tag.name}}
      </el-tag>
    </div>

    <div class="block">
      <el-alert class='alert-item' title="사본의 성공적인 발표" type="success">
      </el-alert>
      <el-alert class='alert-item' title="메시지 알리미" type="info">
      </el-alert>
      <el-alert class='alert-item' title="알림 경고" type="warning">
      </el-alert>
      <el-alert class='alert-item' title="서류 제출에 대한 잘못된 조언" type="error">
      </el-alert>
    </div>

  </div>
</template>


<script>
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // 스킨버전element-ui css

export default {
  data() {
    return {
      theme: false,
      tags: [
        { name: '태그1', type: '' },
        { name: '태그2', type: 'gray' },
        { name: '태그3', type: 'primary' },
        { name: '태그4', type: 'success' },
        { name: '태그5', type: 'warning' },
        { name: '태그6', type: 'danger' }
      ]
    }
  },
  watch: {
    theme() {
      toggleClass(document.body, 'custom-theme')
    }
  }
}
</script>

<style scoped>
  .box-card{
    width: 400px;
    margin: 20px auto;
  }
  .block{
    padding: 30px 24px;
  }
  .alert-item{
    margin-bottom: 10px;
  }
  .tag-item{
    margin-right: 15px;
  }
  .link-title{
    margin-left:35px;
  }
</style>
