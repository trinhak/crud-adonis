import { get } from 'lodash';

import Post from '../api/post';
import Upload from '../api/upload';
import Favorite from '../api/favorite';

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
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
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
  post: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  favorite: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
  deletePost: {
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
      const imageCompression = await reSizeImage(file);
      const image = await Upload.uploadImage(imageCompression);
      const paramPost = {
        ...params,
        image: get(image, 'data.url'),
      };
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
      const res = await Post.getPostByUserId(params);
      commit(GET_POST_BY_USER_ID_SUCCESS, res.data);
    } catch (error) {
      console.log('error', error);
      commit(GET_POST_BY_USER_ID_FAIL, error);
    }
  },
  async getPosts({ state, commit }, params) {
    commit(GET_POST_REQUEST);
    try {
      const res = await Post.getAllPost(params.page);
      commit(GET_POST_SUCCESS, res.data);
    } catch (error) {
      console.log('error', error);
      commit(GET_POST_FAIL, error);
    }
  },
  async favorite({ state, commit }, params) {
    commit(ADD_FAVORITE_REQUEST);
    try {
      await Favorite.create({ userId: params.user_id, postId: params.post_id });
      commit(ADD_FAVORITE_SUCCESS, params);
    } catch (error) {
      console.log('error', error);
      commit(ADD_FAVORITE_FAIL, error);
    }
  },

  async deletePost({ state, commit }, params) {
    commit(DELETE_POST_REQUEST);
    try {
      await Post.deletePost(params);
      commit(DELETE_POST_SUCCESS, params);
    } catch (error) {
      console.log('error', error);
      commit(DELETE_POST_FAIL, error);
    }
  }
};

const mutations = {
  // get categoris in resuce
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
  // create post in reduce
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
  // get post by user in reduce
  [GET_POST_BY_USER_ID_REQUEST](state) {
    state.postByUserId.requesting = true;
    state.postByUserId.status = '';
  },
  [GET_POST_BY_USER_ID_SUCCESS](state, payload) {
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
  // get all post in reduce
  [GET_POST_REQUEST](state) {
    state.postByUserId.requesting = true;
    state.postByUserId.status = '';
  },
  [GET_POST_SUCCESS](state, payload) {
    state.post.requesting = false;
    state.post.status = 'success';
    state.post.result =
      payload.data.page === 1
        ? { ...payload.data, posts: payload.data.data }
        : {
            ...payload.data,
            posts: [...state.post.result.posts, ...payload.data.data],
          };
  },
  [GET_POST_FAIL](state, payloand) {
    state.post.requesting = false;
    state.post.status = 'error';
    state.post.error = payloand;
  },
  // create or delete favorite in reduce
  [ADD_FAVORITE_REQUEST](state) {
    state.favorite.requesting = true;
    state.favorite.status = '';
  },
  [ADD_FAVORITE_SUCCESS](state, payload) {
    const postById = get(state, 'post.result.posts', []).find(item => item.id === payload.post_id);
    const isFavorited = get(postById, 'favorited', []).find(item => item.id === payload.user_id);
    const dataFavorite = get(postById, 'favorited');
    state.favorite.requesting = false;
    state.favorite.status = 'success';
    state.favorite.result = payload;
    state.post.result = {
      ...state.post.result,
      posts: state.post.result.posts.map(item => {
        if (item.id === payload.post_id) {
          if (isFavorited) {
            return {
              ...item,
              __meta__: { favorited_count: get(item, '__meta__.favorited_count', 0) - 1 },
              favorited: dataFavorite.filter(ite => ite.id !== payload.user_id),
            };
          } else {
            return {
              ...item,
              __meta__: { favorited_count: get(item, '__meta__.favorited_count', 0) + 1 },
              favorited: [...item.favorited, { id: payload.user_id }],
            };
          }
        } else {
          return { ...item };
        }
      }),
    };
  },
  [ADD_FAVORITE_FAIL](state, payloand) {
    state.favorite.requesting = false;
    state.favorite.status = 'error';
    state.favorite.error = payloand;
  },
  [DELETE_POST_REQUEST](state) {
    state.deletePost.requesting = true;
    state.deletePost.status = '';
  },
  [DELETE_POST_SUCCESS](state, payload) {
    state.deletePost.requesting = false;
    state.deletePost.status = 'success';
    state.post.result = {
      ...state.post.result,
      post: get(state, 'post.result.posts', []).filter(item => item.id !== payload.postId),
    };
    state.postByUserId.result = {
      ...state.postByUserId.result,
      posts: get(state, 'postByUserId.result.posts', []).filter(item => item.id !== payload.postId),
    };
  },
  [DELETE_POST_FAIL](state, payloand) {
    state.deletePost.requesting = false;
    state.deletePost.status = 'error';
    state.deletePost.error = payloand;
  },
};

export default {
  state,
  actions,
  mutations,
};
