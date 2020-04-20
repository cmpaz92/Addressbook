<template>
  <div id="app">
    <div class="content">
        <h1>Let's collect!</h1>
        <p class="infoParagraph">Addressio helps to store all your social media profiles in one place. It makes it easy to share and find 
          people - see it as an universal addressbook that collects and connects! 
        </p>
        <router-link to="/signup"><button class="getStartedButton">Get Started</button></router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>

export default {
  name: 'Home',
  methods:{

  },
  mounted(){

  },
  data(){
    return{

    }  
  }
}
</script>

<style>
  
</style>
