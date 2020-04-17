<template>
  <div id="app">
    <div class="content">
      <h1>Login</h1>
      <div>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>
        <ul>
          <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
        </ul>
        <form id="loginForm" @submit="checkForm">
          <p>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />
          </p>
          <p>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="password" />
          </p>
          <input class="submitButton" type="submit" value="Let's Go!" />
        </form>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {
    loggedIn() {
      return localStorage.getItem("user");
    }
  },
  created() {
    if (this.loggedIn) {
      this.user = localStorage.getItem("user");
      this.$router.push("/");
    }
  },
  methods: {
    checkForm: function(e) {
      if (this.email && this.password) {
        this.login();
      }
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      e.preventDefault();
    },
    login: function() {
      this.$http
        .post(this.$api+"/user/login", {
       //.post("http://localhost:4000/user/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          
          if (response.data.token) {
            console.log(response.data.user._id);
            localStorage.setItem("user", response.data.token);
            localStorage.setItem("id", response.data.user._id);
            this.$user = localStorage.getItem("user");
            this.$id = localStorage.getItem("id");
            this.$router.push("/mysocial");
          }
        })
        .catch(function(error) {
          console.log(error);
          this.errors.push("incorrect Credentials.");
        });
    }
  },
  data: function() {
    return {
      errors: [],
      email: null,
      password: null
    };
  },
  mounted() {}
};
</script>

<style>
</style>
