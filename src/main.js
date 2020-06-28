import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import axios from 'axios';
import store from './store';
import Multiselect from 'vue-multiselect';1;
import Swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import './registerServiceWorker'
/*import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)*/
Vue.prototype.$http = axios;

Vue.use(Swal);
Vue.component('multiselect', Multiselect)

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
  Vue.prototype.$api = "http://localhost:4000";
}else{
  Vue.prototype.$api = "https://addresio.herokuapp.com";
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response.status);
  if (401 === error.response.status) {
    store.dispatch("logout")
    router.push("/login");
  } else {
      return error;
  }
});
Vue.prototype.$appName = 'My App'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')