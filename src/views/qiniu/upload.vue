<template>
  <el-upload action="https://upload.qbox.me" :data="dataObj" drag :multiple="true" :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">파일을 여기로 드래그하십시오.，또는<em>업로드를 클릭하십시오.</em></div>
  </el-upload>
</template>


<script>
import { getToken } from '@/api/qiniu'
// 액세스 키, 비밀 키, 양동이 등을 통해 7 개의 가축 토큰을 가져와 토큰을 생성합니다.
// sdk https://developer.qiniu.com/sdk#official-sdk

export default{
  data() {
    return {
      dataObj: { token: '', key: '' },
      image_uri: [],
      fileList: []
    }
  },
  methods: {
    beforeUpload() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          _self._data.dataObj.token = token
          _self._data.dataObj.key = key
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    }
  }
}
</script>
