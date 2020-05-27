import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import NotFound from '@/components/common/NotFound'

import Login from '@/components/auth/Login'

import NaverApi from '@/components/auth/apis/Naver'
import GoogleApi from '@/components/auth/apis/Google'

import BoardList from '@/components/board/List'
import BoardWrite from '@/components/board/Write'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    { path: '/', name: 'main', component: BoardList },
    { path: '*', name: '404', component: NotFound }

    ,{ path: '/auth/login', name: 'login', component: Login, meta: { loginPath: true } }
    ,{ path: '/auth/callback/naver', name: 'login-naver', component: NaverApi, meta: { loginPath: true } }
    ,{ path: '/auth/callback/google', name: 'login-google', component: GoogleApi, meta: { loginPath: true } }

    ,{ path: '/board', component: BoardList, children: [
        { path: '', name: 'board-default', component: BoardList },
        { path: 'write', name: 'board-write', component: BoardWrite },
        { path: 'write/:id', name: 'board-modify', component: BoardWrite }
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  let uriExistsValues = to.fullPath.split('/').filter( n => {
    return store.getters['common/getExcludePath'].includes(n);
  });

  if( Vue.$cookie.get("user_info") && store.getters['common/getUserInfo'] === null ) {
    let dec_userinfo = JSON5.parse(Vue.$phps.Decrypt(Vue.$cookie.get("user_info")))
    if( typeof dec_userinfo === "object" ) store.dispatch('common/setUserInfo', dec_userinfo)
  }

  if( store.getters['common/getUserInfo'] === null && uriExistsValues.length <= 0 )
    next('/auth/login')
  else if( store.getters['common/getUserInfo'] === "object" && to.meta.loginPath === true )
    next('/')

  next()
})

/*router.afterEach((to, from, next) => {

})*/


export default router
