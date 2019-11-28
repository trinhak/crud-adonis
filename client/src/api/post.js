import http from '../services/http';

export default class Post {
  static getCategories() {
    return http.get('/posts/categories');
  }
  static createPost(body) {
    return http.post('/posts/create', body);
  }
}
