import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import axios from 'axios';
import store from './store';

Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
/*
Vue.prototype.$user = localStorage.getItem("user");
Vue.prototype.$id = localStorage.getItem("id");*/
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
  Vue.prototype.$api = "http://localhost:4000";
}else{
  Vue.prototype.$api = "https://addresio.herokuapp.com";
}



Vue.prototype.$appName = 'My App'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

