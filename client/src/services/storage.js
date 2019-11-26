import { LOGIN_KEY } from '../constants/defaultValues';

class AuthStorage {
  static getAuth() {
    return localStorage.getItem(LOGIN_KEY);
  }

  static setAuth(data) {
    return localStorage.setItem(LOGIN_KEY, data);
  }

  static deleteAuth() {
    return localStorage.removeItem(LOGIN_KEY);
  }
}

export { AuthStorage };
