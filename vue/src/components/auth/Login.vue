<template>
  <div id="Login">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">로그인 선택</div>
      <div class="card-body">
        <a href="javascript:void(0);" class="btn btn-primary googleAccountLoginBtn" @click="gAuthInit">구글</a>
        <a href="javascript:void(0);" id="naverIdLogin" class="naverAccountLoginBtn">네이버</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    head() {
      return {
        title: {
          inner: "SPA",
          separator: "-",
          complement: "로그인"
        }
      }
    },
    beforeCreate() {
      jQuery("#logoutModal").modal('hide')
      document.body.classList.add("is_pop", "is_login")
    },
    methods: {
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
      gAuthInit() {
        gapi.auth2.getAuthInstance().signIn({
          scope: 'profile email'
          ,ux_mode: 'redirect'
          ,redirect_uri: this.$root.host +"/auth/callback/google"
        })
      }
    },
    mounted() {
      this.authApis();
    },
    destroyed() {
      jQuery('#viewport').remove()
    }
  }
</script>
