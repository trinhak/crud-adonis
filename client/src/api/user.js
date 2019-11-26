import http from '../services/http';

export default class User {
  static registerAccount(body, config) {
    return http.post('/users/create', body, config);
  }

  static loginAccount(body) {
    return http.post('/users/login', body);
  }

  static logoutAccount(body = {}) {
    return http.post('/users/signout', body);
  }
}
