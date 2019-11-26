import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import UnAuthor from './views/UnAuthor.vue';

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const currentUser = AuthStorage.getAuth();
  console.log('currentUser', currentUser)
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
