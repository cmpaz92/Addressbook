import Vue from 'vue'
import VueRouter from "vue-router"

import Home from "./components/views/Home";
import Contacts from "./components/views/Contacts";
import MySocial from "./components/views/MySocial";
import SignUp from "./components/views/SignUp";
import Login from "./components/views/Login";
import Search from "./components/views/Search";
import User from "./components/views/User";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: "/", component: Home },
        { path: "/contacts", component: Contacts },
        { path: "/mysocial", component: MySocial },
        { path: "/signup", component: SignUp },
        { path: '/user/:id', component: User },
        { path: "/search", component: Search },
        { path: "/login", component: Login },
        { path: "/logout", redirect: '/' },
        { path: "/loginsuccess", redirect: '/mysocial' }
    ]
});