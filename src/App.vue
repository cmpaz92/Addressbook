<template>
  <div id="app">
    <div id="nav">
      <router-link class="home" to="/">
        Home
      </router-link>
      <div v-if="isLoggedIn">
        <router-link to="/contacts">
          Contacts
        </router-link>
        <router-link to="/profile">
          Profile
        </router-link>
        <router-link to="/search">
          Search
        </router-link>
      </div>
      <div v-if="!isLoggedIn">
      <router-link to="/signUp">
        Sign Up
      </router-link>
      <router-link to="/login">
        Login
      </router-link>
      </div>
      <div v-if="isLoggedIn">
        <a @click="logout">Logout</a>
      </div>
    </div>
     <transition name="fade" mode="out-in">
     <router-view />
  </transition>
     
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {

    };
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(/*resolve, reject*/) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(this.logout);
        }
        throw err;
      });
    });
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
  @import './css/main.css';
</style>
