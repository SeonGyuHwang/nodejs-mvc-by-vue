import Vue from 'vue'
import router from '@/router'
import * as t from './types'
import {
  userLoginAPI,
  userLogoutAPI,
  userLoginCheckAPI,
} from "./api";

export default {
  setUserInfo ({ commit }, args) {
    return commit(t.SET_USER_LOGIN, args)
  },
  setContentLoading ({ commit }, bool) {
    return commit(t.SET_CONTENT_LOADING, bool)
  },
  userLoginCheck ({ commit }) {
    if( router.currentRoute.meta.authCallback === true )
      return commit(t.SET_USER_LOGIN_CHECK, true)

    return Promise.resolve()
      .then(() => {
        return userLoginCheckAPI()
      })
      .then((response) => {
        const result = response.data || {}
        commit(t.SET_USER_LOGIN_CHECK, true)

        switch (result.status) {
          case 200:
            if( router.currentRoute.meta.loginPath === true )
              router.push("/")
            break

          case 403:
          default:
            Vue.$cookie.remove("user_info")
            commit(t.SET_USER_LOGIN_FAIL)

            if( router.currentRoute.meta.loginPath !== true )
              router.push("/auth/login")

            break
        }

      })
      .catch((err) => {
        commit(t.SET_USER_LOGIN_CHECK, false)
        throw err
      })
  },
  userLogin ({ commit }, payload) {
    return Promise.resolve()
      .then(() => {
        return userLoginAPI(payload)
      })
      .then((response) => {
        const result = response.data || {}

        commit(t.SET_USER_LOGIN, result.arr.userinfo)
        Vue.$cookie.set("user_info", Vue.$phps.Encrypt(JSON5.stringify(result.arr.userinfo)))

        return router.push(result.url)
      })
      .catch((err) => {
        Vue.$cookie.remove("user_info")
        commit(t.SET_USER_LOGIN_FAIL)
        throw err
      })
  },
  userLogout ({ commit }, payload) {
    return Promise.resolve()
      .then(() => {
        return userLogoutAPI(payload)
      })
      .then(() => {
        Vue.$cookie.remove("user_info")
        commit(t.SET_USER_LOGOUT)

        return router.push("/auth/login")
      })
      .catch((err) => {
        throw err
      })
  }
}
