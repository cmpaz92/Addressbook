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
    <div class="container contact">
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
                :key="friend.id"
              >{{ friend.username }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>Contact Info</h1>
        </div>
        <div class="userinfo" v-if="currentuser">
          <h3>{{ currentuser.username}}</h3>
          <ul>
            <li>
              <span>Email:</span>
              {{ currentuser.email}}
            </li>
            <li v-if="currentuser.socialmedia.phone">
              <span>Phone:</span>
              {{ currentuser.socialmedia.phone}}
            </li>
            <li v-if="currentuser.socialmedia.facebook">
              <span>Facebook:</span>
              {{ currentuser.socialmedia.facebook}}
            </li>
            <li v-if="currentuser.socialmedia.instagram">
              <span>Instagram:</span>
              {{ currentuser.socialmedia.instagram}}
            </li>
            <li v-if="currentuser.socialmedia.youtube">
              <span>Youtube:</span>
              {{ currentuser.socialmedia.youtube}}
            </li>
            <li v-if="currentuser.socialmedia.twitter">
              <span>Twitter:</span>
              {{ currentuser.socialmedia.twitter}}
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
        .then(this.init())
        .catch(function(error) {
          console.log(error);
        });
    },
    init: function() {
      this.friendsID = [];
      this.friends = [];
      this.listfr = null;
      this.getfriends();
      this.frequests();
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

.userinfo li {
  height: 15px;
  cursor: unset;
}

.userinfo span {
  float: left;
  padding-left: 10px;
}

.contact li {
  background: #333;
  color: white;
  padding: 8px 0;
  margin: 0;
  cursor: pointer;
}
.contact li:nth-child(odd) {
  background: #444;
  color: white;
}
.contact li:hover {
  background: #999 !important;
  color: #333 !important;
}
</style>
