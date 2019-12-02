import http from '../services/http';

export default class Post {
  static getCategories() {
    return http.get('/posts/categories');
  }
  static createPost(body) {
    return http.post('/posts/create', body);
  }
  static getPostByUserId(params) {
    return http.get(`/posts/get-post-by-userId?id=${params.id}&page=${params.page}`);
  }
}
