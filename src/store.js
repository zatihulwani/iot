import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import {
  TokenService,
  ProfileService,
  FieldService,
} from './services/TokenService';
import ApiService from './services/ApiService';

Vue.use(Vuex);
// Vue.use(axios)

export default new Vuex.Store({
  state: {
    currentJWT: '',
    // errorMessage: '',
    error: false,
    dataProfile: '',
    dataField: '',
    loggedIn: false
  },

  getters: {
    jwt: state => state.currentJWT,
    // errorMessage: state => state.errorMessage,
    error: state => state.error,
    dataProfile: state => state.dataProfile,
    dataField: state => state.dataField,
    loggedIn: state => state.loggedIn,
  },

  mutations: {
    setJWT(state, jwt) {
      state.currentJWT = jwt;
    },
    // setMessage(state, msg) {
    //   state.errorMessage = msg;
    //   state.error = true;
    // },
    setDataProfile(state, data) {
      state.dataProfile = data;
    },
    setDataField(state, data) {
      state.dataField = data;
    },
    setLoggedIn(state, bool) {
      state.loggedIn = bool;
    },
  },

  actions: {
    async fetchJWT(context, cred) {
      try {
        // Perform the HTTP request.
        const response = await ApiService.login({
          grant_type: 'password',
          client_id: 5,
          client_secret: 'xvVLooYnTZNHGXxgtBa7iZ5jc9UKIA6kT4gVdugh',
          username: cred.username,
          password: cred.password,
          scope: '*'
        });

        //set token to vuex store
        context.commit('setJWT', response.data);
        //set token to local storage
        TokenService.saveToken(response.data);
        return response;
      } catch (error) {
        // context.commit('setMessage', error);
        return error.response;
      }

    },

    async fetchProfile(context) {
      try {
        const response = await ApiService.getProfile();
        //set token to vuex store
        context.commit('setDataProfile', response.data.data);
        //set token to local storage
        ProfileService.saveProfile(response.data.data);
        //set flag logged in
        context.commit('setLoggedIn', true);
        return response;
      } catch (error) {
        return error.response;
      }
    },

    async fetchField(context) {
      try {
        const response = await ApiService.getField();
        //set token to vuex store
        context.commit('setDataField', response.data.data);
        //set token to local storage
        FieldService.saveField(response.data.data);
        //set flag logged in
        context.commit('setLoggedIn', true);
        return response;
      } catch (error) {
        return error.response;
      }
    },
    async getLocalJWT(context) {
      let tokenLocal = TokenService.getToken();
      let profileLocal = ProfileService.getProfile();
      let fieldLocal = FieldService.getField();
      if (tokenLocal != null) {
        context.commit('setJWT', tokenLocal);
        context.commit('setDataProfile', profileLocal);
        context.commit('setDataField', fieldLocal);
        context.commit('setLoggedIn', true);
        return true;
      } else {
        return false;
      }
    },

    removeAuth(context) {
      //push back to login
      router.push({
        name: 'login',
      });
      //back to previous page before logout, to set redirect-params url when login
      router.go(-1);
      //remove local storage data
      TokenService.removeToken();
      ProfileService.removeProfile();
      FieldService.removeField();
      //remove vuex data
      context.commit('setJWT', '');
      context.commit('setDataProfile', '');
      context.commit('setDataField', '');
      context.commit('setLoggedIn', false);

      return true;
    }
  }
});
