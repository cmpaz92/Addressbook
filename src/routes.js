import Vue from 'vue'
import VueRouter from "vue-router"

import Home from "./components/views/Home";
import Contacts from "./components/views/Contacts";

Vue.use(VueRouter);

export const router = new VueRouter({
    routes:[
        {path:"/", component: Home},
        {path:"/contacts", component: Contacts}
    ]
});