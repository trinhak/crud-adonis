import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';
import vuetify from './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import lodash from './mixins/lodash';

Vue.config.productionTip = false;

const mixins = [lodash];
mixins.forEach(mixin => Vue.mixin(mixin));

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
