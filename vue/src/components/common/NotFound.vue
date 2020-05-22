<template>
  <div id="App-404">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">존재하지 않는 페이지 입니다.</div>
      <div class="card-body text-center">
        <router-link to="/" class="btn btn-primary">홈으로</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-404',
    head() {
      return {
        title: {
          inner: "화물",
          separator: "-",
          complement: "404"
        },
        meta: [
          { id: 'viewport', name: 'viewport', content: "width=device-width,initial-scale=1.0" }
        ]
      }
    },
    beforeCreate() {
      document.body.classList.add("is_pop", "is_login")
    },
    destroyed() {
      jQuery('#viewport').remove()
      document.body.classList.remove("is_pop", "is_login")
    }
  }
</script>
