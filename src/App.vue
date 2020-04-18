<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <p class="navElement">Home</p>
      </router-link>
      <span v-if="isLoggedIn">
        <router-link to="/contacts">
          <p class="navElement">Contacts</p>
        </router-link>
        <router-link to="/mySocial">
          <p class="navElement">My Socials</p>
        </router-link>
        <router-link to="/search">
          <p class="navElement">Search</p>
        </router-link>
      </span>
      <router-link to="/signUp">
        <p class="navElement">Sign Up</p>
      </router-link>
      <router-link to="/login">
        <p class="navElement">Login</p>
      </router-link>
      <span v-if="isLoggedIn">
        <a @click="logout">Logout</a>
      </span>
    </div>
      <router-view />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
  background-color: #eff1f0;
}

button {
  outline: none;
}

a {
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  color: white;
  cursor: pointer;
}

input {
  margin-top: 20px;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  border-bottom: 2px white solid;
}

.headerHeader {
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  width: 30%;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: solid 3px black;
}

ul {
  list-style-type: none;
  padding-left: 0px;
}

li {
  font-size: 14px;
  margin-bottom: 5px;
}

span {
  font-weight: bold;
  cursor: default;
}

.logo {
  width: 40px;
  height: auto;
  position: relative;
  top: 25%;
}

h1 {
  cursor: default;
}

.navElement {
  color: black;
}

input.submitButton {
  border-radius: 3px 3px 3px 3px;
  -moz-border-radius: 3px 3px 3px 3px;
  -webkit-border-radius: 3px 3px 3px 3px;
  width: fit-content;
  margin-top: 20px;
  border: solid white 2px;
  color: white;
  padding: 10px;
  cursor: pointer;
  outline: none;
}

input.submitButton:hover {
  border: solid 2px transparent;
  background-color: #394140;
  transition: ease 200ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-2em);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 800ms ease;
}
</style>
