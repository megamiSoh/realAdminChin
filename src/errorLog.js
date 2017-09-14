import Vue from 'vue'
import errLog from '@/store/errLog'

// 생산 환경 오류 로그
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href)
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}
