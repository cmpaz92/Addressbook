<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="header">
          <h1>Profile</h1>
        </div>
        <div v-if="items">
          <p>Username: {{ items.data.username }}</p>
          <p>Email: {{ items.data.email }}</p>
          <p type="email" name="email" id="email"></p>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>My Social Networks</h1>
        </div>
        <div>
          <form id="socialnetworks" @submit.prevent="update" class="contactForm">
            <div class="message true" v-if="status === 'updated'">
              <p>Updated Social Media</p>
            </div>
            <div class="message false" v-if="status === 'error'">
              <p>Error Updating</p>
            </div>
            <label for="phone">Phone</label>
            <input v-model="phone" id="phone" type="tel" placeholder="phone" name="Phone" />
            <label for="facebook">Facebook</label>
            <input
              v-model="facebook"
              id="facebook"
              type="text"
              placeholder="facebook"
              name="facebook"
            />
            <label for="twitter">Twitter</label>
            <input v-model="twitter" id="twitter" type="text" placeholder="twitter" name="twitter" />
            <label for="instagram">Instagram</label>
            <input
              v-model="instagram"
              id="instagram"
              type="text"
              placeholder="instagram"
              name="instagram"
            />
            <label for="youtube">Youtube</label>
            <input class="submitButton" type="submit" value="Save!" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  methods: {
    getuser: function() {
      console.log(this.$store.getters.userID);
      this.$http
        .get(this.$api + "/user/" + this.$store.getters.userID, {
          headers: { token: this.$store.getters.token }
        })
        .then(response => {
          this.items = response;
          this.phone = this.items.data.socialmedia.phone;
          this.facebook = this.items.data.socialmedia.facebook;
          this.twitter = this.items.data.socialmedia.twitter;
          this.instagram = this.items.data.socialmedia.instagram;
          this.youtube = this.items.data.socialmedia.youtube;
          console.log(this.items.data.socialmedia.facebook);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update: function() {
      let data = {
        phone: this.phone,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        youtube: this.youtube
      };
      this.$http
        .post(
          this.$api + "/user/update/" + this.$store.getters.userID,
          {
            fb: data.facebook,
            ig: data.instagram,
            ph: data.phone,
            tw: data.twitter,
            yt: data.youtube
          },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(response => {
          this.status = "updated";
          console.log(response);
        })
        .catch(error => {
          this.status = "error";
          console.log(error);
        });
    }
  },
  data: function() {
    return {
      items: null,
      email: null,
      networks: null,
      phone: null,
      facebook: null,
      twitter: null,
      instagram: null,
      youtube: null,
      status: false
    };
  },
  created() {
    this.getuser();
  }
};
</script>

<style>
.message {
  font-size: 13px;
  margin: 0;
  padding: 2px;
  line-height: 0px;
}
.message.true {
  background-color: green;
}

.message.error {
  background-color: red;
}
</style>
