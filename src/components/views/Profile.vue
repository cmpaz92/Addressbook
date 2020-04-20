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
            <input v-model="phone" type="tel" placeholder="Phone" name="Phone" />
            <input v-model="facebook" type="text" placeholder="Facebook" name="Facebook" />
            <input v-model="twitter" type="text" placeholder="Twitter" name="Twitter" />
            <input v-model="instagram" type="text" placeholder="Instagram" name="Instagram" />
            <input v-model="youtube" type="text" placeholder="Youtube" name="Youtube" />
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
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    /*getfriend: function(fid) {
      this.$http
        .get(this.$api + "/user/" + fid, {
          headers: { token: this.$store.getters.token }
        })
        .then(response => {this.friends.push(response.data.username); console.log(response)})
        .catch(function(error) {
          console.log(error);
        });
    },*/
    update: function() {
      let data = {
        phone: this.phone,
        facebook: this.facebook,
        twitter: this.twitter,
        instagram: this.instagram,
        youtube: this.youtube
      };
       this.$http
        .post(this.$api+"/user/update/" + this.$store.getters.userID, 
         { fb: data.facebook, fig: data.instagram },
        {
          headers: { token: this.$store.getters.token }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });

      /*  socialMediaHandles: {
    github: 'vkarpov15',
    twitter: '@code_barbarian'
  })*/
      /*  this.$store
        .dispatch("login", { formData})
        .then()
        .catch(err => console.log(err));
    }*/
      /* updateuser: function() {
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
        });*/
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
      youtube: null
    };
  },
  created() {
    this.getuser();
  }
};
</script>

<style>
</style>
