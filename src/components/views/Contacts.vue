<template>
  <div id="app">
        <transition name="fade" mode="out-in" >
          <div v-if="listfr.length > 0">
      <div class="content" >
        <h2>Friend Request</h2>
        <div class="friends">
          <ul v-for="item in listfr" :key="item._id">
            <li class="friendsfriends">
              <span class="searchItem">{{ item.username}}</span>
              <button class="submitButton" v-on:click="fresponse(item.frid,1)">Accept</button>
              <button class="submitButton" v-on:click="fresponse(item.frid,2)">Reject</button>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </transition>
    <div id="contacts" class="container contact">
      <div class="left">
        <div class="header">
          <h1>My Contacts</h1>
        </div>
        <div>
          <div v-if="friends.length == 0">
            <p>You don't have any friends yet. Go to <a href="/search">Search</a> to find new contacts</p>
          </div>
          <div class="content-friends" v-if="friends.length">
            <ul>
              <li
                v-for="friend in friends"
                v-on:click="showuser(friend.id)"
                :key="friend.id" @click="activate(friend.id)" :class="{ active : active_el == friend.id }"
              >{{ friend.name }} <span>{{ friend.username }}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>Contact Info</h1>
        </div>
        <div class="userinfo" v-if="currentuser">
          <h3>{{ currentuser.name}}<span>{{ currentuser.username}}</span></h3>
            <ul id="v-for-object" class="demo">
              <li v-for="(item, index) in currentuser.socialmedia" :key="index">
             <h4>{{item.name}}:</h4>
              <span>{{ item.value }}</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  methods: {
    getfriends: function() {
      this.$http
        .post(
          this.$api + "/friends/friendslist",
          { id: this.$store.getters.userID },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(response => {
          this.friends = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showuser: function(uid) {
      console.log(uid);
      if(this.currentuser == null || this.currentuser.id != uid){
     this.$http
        .post(this.$api + "/user/get" , {id : uid},{
          headers: { token: this.$store.getters.token }
        })
        .then(response => {
          this.currentuser = response.data;
          console.log(this.currentuser);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
  /*  show: function(f) {
      console.log(f);
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i].data.id == f) {
          this.currentuser = this.friends[i].data;
        }
      }
      console.log(f);
    },*/
    frequests: function() {
      this.$http
        .post(
          this.$api + "/friends/friendrequests",
          { id: this.$store.getters.userID },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(response => (this.listfr = response.data))
        .catch(function(error) {
          console.log(error);
        });
    },
    fresponse: function(frid, t) {
      this.$http
        .post(
          this.$api + "/friends/friendresponse",
          { frid: frid, type: t },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(() => {this.init();this.getfriends();
    this.frequests();})
        .catch(function(error) {
          console.log(error);
        });
    },
    init: function() {
      this.friendsID = [];
      this.friends = [];
      this.listfr = [];
    },
    activate:function(el){
        this.active_el = el;
    }
  },

  mounted() {
    this.getfriends();
    this.frequests();
  },
  created() {},
  data() {
    return {
      friendsID: [],
      friends: [],
      listfr: [],
      active_el:0,
      currentuser: null
    };
  }
};
</script>

<style>

</style>
