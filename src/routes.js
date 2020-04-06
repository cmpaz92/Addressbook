import Vue from 'vue'
import VueRouter from "vue-router"

import Home from "./components/views/Home";
import Contacts from "./components/views/Contacts";
import MySocial from "./components/views/MySocial";
import SignUp from "./components/views/SignUp";
import Login from "./components/views/Login";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes:[
        {path:"/", component: Home},
        {path:"/contacts", component: Contacts},
        {path:"/mySocial", component: MySocial},
        {path:"/signup", component: SignUp},
        {path:"/login", component: Login}
    ]
});