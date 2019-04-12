import ApiService from './ApiService';
import {
  TokenService,
  TokenServiceVuex
} from './TokenService';

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  async login(username, password) {

    const requestData = {
      grant_type: 'password',
      client_id: 5,
      client_secret: 'xvVLooYnTZNHGXxgtBa7iZ5jc9UKIA6kT4gVdugh',
      username: username,
      password: password,
      scope: '*'
    };

    try {
      const response = await ApiService.login(requestData);
      let jsonready = JSON.stringify(response.data);
      TokenService.saveToken(jsonready);
      TokenService.saveTokenVuex(jsonready);
      return response;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail);
    }

  }
};

export {
  UserService,
  AuthenticationError
};