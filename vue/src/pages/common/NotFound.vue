<template>
  <div id="App-404">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">Not Found Page.</div>
      <div class="card-body text-center">
        <router-link to="/" class="btn btn-primary">Home</router-link>
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
          inner: "SPA",
          separator: "-",
          complement: "404"
        }
      }
    },
    beforeCreate() {
      document.body.classList.add("is_pop", "is_login")
    },
    destroyed() {
      document.body.classList.remove("is_pop", "is_login")
    }
  }
</script>
