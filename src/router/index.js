import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '관리자정보',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    name: '관리자정보',
    // noDropdown: true,
    // children: [{ path: 'index', component: _import('introduction/index'), name: '관리자정보' }]
    children: [
      { path: 'index', component: _import('introduction/index'), name: '관리자 리스트', children: [
        { path: 'index', component: _import('introduction/index'), name: '관리자 등록' }
      ] },
      { path: 'index', component: _import('introduction/index'), name: '관리자 삭제 리스트', children: [
        { path: 'index', component: _import('introduction/index'), name: '관리자 삭제 상세정보' }
      ] }
    ]
  }
]

export default new Router({
  // mode: 'history', //백엔드 지원 가능
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    // name: '운동영상관리',
    icon: 'quanxian',
    // noDropdown: true,
    children: [{ path: 'index', component: _import('permission/index'), name: '운동영상관리' },
      { path: 'index', component: Layout, name: '웜업리스트', children: [
        { path: 'p1', component: Layout, name: '신규등록' },
        { path: 'permission', component: Layout, name: '상세정보' }
      ] },
      { path: 'permission', component: Layout, name: 'Main 운동리스트', children: [
        { path: 'permission', component: Layout, name: '신규등록' },
        { path: 'permission', component: Layout, name: '상세정보' }
      ] },
      { path: 'permission', component: Layout, name: '쿨다운 리스트', children: [
        { path: 'permission', component: Layout, name: '신규등록' },
        { path: 'permission', component: Layout, name: '상세정보' }
      ] },
      { path: 'permission', component: Layout, name: '테마컨텐츠 리스트', children: [
        { path: 'permission', component: Layout, name: '신규등록' },
        { path: 'permission', component: Layout, name: '상세정보' }
      ] },
      { path: 'permission', component: Layout, name: '음원영상 리스트', children: [
        { path: 'permission', component: Layout, name: '신규등록' },
        { path: 'permission', component: Layout, name: '상세정보' }
      ] }
    ]
  },
  // {
  //   path: '/icon',
  //   component: Layout,
  //   icon: 'icons',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: _import('svg-icons/index'), name: 'icons' }]
  // },
  {
    path: 'index',
    component: _import('components/index'),
    name: '컨텐츠관리',
    redirect: 'components/index',
    icon: 'zujian',
    children: [
      { path: 'index', component: _import('components/index'), name: 'Main 배너 리스트 ' },
      { path: 'tinymce', component: _import('components/tinymce'), name: '테마 분류 리스트' }
      // ,
      // { path: 'markdown', component: _import('components/markdown'), name: 'Markdown' },
      // { path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON편집자' },
      // { path: 'dndlist', component: _import('components/dndList'), name: '끌어서 놓기 목록 표시' },
      // { path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane' },
      // { path: 'avatarupload', component: _import('components/avatarUpload'), name: '아바타 업로드' },
      // { path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone' },
      // { path: 'sticky', component: _import('components/sticky'), name: 'Sticky' },
      // { path: 'countto', component: _import('components/countTo'), name: 'CountTo' },
      // { path: 'mixin', component: _import('components/mixin'), name: '위젯' },
      // { path: 'backtotop', component: _import('components/backToTop'), name: '맨 위로' }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    name: 'CS문의하기',
    icon: 'tubiao',
    children: [
      { path: '/charts', component: _import('charts/index'), name: 'CS 리스트', children: [
        { path: 'index', component: _import('charts/keyboard'), name: '회원별 문의내역' },
        { path: 'index', component: _import('charts/keyboard'), name: '회원 별 간략 프로필' },
        { path: 'index', component: _import('charts/keyboard'), name: '회원 별 메모 히스토리' }]
      },
      { path: 'keyboard', component: _import('charts/keyboard'), name: '전달 사항 리스트', children: [
        { path: 'index', component: _import('charts/keyboard'), name: '메시지 리스트' },
        { path: 'index', component: _import('charts/keyboard'), name: '메시지 등록가능', children: [
          { path: 'index', component: _import('charts/keyboard'), name: '예약가능' },
          { path: 'index', component: _import('charts/keyboard'), name: '링크 가능' }]
        }
      ] },
      { path: 'keyboard2', component: _import('charts/keyboard2'), name: 'Push 리스트', children: [
          { path: 'index', component: _import('charts/keyboard2'), name: 'Push 리스트' },
          { path: 'index', component: _import('charts/keyboard2'), name: 'Push 가능' }
      ] }
      // ,
      // { path: 'line', component: _import('charts/line'), name: '꺾은 선형 차트' },
      // { path: 'mixchart', component: _import('charts/mixChart'), name: '혼합 차트' }
    ]
  },
  //    {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '뱃지관리',
  //   icon: 'zonghe',
  //   children: [
  //     {
  //       path: '/example/table',
  //       component: _import('example/table/index'),
  //       redirect: '/example/table/table',
  //       name: '뱃지리스트',
  //       // icon: 'table',
  //       children: [
  //         { path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '신규등록' },
  //         { path: 'dragtable', component: _import('example/table/dragTable'), name: '상세페이지' }
  //         // ,
  //         // { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table내부 편집' },
  //         // { path: 'table', component: _import('example/table/table'), name: '통합table' }
  //       ]
  //     }
  //     // ,
  //     // { path: 'form/edit', icon: 'shouce', component: _import('example/form'), name: '수정Form', meta: { isEdit: true }},
  //     // { path: 'form/create', icon: 'from', component: _import('example/form'), name: '만들기Form' },
  //     // { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab' }
  //   ]
  // },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '뱃지관리',
    icon: 'zonghe',
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/table',
        name: '뱃지리스트',
        // icon: 'table',
        children: [
          { path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '신규등록' },
          { path: 'dragtable', component: _import('example/table/dragTable'), name: '상세페이지' }
          // ,
          // { path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table내부 편집' },
          // { path: 'table', component: _import('example/table/table'), name: '통합table' }
        ]
      }
      // ,
      // { path: 'form/edit', icon: 'shouce', component: _import('example/form'), name: '수정Form', meta: { isEdit: true }},
      // { path: 'form/create', icon: 'from', component: _import('example/form'), name: '만들기Form' },
      // { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab' }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: '회원정보',
    icon: '404',
    children: [
      { path: '401', component: _import('errorPage/401'), name: '회원리스트', children: [
        { path: '401', component: _import('errorPage/404'), name: '회원 상세정보' }
      ] },
      { path: '404', component: _import('errorPage/404'), name: '탈퇴 회원 리스트', children: [
        { path: '404', component: _import('errorPage/401'), name: '탈퇴 회원 상세정보' }
      ] }
      // { path: '401', component: _import('errorPage/401'), name: '401' },
      // { path: '404', component: _import('errorPage/404'), name: '404' }
    ]
  },
  // {
  //   path: '/errlog',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'errlog',
  //   icon: 'bug',
  //   noDropdown: true,
  //   children: [{ path: 'log', component: _import('errlog/index'), name: '오류 로그' }]
  // },
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/download',
  //   name: 'excel',
  //   icon: 'EXCEL',
  //   children: [
  //     { path: 'download', component: _import('excel/index'), name: '수출excel' },
  //     { path: 'download2', component: _import('excel/selectExcel'), name: '선택한 항목 내보내기' },
  //     { path: 'upload', component: _import('excel/uploadExcel'), name: 'upload excel' }
  //   ]
  // },
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'theme',
  //   icon: 'theme',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: _import('theme/index'), name: '가죽 끈' }]
  // },

  { path: '*', redirect: '/404', hidden: true }
]
