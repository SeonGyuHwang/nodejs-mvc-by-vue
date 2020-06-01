<template>
  <div id="Login-Naver">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-center">Loading..</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-naver',
    head() {
      return {
        title: {
          inner: "Login",
          separator: "-",
          complement: "Naver"
        }
      }
    },
    methods: {
      authApis() {
        const self = this

        var naverLogin = new naver.LoginWithNaverId({
          clientId: self.naverClientId,
          callbackUrl: self.host+"/auth/callback/naver",
          isPopup: false,
          callbackHandle: true
        });

        naverLogin.init();

        naverLogin.getLoginStatus((status) => {
          if (status) {

            var naverInfo = {};
            naverInfo.id = naverLogin.user.getId();
            naverInfo.email = naverLogin.user.getEmail();
            naverInfo.name = naverLogin.user.getName();
            naverInfo.nickname = naverLogin.user.getNickName();
            naverInfo.gender = naverLogin.user.getGender();
            naverInfo.age = naverLogin.user.getAge();
            naverInfo.birthday = naverLogin.user.getBirthday();
            naverInfo.profile_image = naverLogin.user.getProfileImage();

            if( typeof naverInfo.email === undefined || naverInfo.email === null) {

              alert("Required Email.");
              naverLogin.reprompt();
              self.loginFail()

            } else {

              self.userLoginAction({
                'userId': naverInfo.email
                ,'loginType': 'naver'
              });

            }

          } else {
            alert("callback Error!");
            self.loginFail()
          }
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
