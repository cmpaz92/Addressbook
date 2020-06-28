<template>
  <div id="app">
    <div class="content">
      <h1>Sign Up</h1>
      <div>
        <div v-if="errors.length" class="errors">
          <p>
            <b>Please correct the following error(s):</b>
          </p>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>
        <form id="signupForm" @submit="checkForm">
          <div>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" v-model="username" />
          </div>
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="name" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
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
  data: function() {
    return {
      errors: [],
      name: null,
      username: null,
      email: null,
      password: null
    };
  },
  methods: {
    checkForm: function(e) {
      if (this.username && this.email && this.password && this.name) {
        this.signup();
      }
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username required.");
      }
      if (!this.name) {
        this.errors.push("Name required.");
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
      let data = {
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/profile"))
        .catch(err => {
          err.data.errors
            ? this.errors.push(err.data.errors["0"].msg)
            : this.errors.push(err.data.message);
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
