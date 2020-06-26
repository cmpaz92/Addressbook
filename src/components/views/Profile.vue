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
                <label :for="value['name']+index">{{ value["name"] }}</label>
                <input
                  v-model="value['value']"
                  :id="value['name']+index"
                  type="text"
                  :placeholder="value['name']"
                  :name="value['name']"
                />
                <div class="groupField">
                  <label class="typo__label">Privacy</label>
                  <multiselect
                    v-model="smgroups2[index]"
                    :options="groups"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick some"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >{{ values.length }} options selected</span>
                    </template>
                  </multiselect>
                </div>
                <!--   <ul id="v-for-groups">
                  <li v-for="(value, index) in groups" :key="index">
                    <input type="checkbox" :id="value.name" :value="value.name" v-model="newfield" />
                    <label for="value.name">{{value.name}}</label>
                  </li>
                </ul>-->
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
          // this.groups = this.items.data.groups;
          for (const gp in this.items.data.groups) {
            this.groups.push({ name: this.items.data.groups[gp].name });
          }

          this.socialmedia = this.items.data.socialmedia;
          var arr = [];
          for (const sm in this.socialmedia) {
            console.log(this.socialmedia[sm].group);
            for (const smg in this.socialmedia[sm].group) {
              console.log(this.socialmedia[sm].group[smg])
            //  this.smgroups[sm] = this.socialmedia[sm].group;
           /* arr.push({ name: this.socialmedia[sm]['group'] });
            this.smgroups[sm] = arr;*/
            }
          }

          console.log(arr);

          console.log();
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
      console.log(this.newfield);
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
      this.socialmedia.push({ name: this.newfield, value: "", group: [1] });
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
