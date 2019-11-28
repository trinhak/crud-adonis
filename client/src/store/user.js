import { get } from 'lodash';

import User from '../api/user';
import { AuthStorage } from '../services/storage';
import http from '../services/http';
import router from '../router';

import {
  REGISTER_ACCOUNT_REQUEST,
  REGISTER_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_FAIL,
  LOGIN_ACCOUNT_REQUEST,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_FAIL,
  LOGOUT_ACCOUNT_REQUEST,
  LOGOUT_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_FAIL,
} from '../constants/mutationTypes';

const state = {
  signUp: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  login: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  logout: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
};

const actions = {
  async signUp({ state, commit }, params) {
    commit(REGISTER_ACCOUNT_REQUEST);
    try {
      const res = await User.registerAccount(params);
      console.log(res);
      commit(REGISTER_ACCOUNT_SUCCESS, res);
    } catch (error) {
      commit(REGISTER_ACCOUNT_FAIL, { error: error });
      console.log('error', error);
    }
  },
  async login({ state, commit }, params) {
    commit(LOGIN_ACCOUNT_REQUEST);
    try {
      const res = await User.loginAccount(params);
      console.log(res);
      const userInfor = get(res, 'data.user');
      const data = {
        ...userInfor,
        access_token: get(res, 'data.access_token.token'),
      };
      const token = `${get(res, 'data.access_token.type')} ${get(res, 'data.access_token.token')}`;
      await http.setAuthorizationHeader(token);
      await AuthStorage.setAuth(JSON.stringify(data));
      commit(LOGIN_ACCOUNT_SUCCESS, data);
    } catch (error) {
      commit(LOGIN_ACCOUNT_FAIL, { error: error });
      console.log('error', error);
    }
  },
  async logout({ state, commit }, params) {
    commit(LOGOUT_ACCOUNT_REQUEST);
    try {
      const current = await AuthStorage.getAuth();
      const token = current.access_token;
      await User.logoutAccount({ token });
      await AuthStorage.deleteAuth();
      router.push('/');
      commit(LOGOUT_ACCOUNT_SUCCESS);
    } catch (error) {
      commit(LOGOUT_ACCOUNT_FAIL, { error: error });
      console.log('error', error);
    }
  },
};

const mutations = {
  [REGISTER_ACCOUNT_REQUEST](state) {
    state.signUp.requesting = true;
    state.signUp.status = '';
  },
  [REGISTER_ACCOUNT_SUCCESS](state, payload) {
    state.signUp.requesting = false;
    state.signUp.status = 'success';
    state.signUp.result = payload;
  },
  [REGISTER_ACCOUNT_FAIL](state, payload) {
    state.signUp.requesting = false;
    state.signUp.status = 'error';
    state.signUp.error = payload;
  },
  [LOGIN_ACCOUNT_REQUEST](state) {
    state.login.requesting = true;
    state.login.status = '';
  },
  [LOGIN_ACCOUNT_SUCCESS](state, payload) {
    state.login.requesting = false;
    state.login.status = 'success';
    state.login.result = payload;
  },
  [LOGIN_ACCOUNT_FAIL](state, payload) {
    state.login.requesting = false;
    state.login.status = 'error';
    state.login.error = payload;
  },
  [LOGOUT_ACCOUNT_REQUEST](state) {
    state.logout.requesting = true;
    state.logout.status = '';
  },
  [LOGOUT_ACCOUNT_SUCCESS](state, payload) {
    state.logout.requesting = false;
    state.logout.status = 'success';
    state.logout.result = payload;
  },
  [LOGOUT_ACCOUNT_FAIL](state, payload) {
    state.logout.requesting = false;
    state.logout.status = 'error';
    state.logout.error = payload;
  },
};

export default {
  state,
  actions,
  mutations,
};
