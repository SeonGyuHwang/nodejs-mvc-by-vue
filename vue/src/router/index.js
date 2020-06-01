import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import NotFound from '@/pages/common/NotFound'

import Login from '@/pages/auth/Login'

import NaverApi from '@/pages/auth/apis/Naver'
import GoogleApi from '@/pages/auth/apis/Google'

import BoardList from '@/pages/board/List'
import BoardWrite from '@/pages/board/Write'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    { path: '/', name: 'main', component: BoardList },
    { path: '*', name: '404', component: NotFound }

    ,{ path: '/auth/login', name: 'login', component: Login, meta: { loginPath: true } }
    ,{ path: '/auth/callback/naver', name: 'login-naver', component: NaverApi, meta: { loginPath: true, authCallback: true } }
    ,{ path: '/auth/callback/google', name: 'login-google', component: GoogleApi, meta: { loginPath: true, authCallback: true } }

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
    try {
      let dec_userinfo = JSON5.parse(Vue.$phps.Decrypt(Vue.$cookie.get("user_info")))
      if( typeof dec_userinfo === "object" ) store.dispatch('common/setUserInfo', dec_userinfo)
    } catch(e) {
      console.log('decrypt err!')
    }
  }

  if( store.getters['common/getUserInfo'] === null && uriExistsValues.length <= 0 )
    next('/auth/login')

  next()
})

/*router.afterEach((to, from, next) => {

})*/


export default router
