<template>
  <div>
    <h1>Data Field</h1>
    <div>
      <get-field v-if="loggedIn"></get-field>
      <hr>
    </div>
    <!-- <router-link to="/user/bagas">tombol gantin bagas</router-link> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import ApiService from './services/ApiService';
import GetField from '../components/GetField.vue';
export default {
  components: {
    'get-field': GetField
  },
  data() {
    return {
      msg: ''
    };
  },
  methods: {
    ...mapGetters(['jwt', 'message', 'error', 'loggedIn'])
  },
  // mounted: function() {
  //   ApiService.get('getField')
  //   .then(response => {
  //     console.log(response.data.data)
  //   })
  // }
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
