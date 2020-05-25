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
  },
  created(){

    jQuery.datepicker.setDefaults({
      dateFormat: "yy-mm-dd",
      closeText: '닫기',
      prevText: '이전달',
      nextText: '다음달',
      currentText: '오늘',
      monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      dayNames: ['일','월','화','수','목','금','토'],
      dayNamesShort: ['일','월','화','수','목','금','토'],
      dayNamesMin: ['일','월','화','수','목','금','토'],
      weekHeader: 'Wk',
      yearRange: 'c-2:c+1',
      firstDay: 0,
      isRTL: false,
      showMonthAfterYear: true,
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      showOn: 'both'
    });

  }
}
