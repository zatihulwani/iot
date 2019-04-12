<template>
  <div class="allUser">
    <h3>List All User</h3>
    <button @click="getAllUser">get all user</button>
    <div>{{error}}</div>
    <div v-if="getUserDone">
      <div class="userCard" v-for="(u, index) in users" :key="index">{{u.name}}</div>
    </div>
  </div>
</template>

<script>
import ax from '../services/ApiService';
export default {
  props: ['access_token'],
  data() {
    return {
      users: '',
      getUserDone: false,
      error: ''
    };
  },
  methods: {
    async getAllUser() {
      try {
        const response = await ax.getAllUser();
        this.users = response.data.data;
        this.getUserDone = true;
      } catch (error) {
        console.log(error);
        this.error = `${error.response.data.message} - ${error}`;
      }
    }
  }
};
</script>

<style scoped>
.allUser {
  background-color: orange;
  padding: 10px;
  margin: 10px;
}
.userCard {
  background-color: peachpuff;
  padding: 10px;
  margin: 10px;
}
</style>
