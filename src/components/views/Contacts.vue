<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="header">
          <h1>My Contacts</h1>
        </div>
        <div class>
          <div class="content-friends" v-if="friends.length">
            <ul>
              <li
                v-for="friend in friends"
                v-on:click="show(friend.data.id)"
                :key="friend.data.id"
              >{{ friend.data.username }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>Contact Info</h1>
          <ul>
            <ul>
              <li
                v-for="friend in friends"
                v-on:click="show(friend.data.id)"
                :key="friend.data.id"
              >{{ friend.data.s }}</li>
            </ul>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  methods: {
    getlist: function() {
      console.log(this.$store.getters.userID);
      this.$http
        .get(this.$api + "/user/" + this.$store.getters.userID, {
          headers: { token: this.$store.getters.token }
        })
        .then(response => {
          this.friendsID = response.data.friends;
          this.getfriend();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getfriend: function() {
      let users = [];
      let promises = [];
      for (let i = 0; i < this.friendsID.length; i++) {
        promises.push(
          this.$http
            .get(this.$api + "/user/" + this.friendsID[i], {
              headers: { token: this.$store.getters.token }
            })
            .then(response => {
              // do something with response
              this.friends.push(response);
            })
        );
      }

      Promise.all(promises).then(() => console.log(users));
    },
    show: function(f) {
      console.log(f);
    }
  },
  mounted() {
    this.getlist();
  },
  created() {},
  data() {
    return {
      friendsID: [],
      friends: [],
      currentuser: null
    };
  }
};
</script>

<style>
.container {
  -webkit-box-shadow: 14px 15px 0px -3px#394140;
  -moz-box-shadow: 14px 15px 0px -3px#394140;
  box-shadow: 14px 15px 0px -3px#394140;
  border-radius: 8px 8px 8px 8px;
  -moz-border-radius: 8px 8px 8px 8px;
  -webkit-border-radius: 8px 8px 8px 8px;
  margin: auto;
  margin-top: 40px;
  display: flex;
  width: 80%;
  min-height: 400px;
  color: white;
  overflow: auto;
}

.left,
.right {
  padding: 20px 20px 20px 20px;
  width: 50%;
  font-size: 20px;
  background-color: rgb(165, 165, 165);
}

.left {
  border-right: solid 2px white;
}

.header {
  display: flex;
  justify-content: space-evenly;
  margin: auto;
  width: 30%;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: solid 2px white;
  margin-bottom: 30px;
}

.contactContainer {
  display: flex;
  justify-content: space-around;
}

.contactNames {
  display: table;
  flex-direction: column;
  align-content: center;
}

.contactElement {
  font-size: 13px;
  vertical-align: middle;
  display: table-cell;
}

.contactSocial {
  display: table;
  flex-direction: column;
  align-content: center;
}

.contactForm {
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  color: white;
}
li {
  background: #333;
  color: white;
  padding: 8px 0;
  margin: 0;
  cursor: pointer;
}
li:nth-child(odd) {
  background: #444;
  color: white;
}
li:hover {
  background: #999 !important;
  color: #333 !important;
}
</style>
