import { get } from 'lodash';
import serializeError from 'serialize-error';

import User from '../api/user';

import {
  REGISTER_ACCOUNT_REQUEST,
  REGISTER_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_FAIL,
} from '../constants/mutationTypes';

const state = {
  signUp: {
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
    } catch (error) {
      commit(REGISTER_ACCOUNT_FAIL, { error: serializeError(error) });
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
};

export default {
  state,
  actions,
  mutations,
};
