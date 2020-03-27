<template>
  <div id="app">
    <div class="header">
        <img class="logo" src="./assets/logo.png">
      <div>
        <router-link to="/"><p class="navElement">Home</p></router-link>
        <router-link to="/contacts"><p class="navElement">Collection</p></router-link>
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
  margin-top: 40px;
  width: 100vw;

}

html{
  background-color:#EFF1F0;
}

button {
  outline: none;
}

a {
  text-decoration: none;
}

.header{
  display: flex;
  justify-content: space-evenly;
  margin:auto;
  width:30%;
  flex-wrap: wrap;
  align-items: center;
}

.logo{
  width:40px;
  height:auto;
  position: relative;;
  top:25%;
}

.navElement{
  color:black;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
  transform:translateX(-2em);
}

.fade-enter-active, .fade-leave-active{
  transition:all 800ms ease;
}
</style>
