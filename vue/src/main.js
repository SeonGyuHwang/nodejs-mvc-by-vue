/**
 * 필수 컴포넌트
 */
import Vue from 'vue'
import {mapActions, mapState} from "vuex";
import App from './App'
import { sync } from 'vuex-router-sync'
import router from '@/router'
import store from "@/store"

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Body from '@/components/common/Body'
import Paging from '@/components/common/Paging'

/**
 * 플러그인
 */
import LoadScript from 'vue-plugin-load-script'
import VueHead from 'vue-head'
import VueCookies from 'vue-cookies'
import Loading from 'vue-loading-overlay'
import { VclTable } from 'vue-content-loading'
import axios from 'axios'
import json5 from "json5";
import moment from "moment"

import "bootstrap"
import "@/assets/vendor/plugins/jquery-ui.min"
import "chart.js"
import "@/assets/vendor/jquery-easing/jquery.easing.min"
import "@/assets/vendor/sb-admin/sb-admin.min"

import "@/assets/js/func"
import "@/assets/js/socket"

import "@/assets/js/common_init"

import phps from "@/shared/common/phps"

window.moment = moment;
window.axios = axios;
window.JSON5 = json5;

Vue.$phps = Vue.prototype.$phps = phps
Vue.$cookie = Vue.prototype.$cookie = VueCookies

Vue.config.productionTip = true

Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-body', Body)
Vue.component('app-paging', Paging)
Vue.component('vcl-table', VclTable)

sync(store, router)
Vue.use(VueHead);
Vue.use(LoadScript);
Vue.use(Loading);

let scripts = [];
if( process.env.NODE_ENV !== 'development' ) {
  scripts.push({ type: 'text/javascript', src: '/socket.io/socket.io.js' });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  head: {
    script: scripts,
    meta: [
      { name: 'google-signin-scope', content: "profile email" },
      { name: 'google-signin-client_id', content: store.getters['common/getGoogleClientId'] },
      { name: 'google-site-verification', content: "peiGkzoETi_aCpbUf4ewgIJXnIF_82OprkzO2ffddPA" },
    ]
  },
  computed: {
    ...mapState('common', {
      host: state => state.host,
      loginCheck: state => state.login_check,
      contentLoading: state => state.contentLoading,

      googleApiKey: state => state.GOOGLE_API_KEY,
      googleClientId: state => state.GOOGLE_CLIENT_ID,
      googleClientSecretId: state => state.GOOGLE_CLIENT_SECRET_ID,

      naverClientId: state => state.NAVER_CLIENT_ID,
      naverClientSecretId: state => state.NAVER_CLIENT_SECRET_ID,
    })
  },
  methods: {
    ...mapActions('common', {
      userLoginAction: 'userLogin',
      userLogoutAction: 'userLogout'
    }),
    loginFail(path) {
      this.$router.push(path || '/auth/login')
    }
  },
  template: '<App/>'
})
