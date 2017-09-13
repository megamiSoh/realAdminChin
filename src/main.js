import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 글로벌filter
import './icons' // icon
import './errorLog'// error log
import './permission' // 권한
import './mock'  // 프로젝트에 대한 모든 요청은 mockj를 사용하여 시뮬레이션합니다.

Vue.use(ElementUI)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
