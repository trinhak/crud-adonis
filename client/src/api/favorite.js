import http from '../services/http';

export default class Favorite {
  static create(body) {
    return http.post('/favorites/create', body);
  }
}
