import Vue from 'vue';
import AtComponents from 'at-ui';
import TreeView from 'vue-json-tree-view';

import App from './App';
import router from './router';
import store from './store';

Vue.use(AtComponents);
Vue.use(TreeView);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
