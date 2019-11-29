import Vue from 'vue';
import Router from 'vue-router';
import { get } from 'lodash';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import UnAuthor from './views/UnAuthor.vue';
import MyMucsic from './views/MyMusic.vue';
import http from './services/http';

import { AuthStorage } from './services/storage';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'unAuthor',
      component: UnAuthor,
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/my-music',
      name: 'MyMucsic',
      component: MyMucsic,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const currentUser = AuthStorage.getAuth();
  console.log('currentUser', currentUser)
  const token = `${get(currentUser, 'type_token')} ${get(currentUser, 'access_token')}`;
  http.setAuthorizationHeader(token);
  if (!isPublic && !currentUser) {
    return next({
      path: '/',
    });
  }

  if (currentUser && onlyWhenLoggedOut) {
    return next('/home');
  }

  next();
});

export default router;
