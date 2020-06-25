<template>
  <div id="app">
    <div class="container">
      <div class="left profile">
        <div class="header">
          <h1>Profile</h1>
        </div>
        <div v-if="items">
          <p>
            <span>Username:</span>
            {{ items.data.username }}
          </p>
          <p>
            <span>Email:</span>
            {{ items.data.email }}
          </p>
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
            <input v-model="youtube" id="yutube" type="text" placeholder="youtube" name="youtube" />
            
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
      this.$http
        .post(
          this.$api + "/user/get",
          { id: this.$store.getters.userID },
          {
            headers: { token: this.$store.getters.token }
          }
        )
        .then(response => {
          this.items = response;
          this.phone = this.items.data.socialmedia.phone;
          this.facebook = this.items.data.socialmedia.facebook;
          this.twitter = this.items.data.socialmedia.twitter;
          this.instagram = this.items.data.socialmedia.instagram;
          this.youtube = this.items.data.socialmedia.youtube;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update: function() {
      var data = {
        id: this.$store.getters.userID,
        sm: {
          phone: this.phone,
          facebook: this.facebook,
          twitter: this.twitter,
          instagram: this.instagram,
          youtube: this.youtube
        }
      };
      this.$http
        .post(this.$api + "/user/update", data, {
          headers: { token: this.$store.getters.token }
        })
        .then(response => {
          this.status = "updated";
          console.log(response);
        })
        .catch(error => {
          this.status = "error";
          console.log(error);
        });
    },
    addField(){
      this.applicants.push({
        previous:'',
        expiration: ''
      })
    },
    deleteField(counter){
      this.applicants.splice(counter,1);
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
</style>
