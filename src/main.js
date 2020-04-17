import Vue from 'vue'
import App from './App.vue'
import {router} from "./routes";
import axios from 'axios'
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.prototype.$http = axios;
Vue.prototype.$user = localStorage.getItem("user");
Vue.prototype.$id = localStorage.getItem("id");
Vue.use(Vuex);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

