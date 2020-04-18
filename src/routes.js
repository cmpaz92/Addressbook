import Vue from 'vue';
import VueRouter from "vue-router";
import store from './store.js';
import Home from "./components/views/Home";
import Contacts from "./components/views/Contacts";
import Profile from "./components/views/Profile";
import SignUp from "./components/views/SignUp";
import Login from "./components/views/Login";
import Search from "./components/views/Search";
import Secure from "./components/views/Secure.vue";
import User from "./components/views/User";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: "/", component: Home, name: "Home" },
    { path: "/contacts", component: Contacts, name: "Contacts", 
    meta: {requiresAuth: true} },
    { path: "/profile", component: Profile, name: "Profile", 
    meta: {requiresAuth: true} },
    { path: "/signup", component: SignUp, name: "Signup" },
    { path: '/user/:id', component: User, name: "User", 
    meta: {requiresAuth: true} },
    { path: "/search", component: Search, name: "Search", 
    meta: {requiresAuth: true}},
    { path: "/login", component: Login, name: "login" },
    { path: '/secure', component: Secure, name: 'Secure', 
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
});

export default router

