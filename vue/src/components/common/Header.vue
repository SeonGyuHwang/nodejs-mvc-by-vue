<template>
  <div id="App-Header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top d-print-none" id="mainNav">
      <router-link to="/" class="navbar-brand d-print-none">기록</router-link>
      <button class="navbar-toggler navbar-toggler-right d-print-none" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-print-none" id="navbarResponsive">
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
            <router-link to="/board" class="nav-link">
              <i class="fa fa-fw fa-table"></i>
              <span class="nav-link-text">게시판</span>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="javascript:void(0);" class="nav-link" data-toggle="modal" data-target="#logoutModal">
              <i class="fa fa-fw fa-sign-out"></i>
              로그아웃
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'app-header',
    watch:{
      '$route': {
        deep: true,
        handler() {
          this.$el.querySelector("#navbarResponsive").classList.remove("show")
        }
      }
    }
  }
</script>
