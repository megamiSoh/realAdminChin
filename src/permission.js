import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 진행율 표시
import 'nprogress/nprogress.css'// Progress 스타일
import { getToken } from '@/utils/auth' // 승인

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin권한 직접 전달
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// register global progress.
const whiteList = ['/login', '/authredirect']// 화이트 리스트를 리디렉션 하지 마세요
router.beforeEach((to, from, next) => {
  NProgress.start() // 열기Progress
  if (getToken()) { // token이 있는 여부 확인
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) { // 현재 사용자가  user_infp정보를 가져왔는지 확인
        store.dispatch('GetUserInfo').then(res => { // 사용자 정보 가져 오기
          const roles = res.data.role
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 액세스 가능한 라우팅 테이블 생성
            router.addRoutes(store.getters.addRouters) // 접근 가능한 라우팅 테이블을 동적으로 추가
            next({ ...to }) // hack메소드는 addRoutes가 완료되었는지 확인
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        // 동적으로 권한 변경할 필요 없이 권한을 삭제하려면 next()로 직접 수행
        if (hasPermission(store.getters.roles, to.meta.role)) {
          next()//
        } else {
          next({ path: '/401', query: { noGoBack: true }})
        }
        // 삭제가능 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 허용목록에 직접 액세스
      next()
    } else {
      next('/login') // else 모두 로그인페이지로 리디렉션
      NProgress.done() // hash모드에서 수동으로 hash변경 재 리디렉션 afterEach를 트리거 하지 않음 ps：history라인을 삭제 할수 있음.
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 종료Progress
})
