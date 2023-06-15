<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <v-btn variant="tonal" @click="connect">Connect</v-btn> -->

  <router-view />
</template>

<script>
// import JsSIP from "jssip";

export default {
  methods: {
    connect() {
      // const socket = new JsSIP.WebSocketInterface("ws://localhost:8080");
      // this.$store.commit("updateSocket", socket);
    },
  },
};
</script>

<!-- <script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
 -->
