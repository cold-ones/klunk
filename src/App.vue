<template>
  <div id="app">
    <div id="canvas" />
    <router-view />
  </div>
</template>

<script>
import P5 from 'p5';
import wave from "./assets/wave.js";

export default {
  data() {
    return {
      roomCode: "",
      wave: null,
    };
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
    host() {
      return this.$store.state.host;
    },
  },
  created() {
    this.wave = new P5(wave, "canvas");
    this.wave.callback = this.swipe;
    this.wave.locked = this.canSwipe;
    this.$store.state.animate = this.wave.swipe;

    this.socket.on("host", () => {
      this.$store.state.host = true;
    });
    this.socket.on("empty", () => {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      alert("rummet finns inte :(");
    });
  },
  methods: {
    swipe() { this.socket.emit("next"); },
    canSwipe() {
      return this.$store.state.host && this.$route.name == "Game";
      }
  },
};
</script>
