import store from '../store';
const TOKEN_KEY = 'token';
const PROFILE_KEY = 'profile';
const FIELD_KEY = 'field';

const TokenService = {
  //manage token local storage
  getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
  },
  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(accessToken));
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  //manage token vuex store
  getTokenVuex() {
    return store.getters.jwt;
  },
  saveTokenVuex(accessToken) {
    store.commit('setJWT', accessToken);
  },
  removeTokenVuex() {
    store.commit('setJWT', '');
  },

};

const ProfileService = {
  //manage profile local storage
  getProfile() {
    return JSON.parse(localStorage.getItem(PROFILE_KEY));
  },
  saveProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
  removeProfile() {
    localStorage.removeItem(PROFILE_KEY);
  },

  //manage profile vuex store
  getProfileVuex() {
    return store.getters.dataProfile;
  },
  saveProfileVuex(accessProfile) {
    store.commit('setDataProfile', accessProfile);
  },
  removeProfileVuex() {
    store.commit('setDataProfile', '');
  },
};

const FieldService = {
  //manage profile local storage
  getField() {
    return JSON.parse(localStorage.getItem(FIELD_KEY));
  },
  saveField(field) {
    localStorage.setItem(FIELD_KEY, JSON.stringify(field));
  },
  removeField() {
    localStorage.removeItem(FIELD_KEY);
  },

  //manage profile vuex store
  getFieldVuex() {
    return store.getters.dataField;
  },
  saveFieldVuex(accessField) {
    store.commit('setDataField', accessField);
  },
  removeFieldVuex() {
    store.commit('setDataField', '');
  },
};

export {
  TokenService,
  ProfileService,
  FieldService,
};
