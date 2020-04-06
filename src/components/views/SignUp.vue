<template>
  <div id="app">
    <div class="content">
        <h1>Sign Up</h1>
          <div>
            <form class="contactForm">
              <input type="text" placeholder="Username">
              <input type="text" placeholder="Email">
              <input type="text" placeholder="Password">
              <input class="submitButton" type="submit" value="Let's Go!">
            </form>
          </div>
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
