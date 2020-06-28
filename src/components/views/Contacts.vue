<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <div v-if="listfr.length > 0">
        <div class="content">
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
            <p>
              You don't have any friends yet. Go to
              <a href="/search">Search</a> to find new contacts
            </p>
          </div>
          <div class="content-friends" v-if="friends.length">
            <ul>
              <li
                v-for="friend in friends"
                v-on:click="showuser(friend.id)"
                :key="friend.id"
                @click="activate(friend.id)"
                :class="{ active : active_el == friend.id }"
              >
                {{ friend.name }}
                <span>{{ friend.username }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header" v-if="currentuser">
          <h1>Contact Info</h1>
        </div>
        <div class="userinfo" v-if="currentuser">
          <h3>
            {{ currentuser.name}}
          </h3>
          <ul id="v-for-object" class="demo">
               <li>
              <h4>Username:</h4>
              <span class="smitem">{{ currentuser.username}}</span>
            </li>
             <li>
              <h4>Email:</h4>
              <span class="smitem">{{ currentuser.email}}</span>
            </li>
            <li v-for="(item, index) in currentuser.socialmedia" :key="index">
              <h4>{{item.name}}:</h4>
              <span class="smitem">{{ item.value }}</span>
            </li>
          </ul>
          <input
            type="checkbox"
            id="privacy"
            v-model="currentuserprivacy"
          />
          <label class="lblprivacy" for="privacy">Add user to private group</label>
           <button class="btnupdate" type="button" v-on:click="updateprivacy(currentuser.id,currentuserprivacy)">Update Privacy</button>
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
      if (this.currentuser == null || this.currentuser.id != uid) {
        this.$http
          .post(
            this.$api + "/user/getcontact",
            { uid: uid, id: this.$store.getters.userID },
            {
              headers: { token: this.$store.getters.token }
            }
          )
          .then(response => {
            this.currentuser = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });

        this.$http
          .post(
            this.$api + "/user/permission",
            { uid: uid, id: this.$store.getters.userID },
            { headers: { token: this.$store.getters.token } }
          )
          .then(response => {
            if (response.data == "true") {
              this.currentuserprivacy = true;
            } else if (response.data == "false") {
              this.currentuserprivacy = false;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    updateprivacy: function(uid, p) {
      this.$http
        .post(
          this.$api + "/user/updateprivacy",
          { id: this.$store.getters.userID, uid: uid, privacy: p },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(() => {
          this.$swal.fire({
            text: "Updated privacy!",
            icon: "success",
            timer: 3000,
            toast: true,
            position: "top-end"
          });
        })
        .catch(error => {
          this.$swal.fire({
            text: "Error Updating, try again!",
            icon: "error",
            timer: 3000,
            toast: true,
            position: "top-end"
          });
          console.log(error);
        });
    },
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
        .then(() => {
          this.init();
          this.getfriends();
          this.frequests();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    init: function() {
      this.friendsID = [];
      this.friends = [];
      this.listfr = [];
    },
    activate: function(el) {
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
      active_el: 0,
      currentuser: null,
      currentuserprivacy: false,
    };
  }
};
</script>

<style>
</style>
