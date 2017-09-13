<template>
  <div class="components-container">
    <div class='component-item'>
      <md-input name="name" v-model="title" required :maxlength="100">
        제목
      </md-input>
      <code class='code-part'>Material Design 적인 input</code>
    </div>

    <div class='component-item'>
      <pan-thumb image='https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'>
        상하이 꽃 바지
      </pan-thumb>
      <code class='code-part'>그림hover효과</code>
    </div>

    <div class='component-item'>
      <el-button v-waves type="primary">물 파급 효과</el-button>
      <code class='code-part'>물 리플 v-directive</code>
    </div>
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'
import PanThumb from '@/components/PanThumb'
import waves from '@/directive/waves.js' // 물 리플 지침

export default {
  components: { MdInput, PanThumb },
  directives: {
    waves
  },
  data() {
    return {
      title: ''
    }
  }
}
</script>

<style scoped>
.component-item{
  margin-top: 100px;
}
.code-part{
  margin-top: 20px;
}
</style>
