<template>
  <div id="app">
    <div id="profile" class="container">
      <div class="innercontainer">
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
    </div>
    <div id="profilesn" class="container">
       <div class="innercontainer">
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
             <input class="submitButton" type="submit" value="Save" />
            <ul id="v-for-object" class="demo">
              <li v-for="(value, index) in socialmedia" :key="index">
                <label class="lblinput" :for="value['name']+index">{{ value["name"] }}</label>
                <input
                class="fldinput"
                  v-model="value['value']"
                  :id="value['name']+index"
                  type="text"
                  :placeholder="value['name']"
                  :name="value['name']"
                />
	<label class="lock">
    <input class="chkprivate" type="checkbox" :id="'checkbox'+index" v-model="value['privacy']">
     <label class="lblprivate" :for="'checkbox'+index">{{value['privacy'] ? 'Private' : 'General'}}</label>
  </label>

               
                
                

                <button class="btndelete" type="button" v-on:click="deleteField(index)">X</button>
              </li>
            </ul>
           
          </form>

          <form id="Addfield" @submit.prevent="addField" class="addField">
            <input
              v-model="newfield"
              id="newfield"
              type="text"
              placeholder="New Field Name"
              name="newfield"
            />
            <input class="submitButton addfield" type="submit" value="Add New" />
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
          { headers: { token: this.$store.getters.token } }
        )
        .then(response => {
          this.items = response;
          this.socialmedia = this.items.data.socialmedia;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update: function() {
      var data = {
        id: this.$store.getters.userID,
        sm: this.socialmedia
      };

      this.$http
        .post(this.$api + "/user/update", data, {
          headers: { token: this.$store.getters.token }
        })
        .then(() => {
          this.$swal.fire({
            text: "Update succesful!",
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
    addField() {
      this.socialmedia.push({ name: this.newfield, value: "", privacy: 'false' });
      this.newfield = "";
    },
    deleteField(item) {
      console.log(item);
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.socialmedia.splice(item, 1);
            this.update();
            this.$swal.fire("Deleted!", "Field removed.", "success");
          }
        });
    }
  },
  data: function() {
    return {
      socialmedia: {},
      groups: [],
      smgroups: {},
      smgroups2: {},
      items: null,
      valuel: null,
      newfield: null,
      email: null,
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
