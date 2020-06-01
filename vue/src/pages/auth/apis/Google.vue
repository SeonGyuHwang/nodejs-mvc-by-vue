<template>
  <div id="Login-Google">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-center">Loading..</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-google',
    head() {
      return {
        title: {
          inner: "Login",
          separator: "-",
          complement: "Google"
        }
      }
    },
    methods: {
      authApis() {
        const self = this

        gapi.load('client:auth2', () => {

          gapi.auth2.init({
            apiKey: self.googleApiKey
            ,client_id: self.googleClientId
            ,scope: 'profile email'
          }).then( auth2 => {

            if( !auth2.isSignedIn.get() ) {

              alert("auth fail!");
              self.loginFail()

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

              self.userLoginAction({
                'userId': googleInfo.email
                ,'loginType': 'google'
              });

            }

          }).catch(err => {
            alert("login fail! ("+ err.message +")");
            self.loginFail()
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
