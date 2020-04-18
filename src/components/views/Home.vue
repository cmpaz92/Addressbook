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
  .content{
    padding:5px 40px 20px 40px;
    color:white;
    margin:auto;
    width: 30%;
    background-color: #969691;
    border: 0px solid #000000;
    -webkit-box-shadow: 14px 15px 0px -3px#394140;
    -moz-box-shadow: 14px 15px 0px -3px#394140;
    box-shadow: 14px 15px 0px -3px#394140;
    border-radius: 8px 8px 8px 8px;
    -moz-border-radius: 8px 8px 8px 8px;
    -webkit-border-radius: 8px 8px 8px 8px;
    margin-top:40px;
  }

  h1{
    color:white;
    text-decoration: none;
    font-size: 20px;
    font-weight:400;
  }

  .infoParagraph{
    margin:0px;
    margin-bottom: 20px;
  }

  button.getStartedButton{
    background-color: transparent;
    border: 2px white solid;
    color: white;
    padding: 10px 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    transition: ease 200ms;
  }

  button.getStartedButton:hover{
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
