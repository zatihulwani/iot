<template>
  <div>
    <h1>Add New User</h1>
    <form>
      <p>
        <label for="name">name</label>
        <input type="text" name="name" v-model="name">
      </p>
      <p>
        <label for="email">email</label>
        <input type="text" name="email" v-model="email">
      </p>
      <p>
        <label for="password">password</label>
        <input type="password" name="password" v-model="password">
      </p>
      <p>
        <label for="password-confirmation">password confirmation</label>
        <input type="password" name="passwordConfirm" v-model="passwordConfirm">
      </p>
      <p>
        <label for="role_id">Pilih username :</label>
        <select name="role_id" id="role_id" v-model="roleId">
          <option v-for="item in role" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
      </p>
    </form>
    <button type="submit" @click.prevent="submitData" :disabled="loading == 1">submit data</button>
    <button type="button" @click.prevent="hapusjwtvuex">hapus jwt vuex</button>
    <p v-if="submitted">{{msg}}</p>
    <div>
      <div v-for="(er, index) in errValidation" :key="index">
        <p v-for="(e, i) in er" :key="i" class="error-validation">{{e}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ax from '../services/ApiService';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: '',
      roleId: 1,
      submitted: false,
      msg: '',
      loading: false,
      errValidation: ''
    };
  },
  computed: {
    ...mapGetters(['jwt'])
  },
  methods: {
    hapusjwtvuex() {
      this.$store.dispatch('removeAuth');
    },
    async submitData() {
      try {
        this.loading = true;
        const getDataRoles = await ax.postUser({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm,
          role_id: this.roleId
        });
        if (getDataRoles.status == 201) {
          this.role = getDataRoles.data.data;
          this.submitted = true;
          this.msg = 'Success add new user';
          this.loading = false;
          this.errValidation = null;
        }
      } catch (error) {
        this.submitted = true;
        if (error.response.status == 404) {
          var errMsg = 'Not found';
        } else {
          console.log(error.response);
          errMsg = `${error.response.data.message}`;
          this.errValidation = error.response.data.errors;
        }
        this.msg = `failed - ${errMsg}`;
        this.loading = false;
      }
    }
  },
  async created() {
    try {
      const getDataRoles = await ax.getRole();
      if (getDataRoles.status == 200) {
        this.role = getDataRoles.data.data;
      }
    } catch (error) {
      console.log(error);
    }

    // this.selected = this.role.find(i => i.id === this.selected);
  }
};
</script>

<style scoped>
.error-validation {
  color: red;
  padding: 10px;
  margin: 5px;
  display: inline-block;
}
</style>
