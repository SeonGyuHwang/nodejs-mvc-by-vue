<template>
  <div id="Login-Google">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-center">구글 로그인중..</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-google',
    head() {
      return {
        title: {
          inner: "로그인",
          separator: "-",
          complement: "구글"
        }
      }
    },
    methods: {
      authApis() {
        const self = this

        gapi.load('client:auth2', () => {

          gapi.auth2.init({
            apiKey: self.$root.googleApiKey
            ,client_id: self.$root.googleClientId
            ,scope: 'profile email'
          }).then( auth2 => {

            if( !auth2.isSignedIn.get() ) {

              alert("auth 인증 실패!");
              self.$root.loginFail()

            } else {

              var googleInfo = {}
                , googleUser = auth2.currentUser.get().getBasicProfile();

              googleInfo = {
                'email': googleUser.getEmail()
                ,'name': googleUser.getName()
                ,'id': googleUser.getId()
                ,'imageUrl': googleUser.getImageUrl()
                ,'givenName': googleUser.getGivenName()
                ,'familyName': googleUser.getFamilyName()
              }

              self.$root.userLoginAction({
                'userId': googleInfo.email
                ,'loginType': 'google'
              });

            }

          }).catch(err => {
            alert("로그인 실패! ("+ err.message +")");
            self.$root.loginFail()
          });

        });

      }
    },
    beforeCreate: () => {
      document.body.classList.add("is_pop", "is_login")
    },
    mounted() {
      this.authApis()
    },
    destroyed() {
      document.body.classList.remove("is_pop", "is_login")
    }
  }
</script>
