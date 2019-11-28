import http from '../services/http';

export default class Upload {
  static uploadImage(body, config) {
    return http.post('/upload', body, config);
  }
}
