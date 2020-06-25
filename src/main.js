import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import axios from 'axios';
import store from './store';
import Swal from 'sweetalert2'

Vue.prototype.$http = axios;

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
  console.log(error);
  if (401 === error.response.status) {
      Swal({
          title: "Session Expired",
          text: "Your session has expired. Would you like to be redirected to the login page?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          closeOnConfirm: false
      }, function(){
          window.location = '/login';
      });
  } else {
      return Promise.reject(error);
  }
});


Vue.prototype.$appName = 'My App'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

