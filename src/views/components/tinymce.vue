<template>
  <div class="components-container">
    <code>이 회사는 CMS 시스템의 주요 배경이며 회사는 미디어의 핵심이기도하므로 풍부한 텍스트가 배경의 핵심 기능입니다. 서식있는 텍스트를 선택하는 과정에서 많은 우회로를 잡았고, 시장은 종종 서식있는 텍스트에서 사용되며 기본적으로 사용되며 궁극적으로 선택했습니다.Tinymce<a target='_blank' href='https://segmentfault.com/a/1190000009762198#articleHeader13'> 관련 기사 </a> <a target='_blank' href='https://www.tinymce.com/'> 공식 웹 사이트 </a></code>
    <div>
      <tinymce :height='200' v-model="content"></tinymce>
    </div>
    <div class='editor-content' v-html='content'></div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      content: 'Tinymce'
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


