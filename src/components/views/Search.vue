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
        <div class="message true" v-if="status === 'updated'">
          <p>Friend Added</p>
        </div>
        <div class="message false" v-if="status === 'error'">
          <p>Error</p>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="content" v-if="list">
        <div class="friends">
          <ul v-for="item in list" :key="item._id">
            <li class="friendsfriends">
              <span class="searchItem">{{ item.username}}</span>
              <span class="searchItem">{{ item.email}}</span>
              <button class="searchItem" v-on:click="addfriend(item._id)">Add Friend</button>
            </li>
          </ul>
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
        .then(response => (this.list = response.data))
        .catch(function(error) {
          console.log(error);
        });
    },
    addfriend: function(f_id) {
      this.$http
        .post(
          this.$api + "/user/friend/" + f_id,
          { id: this.$store.getters.userID },
          { headers: { token: this.$store.getters.token } }
        )
        .then(response => {  this.status = "updated"; console.log(response)})
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
      list: null,
      status: null
    };
  },
  mounted() {}
};
</script>

<style>
.friends {
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.friendsfriends {
  display: flex;
  justify-content: space-around;
}

.searchItem {
  min-width: 100px;
  text-align: left;
}

button.searchItem {
  text-align: center;
}
</style>