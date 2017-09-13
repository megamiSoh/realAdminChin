<template>
  <div class="components-container">
    <code>여기서 핵심 코드가 사용됩니다.<a class='link-type' href='//github.com/dai-siki/vue-image-crop-upload'> vue-image-crop-upload</a>
    왜냐하면 당신이 사용하고자하는 경우 우선, 또는 공식을 사용하고자하는 경우에만 그것을 vue @ 1 버전을 사용하고, 일곱 가축 등에 결합 된 일부 비즈니스 요구, 등, 그들의 조금 변형component
    </code>

    <pan-thumb :image='image'></pan-thumb>

    <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">아바타 수정
    </el-button>

    <image-cropper :width="300" :height="300" url="https://httpbin.org/post" @close='close' @crop-upload-success="cropSuccess" :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

