<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="header">
          <h1>my Social</h1>
        </div>
        <div class="contactContainer">
          <div class="contactNames">
            <ul>
              <ul id="example-1">
                <li v-for="item in this.items" :key="item.username">{{ item.username }}{{ item.email}}</li>
              </ul>
            </ul>
          </div>
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
export default {
  name: "MySocial",
  methods: {
    getuser: function() {
        this.$http
        //.post("https://addresio.herokuapp.com/user/signup", {
        .get(this.api+"/user/" + localStorage.getItem("id"), {
          headers: { token: localStorage.getItem("user") }
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
      items: null
    };
  },
  mounted() {
    this.getuser();
  }
};
</script>

<style>
</style>
