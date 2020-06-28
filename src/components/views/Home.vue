<template>
  <div id="app">
    <div class="content">
      <img src="@/assets/logo.png" />

      <p
        class="infoParagraph"
      >Kipiu is a tool that helps you store all your social media profiles in one place.</p>
      <p>
        It makes it easy to have an updated contact addressbook
        - see it as a universal addressbook that collects and connects!
      </p>
      <p>Let's Kip Iu connected!</p>
      <router-link to="/signup">
        <button class="getStartedButton">Get Started</button>
      </router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {},
  mounted() {},
  data() {
    return {};
  }
};
</script>

<style>
</style>
