<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view @authenticated="setAuthenticated"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        authenticated: false
      }
    },
    mounted() {
      if(this.authenticated === false) {
        this.$router.replace({ name: "Login" })
      }
    },
    methods: {
      logout() {
        this.authenticated = false
      },
      setAuthenticated(status) {
        this.authenticated = status;
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/custom.scss";
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
