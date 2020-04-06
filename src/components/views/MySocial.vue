<template>
  <div id="app">
      <div class="container">
        <div class="left">
          <div class="header">
            <h1>My Socials</h1>
          </div>
            <div class="contactContainer">
              <div class="contactNames">
                <ul>
                <li className="contactElement"> 
                  <a href="https://www.facebook.com/"><span> Facebook </span></a>|
                  <a href="https://twitter.com/explore"><span> Twitter </span></a>|
                  <a href="https://www.instagram.com/"><span> Instagram </span></a>|
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
              <input type="text" placeholder="Facebook">
              <input type="text" placeholder="Twitter">
              <input type="text" placeholder="Instagram">
              <input type="text" placeholder="Youtube">
              <input class="submitButton" type="submit" value="Add">
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'MySocial',
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
