<template>
  <div id="app" v-if="loginCheck">
    <app-header />
    <app-body />
    <app-footer />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.userLoginCheckAction()
    }
  }
</script>

<style lang="css">
  @import 'vue-loading-overlay/dist/vue-loading.css';
  @import 'bootstrap/dist/css/bootstrap.min.css';
  @import 'font-awesome/css/font-awesome.min.css';
  @import './assets/css/sb-admin.min.css';
  @import './assets/css/custom.css';
</style>

