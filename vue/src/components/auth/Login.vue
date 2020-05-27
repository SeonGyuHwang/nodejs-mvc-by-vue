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
      document.body.classList.add("is_pop", "is_login")

      document.querySelectorAll("#logoutModal,.modal-backdrop")
        .forEach(el => el.classList.remove("show"))
    },
    methods: {
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
    }
  }
</script>
