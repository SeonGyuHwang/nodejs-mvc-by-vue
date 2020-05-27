import {mapActions, mapState} from "vuex";
import router from '@/router'

export default {
  computed: {
    ...mapState('common', {
      host: state => state.host,
      loginCheck: state => state.login_check,
      contentLoading: state => state.contentLoading,

      googleApiKey: state => state.GOOGLE_API_KEY,
      googleClientId: state => state.GOOGLE_CLIENT_ID,
      googleClientSecretId: state => state.GOOGLE_CLIENT_SECRET_ID,

      naverClientId: state => state.NAVER_CLIENT_ID,
      naverClientSecretId: state => state.NAVER_CLIENT_SECRET_ID
    })
  },
  methods: {
    ...mapActions('common', {
      userLoginAction: 'userLogin',
      userLogoutAction: 'userLogout',
      userLoginCheckAction: 'userLoginCheck'
    }),
    authApis() {
      const self = this

      gapi.load('auth2', () => {

        gapi.auth2.init({
          apiKey: self.$root.googleApiKey
          ,client_id: self.$root.googleClientId
        });

      });

      new naver.LoginWithNaverId({
        clientId: self.$root.naverClientId
        ,callbackUrl: self.$root.host +"/auth/callback/naver"
        ,isPopup: false
        ,loginButton: {
          color: "green"
          , type: 3
          , height: 38
        }
      }).init();

    },
    loginFail(path) {
      router.push(path || '/auth/login')
    },
    numOnly(e){
      e.preventDefault()
      e.target.value = e.target.value.replace(/[^0-9]/g, "")
    }
  }
}
