<template>
  <div id="app">
    <div class="content">
      <h1>Login</h1>
      <div>
        <div v-if="errors.length" class="alert">
          <p>
            <b>Please correct the following error(s):</b>
          </p>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>
        <form id="loginForm" @submit.prevent="checkForm">
          <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="password" />
          </div>
          <input class="submitButton" type="submit" value="Login" />
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
      password: null
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push("/profile");
          this.$swal.fire({
            text: "Welcome!",
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end"
          });
        })
        .catch(err => {
          err.data.errors
            ? this.errors.push(err.data.errors["0"].msg)
            : this.errors.push(err.data.message);
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
