<template>
  <div id="app">
    <div class="content">
      <h1>Login</h1>
      <div>
        <div v-if="errors.length" class="errors">
        <p >
          <b>Please correct the following error(s):</b>
        </p>
        <ul >
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        </div>
        <form id="loginForm" @submit.prevent="checkForm">
          <p>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />
          </p>
          <p>
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
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
  data: function() {
    return {
      errors: [],
      email: null,
      password: null,
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/profile"))
        .catch(err => {
          err.data.errors ? this.errors.push(err.data.errors["0"].msg) : this.errors.push(err.data.message);
        });
    },
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
    }
  }
};
</script>

<style></style>
