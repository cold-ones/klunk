<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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
    }
  },
  created() {
    this.socket.on("host", () => {
      this.$store.state.host = true;
    });
    this.socket.on("empty", () => {
      alert("rummet finns inte :(");
      if (this.$router.path !== "/") {
        this.$router.push("/");
      }
    });
  },
};
</script>
