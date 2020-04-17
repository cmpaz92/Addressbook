<template>
  <div id="app">
    <div class="content">
      <h1>Sign Up</h1>
      <div>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>
        <ul>
          <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
        </ul>
        <form id="signupForm" @submit="checkForm">
          <p>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model="username" />
          </p>
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
  name: "Signup",

  methods: {
    checkForm: function(e) {
      if (this.username && this.email && this.password) {
        this.signup();
        this.$router.push("/contacts");
      }
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      e.preventDefault();
    },
    signup: function() {
      this.$http
        .post(this.$api+"/user/signup", {
        //.post("http://localhost:4000/user/signup", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(function(response) {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data.token));
            localStorage.setItem("id", JSON.stringify(response.data.user.id));
            this.user = localStorage.getItem("user");
            this.id = localStorage.getItem("id");
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
      username: null,
      email: null,
      password: null,
      id: null
    };
  },
  mounted() {}
};
</script>

<style>
</style>
