<template>
  <div>
    <h1>User</h1>
    <div>
      <get-profile v-if="loggedIn"></get-profile>
      <hr>
    </div>
    <router-link to="/user/bagas">tombol gantin bagas</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GetProfile from '../components/GetProfile.vue';
export default {
  components: {
    'get-profile': GetProfile
  },
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    ...mapGetters(['jwt', 'message', 'error', 'loggedIn'])
  }
  // beforeRouteUpdate(to, from, next) {
  //   console.log(
  //     `Updating slug from ${from.params.username} to ${to.params.username}`
  //   );
  //   next(); //make sure you always call next()
  // }
};
</script>

<style>
</style>
