<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/user">User</router-link>|
      <router-link to="/admin">Admin</router-link>|
      <router-link to="/setting">Setting</router-link>|
      <router-link to="/field">Field</router-link>|
      <button type="button" @click.prevent="logout">logout</button>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['getLocalJWT', 'removeAuth', 'fetchProfile', 'fetchField']),
    logout() {
      this.removeAuth();
    }
  },
  async mounted() {
    const getLocalJWT = await this.getLocalJWT();
    if (getLocalJWT == true) {
      console.log('authenticated from local storage');
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
