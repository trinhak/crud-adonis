import { get } from 'lodash';

import Post from '../api/post';
import Upload from '../api/upload';

import { reSizeImage } from '../utils/general';

import {
  GET_CATEGORIES_ACCOUNT_REQUEST,
  GET_CATEGORIES_ACCOUNT_SUCCESS,
  GET_CATEGORIES_ACCOUNT_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POST_BY_USER_ID_REQUEST,
  GET_POST_BY_USER_ID_SUCCESS,
  GET_POST_BY_USER_ID_FAIL,
} from '../constants/mutationTypes';

const state = {
  categories: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  createPost: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  postByUserId: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
};

const actions = {
  async getCategories({ state, commit }) {
    commit(GET_CATEGORIES_ACCOUNT_REQUEST);
    try {
      const res = await Post.getCategories();
      commit(GET_CATEGORIES_ACCOUNT_SUCCESS, get(res, 'data.categories', []));
    } catch (error) {
      console.log('error', error);
      commit(GET_CATEGORIES_ACCOUNT_FAIL, error);
    }
  },
  async createPost({ state, commit }, params) {
    commit(CREATE_POST_REQUEST);
    try {
      const file = get(params, 'image');
      console.log('file', file);
      const imageCompression = await reSizeImage(file);
      const image = await Upload.uploadImage(imageCompression);
      const paramPost = {
        ...params,
        image: get(image, 'data.url'),
      };
      console.log('paramPost', paramPost);
      const res = await Post.createPost(paramPost);
      commit(CREATE_POST_SUCCESS, res.data);
    } catch (error) {
      console.log('error', error);
      commit(CREATE_POST_FAIL, error);
    }
  },
  async getPostByUserId({ state, commit }, params) {
    commit(GET_POST_BY_USER_ID_REQUEST);
    try {
      console.log('params', params)
      const res = await Post.getPostByUserId(params);
      commit(GET_POST_BY_USER_ID_SUCCESS, res.data);
    } catch (error) {
      console.log('error', error);
      commit(GET_POST_BY_USER_ID_FAIL, error);
    }
  },
};

const mutations = {
  [GET_CATEGORIES_ACCOUNT_REQUEST](state) {
    state.categories.requesting = true;
    state.categories.status = '';
  },
  [GET_CATEGORIES_ACCOUNT_SUCCESS](state, payload) {
    state.categories.requesting = false;
    state.categories.status = 'success';
    state.categories.result = payload;
  },
  [GET_CATEGORIES_ACCOUNT_FAIL](state, payloand) {
    state.categories.requesting = false;
    state.categories.status = 'error';
    state.categories.error = payloand;
  },
  [CREATE_POST_REQUEST](state) {
    state.createPost.requesting = true;
    state.createPost.status = '';
  },
  [CREATE_POST_SUCCESS](state, payload) {
    state.createPost.requesting = false;
    state.createPost.status = 'success';
    state.createPost.result = payload;
  },
  [CREATE_POST_FAIL](state, payloand) {
    state.createPost.requesting = false;
    state.createPost.status = 'error';
    state.createPost.error = payloand;
  },
  [GET_POST_BY_USER_ID_REQUEST](state) {
    state.postByUserId.requesting = true;
    state.postByUserId.status = '';
  },
  [GET_POST_BY_USER_ID_SUCCESS](state, payload) {
    console.log('payload', payload.data.data);
    state.postByUserId.requesting = false;
    state.postByUserId.status = 'success';
    state.postByUserId.result =
      payload.data.page === 1
        ? { ...payload.data, posts: payload.data.data }
        : {
            ...payload.data,
            posts: [...state.postByUserId.result.posts, ...payload.data.data],
          };
  },
  [GET_POST_BY_USER_ID_FAIL](state, payloand) {
    state.postByUserId.requesting = false;
    state.postByUserId.status = 'error';
    state.postByUserId.error = payloand;
  },
};

export default {
  state,
  actions,
  mutations,
};
