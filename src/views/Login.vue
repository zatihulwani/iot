<template>
  <div>
    <h3>Form Login</h3>
    <p>
      <label for="selectUsername">Pilih username :</label>
      <select
        name="selectUsername"
        id="selectUsername"
        v-model="username"
        :disabled="loggedIn == 1"
        @change="onChange"
      >
        <option :value="email.admin">email admin</option>
        <option :value="email.staff">email staff</option>
      </select>
    </p>
    <form>
      <input type="text" v-model="username" :disabled="loggedIn == 1">
      <input type="password" v-model="password" :disabled="loggedIn == 1">
      <button type="submit" @click.prevent="login" :disabled="loggedIn == 1">Login</button>
      <p>
        <button type="button" @click.prevent="logout" :disabled="loggedIn == 0">logout</button>
      </p>
    </form>
    <p v-show="loading" id="loading">Loading</p>
    <p class="error">{{errorMessage}}</p>
    <hr>
    <h3 v-if="loggedIn">Status</h3>
    <div id="statusLogin">
      <p>
        <strong>JWT token type</strong>
        : {{jwt.token_type}}
      </p>
      <p>
        <strong>access token</strong>
        : {{jwt.access_token}}
      </p>
      <p>
        <strong>expires in</strong>
        : {{jwt.expires_in}}
      </p>
    </div>
    <hr>
    <get-all-user v-if="loggedIn" :access_token="jwt.access_token"></get-all-user>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GetAllUser from '../components/GetAllUser.vue';
import ax from '../services/ApiService';

export default {
  components: {
    'get-all-user': GetAllUser
  },
  data() {
    return {
      // username: "bgsbla33333@gmail.com",
      password: 'bagaskarala',
      loading: false,
      email: {
        admin: 'bgsbla33333@gmail.com',
        staff: 'bagaskara_staff@gmail.com'
      },
      selectedUser: 'bgsbla33333@gmail.com',
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['jwt', 'loggedIn']),
    username: {
      get: function() {
        return this.selectedUser;
      },
      set: function(val) {
        this.selectedUser = val;
      }
    }
  },

  methods: {
    ...mapActions(['fetchJWT', 'fetchProfile', 'removeAuth']),

    onChange(event) {
      console.log('e target', event.target.value);
      console.log('this name', this.username);
    },

    async login() {
      console.log('logging in');
      if (this.username == '' || this.password == '') {
        alert('isi username dan password dahulu');
        return false;
      }
      this.loading = true;

      //fetch JWT
      const responseJWT = await this.fetchJWT({
        username: this.username,
        password: this.password
      });

      //error handling
      if (responseJWT != null) {
        //check whether success login
        if (responseJWT.status == 200) {
          //fetch profile after got JWT
          const responseProfile = await this.fetchProfile();
          //check whether success get profile
          if (responseProfile.status == 200) {
            this.loading = false;
            console.log('authenticated from api login');
            //check redirect parameter in url
            if (this.$route.query.redirect != null) {
              this.$router.push(this.$route.query.redirect);
            } else {
              //check if user is admin
              if (responseProfile.data.data.role.id == 1) {
                this.$router.push('admin');
              } else {
                this.$router.push('user');
              }
            }
          } else {
            //failed get profile
            this.loading = false;
            console.log('gagal fetch profile,status selain 200');
            this.errorMessage = responseProfile.data;
          }
        } else {
          //failed get token
          this.loading = false;
          console.log('Failed fetch JWT');
          this.errorMessage = responseJWT.data;
        }
      } else {
        //failed contact server
        this.loading = false;
        this.errorMessage = 'Connection Error';
      }
    },

    logout() {
      const removeAuth = this.removeAuth();
      if (removeAuth) {
        console.log('logged out');
      }
    },

    getAllDevices() {
      ax.getDevice()
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.error {
  background-color: red;
  padding: 10px;
  color: white;
}
#statusLogin {
  background-color: lightgreen;
  padding: 10px;
  margin: 10px;
}
#loading {
  color: crimson;
  font-weight: bolder;
}
</style>
