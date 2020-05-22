<template>
  <div id="Login-Naver">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-center">네이버 로그인중..</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-naver',
    head() {
      return {
        title: {
          inner: "로그인",
          separator: "-",
          complement: "네이버"
        }
      }
    },
    methods: {
      authApis() {
        const self = this

        var naverLogin = new naver.LoginWithNaverId({
          clientId: self.$root.naverClientId,
          callbackUrl: self.$root.host+"/auth/callback/naver",
          isPopup: false,
          callbackHandle: true
        });

        /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
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

              alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
              naverLogin.reprompt();
              self.$root.loginFail()

            } else {

              self.$root.userLoginAction({
                'userId': naverInfo.email
                ,'loginType': 'naver'
              });

            }

          } else {
            alert("callback 처리에 실패하였습니다.");
            self.$root.loginFail()
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
