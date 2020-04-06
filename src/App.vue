<template>
  <div id="app">
    <div class="headerHeader">
        <!-- <img class="logo" src="./assets/logo.png"> -->
        <span>Addressio</span>
      <div>
        <router-link to="/"><p class="navElement">Home</p></router-link>
        <router-link to="/contacts"><p class="navElement">Contacts</p></router-link>
        <router-link to="/mySocial"><p class="navElement">My Socials</p></router-link>
        <router-link to="/signUp"><p class="navElement">Sign Up</p></router-link>
        <router-link to="/login"><p class="navElement">Login</p></router-link>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html{
  background-color:#EFF1F0;
}

button {
  outline: none;
}

a {
  text-decoration: none;
  margin:0px;
  padding:0px;
  color: white;
  cursor: pointer;
}

input{
  margin-top: 20px;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  border-bottom: 2px white solid;
}

.headerHeader{
  display: flex;
  justify-content: space-evenly;
  margin:auto;
  width:30%;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: solid 3px black;
}

ul {
    list-style-type: none;
    padding-left:0px;
}

li{
  font-size: 14px;
  margin-bottom: 5px;
}

span{
  font-weight: bold;
  cursor: default;
}

.logo{
  width:40px;
  height:auto;
  position: relative;;
  top:25%;
}

h1{cursor: default;}

.navElement{
  color:black;
}

input.submitButton{
  border-radius: 3px 3px 3px 3px;
  -moz-border-radius: 3px 3px 3px 3px;
  -webkit-border-radius: 3px 3px 3px 3px;
  width: fit-content;
  margin-top: 20px;
  border: solid white 2px;
  color: white;
  padding:10px;
  cursor: pointer;
  outline: none;
}

input.submitButton:hover{
  border: solid 2px transparent;
  background-color: #394140;
  transition: ease 200ms;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
  transform:translateX(-2em);
}

.fade-enter-active, .fade-leave-active{
  transition:all 800ms ease;
}
</style>
