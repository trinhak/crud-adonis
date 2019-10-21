import http from '../services/http';

export default class User {
  static registerAccount(body, config) {
    return http.post('/users/create', body, config);
  }
}
