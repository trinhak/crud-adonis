import http from '../services/http';

export default class Upload {
  static uploadImage(body) {
    const data = new FormData();
    const image = body;
    data.append('name', 'image');
    data.append('image', body);
    return http.post('/upload', data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
