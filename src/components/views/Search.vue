<template>
  <div id="app">
    <div class="contentSearch">
      <h1>Search</h1>
      <div>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
        </p>

        <form id="searchForm" @submit="checkForm">
          <p>
            <label for="search">Username</label>
            <input type="text" name="search" id="search" v-model="input" />
          </p>
          <input class="submitButton" type="submit" value="Search" />
        </form>

        <div class="message true" v-if="status === 'updated'">
          <p>Friend Added</p>
        </div>
        <div class="message false" v-if="status === 'error'">
          <p>Error</p>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="list.length > 0">
        <div class="friends">
          <ul class="content">
            <li v-for="item in list" :key="item._id" class="friendsfriends">
              <span class="searchItem">{{ item.username}}</span>
              <span class="searchItem">{{ item.name}}</span>
              <button class="addFriend" v-on:click="addfriend(item._id)">Send Request</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="noresults" v-else-if="searched">
        <div class="content">
          <span class="searchmsg">Search returned no results, try another username</span>
        </div>
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
        .post(
          this.$api + "/user/search",
          { username: this.input },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(response => {
          this.list = response.data;
          this.searched = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addfriend: function(f_id) {
      this.$http
        .post(
          this.$api + "/friends/request",
          { id: this.$store.getters.userID, recid: f_id },
          { headers: { token: this.$store.getters.token } }
        )
        .then(() => {
          this.$swal.fire({
            text: "Friend request sent!",
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end"
          });
        })
        .catch(function(error) {
          console.log(error);
          this.status = "error";
        });
    }
  },
  data: function() {
    return {
      errors: [],
      input: null,
      list: [],
      searched: false,
      status: null
    };
  },
  mounted() {}
};
</script>

<style>
</style>