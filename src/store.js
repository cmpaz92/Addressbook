import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let api = "http://localhost:4000";
//let api = "https://addresio.herokuapp.com";

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        uid: null,
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, { token, user }) {
            state.status = 'success'
            state.token = token
            state.uid = user._id;
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: api + "/user/login", data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        console.log(user);
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', { token, user })
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err.response)
                    })
            })
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: api + "/user/signup", data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', { token, user })
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err.response)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve/*, reject*/) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
       /* update({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: api + "/user/login", data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', { token, user })
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },*/
    },
    getters: {
        isLoggedIn: state => !!state.token,
        userID: state => state.uid,
        authStatus: state => state.status,
        token: state => state.token,
    },
})

