<template>
  <div id="app">
    <div class="content">
      <h1>Search</h1>
      <div>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>

        <form id="searchForm" @submit="checkForm">
          <p>
            <label for="search">Search</label>
            <input type="text" name="search" id="search" v-model="input" />
          </p>
          <input class="submitButton" type="submit" value="Let's Go!" />
        </form>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="content" v-if="list">
        <ul>
          <li v-for="item in list" :key="item._id">{{ item.username }}</li>
        </ul>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {
    items() {
      return this.list.length;
    }
  },
  methods: {
    checkForm: function(e) {
      if (this.input) {
        this.search();
      }
      this.errors = [];

      if (!this.input) {
        this.errors.push("Enter a username to search.");
      }
      e.preventDefault();
    },
    search: function() {
      this.$http
        //.post("https://addresio.herokuapp.com/user/login", {
        .post(
          "http://localhost:4000/user/search",
          { username: this.input },
          { headers: { token: localStorage.getItem("user") } }
        )
        .then(response => (this.list = response.data))
        .catch(function(error) {
          console.log(error);
        });
        console.log(this.list);
    },
        addfriend: function() {
      this.$http
        //.post("https://addresio.herokuapp.com/user/login", {
        .post(
          "http://localhost:4000/user/search",
          { username: this.input },
          { headers: { token: localStorage.getItem("user") } }
        )
        .then(response => (this.list = response.data))
        .catch(function(error) {
          console.log(error);
        });
        console.log(this.list);
    }
  },
  data: function() {
    return {
      errors: [],
      input: null,
      list: null
    };
  },
  mounted() {}
};
</script>
