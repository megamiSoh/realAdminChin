<template>
  <div class="components-container">
    <code>
      기준<a class='link-type' href='https://github.com/rowanwins/vue-dropzone'> dropzone </a>패키지 ,I don't know what you say...
    </code>
    <div class="editor-container">
      <dropzone v-on:dropzone-removedFile="dropzoneR" v-on:dropzone-success="dropzoneS" id="myVueDropzone" url="https://httpbin.org/post"></dropzone>
    </div>
  </div>
</template>기준

<script>
import Dropzone from '@/components/Dropzone'

export default {
  components: { Dropzone },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: '성공적으로 업로드 됨', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: '성공적으로 삭제되었습니다.', type: 'success' })
    }
  }
}
</script>


