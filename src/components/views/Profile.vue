<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="header">
          <h1>My Information</h1>
        </div>
        <div class="contactContainer">
          <form class="Details" v-if="items">      
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="email" v-bind="items.data.email" />        
          </form>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>Add New</h1>
        </div>
        <div>
          <form class="contactForm">
            <input type="text" placeholder="Facebook" />
            <input type="text" placeholder="Twitter" />
            <input type="text" placeholder="Instagram" />
            <input type="text" placeholder="Youtube" />
            <input class="submitButton" type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let api = "http://localhost:4000";
//let api = "https://addresio.herokuapp.com";
export default {
  name: "MySocial",
  methods: {
    getuser: function() {
      console.log(this.$store.getters.userID);
        this.$http
        //.post("https://addresio.herokuapp.com/user/signup", {
        .get(api+"/user/" + this.$store.getters.userID, {
          headers: { token: this.$store.getters.token }
        })
         .then(response => (this.items = response))
        .catch(function(error) {
          console.log(error);
        });
    },
    updateuser: function() {
      this.$http
        //.post("https://addresio.herokuapp.com/user/signup", {
        .get(this.$api+"/user/" + localStorage.getItem("id"), {
          headers: { token: localStorage.getItem("user") }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  data: function() {
    return {
      items: null,
      email: null
    };
  },
  mounted() {
    this.getuser();
  }
};
</script>

<style>
</style>
