<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="header">
          <h1>My Contacts</h1>
        </div>
        <div class="contactContainer">
          <div class="contactNames">
            <ul>
              <li className="contactElement">Daniel Schneider:</li>
              <li className="contactElement">Daniel Schneider:</li>
              <li className="contactElement">Daniel Schneider:</li>
            </ul>
          </div>
          <div class="contactSocial">
            <ul>
              <li className="contactElement">
                <a href="https://www.facebook.com/"><span> Facebook </span></a>|
                <a href="https://twitter.com/explore"><span> Twitter </span></a
                >|
                <a href="https://www.instagram.com/"><span> Instagram </span></a
                >|
                <a href="https://www.youtube.com/"><span> Youtube </span></a>
              </li>
              <li className="contactElement">
                <a href="https://www.facebook.com/"><span> Facebook </span></a>|
                <a href="https://twitter.com/explore"><span> Twitter </span></a
                >|
                <a href="https://www.instagram.com/"><span> Instagram </span></a
                >|
                <a href="https://www.youtube.com/"><span> Youtube </span></a>
              </li>
              <li className="contactElement">
                <a href="https://www.facebook.com/"><span> Facebook </span></a>|
                <a href="https://twitter.com/explore"><span> Twitter </span></a
                >|
                <a href="https://www.instagram.com/"><span> Instagram </span></a
                >|
                <a href="https://www.youtube.com/"><span> Youtube </span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <h1>Add New</h1>
        </div>
        <div>
          <form class="contactForm">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Facebook" />
            <input type="text" placeholder="Twitter" />
            <input type="text" placeholder="Instagram" />
            <input type="text" placeholder="Youtube" />
            <input class="submitButton" type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contacts",
  methods: {},
  mounted() {},
  data() {
    return {};
  },
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
</style>
