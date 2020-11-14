<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div ref="test" class="daddy">
      <button class="btn" @click="create">Nytt spel</button>
      <div class="join">
        <div class="container-4">
          <input v-model="roomCode" maxlength="4" placeholder="#AAA" id="search" type="search"/>
          <button @click="join" class="icon">Delta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn {
    font-size: 1.5em;
    font-weight: 600;
    border-radius: 25px;
    border: none;
    height: 50px;
    width: 200px;
    padding: 5px 41px;
    background: #DE38C8;
    color: #fff;
  }
  .join {
    padding-top: 10px;
    width: 100%;
  }
  .daddy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  h1 {
    text-align: left;
    position: fixed;
    font-size: 2em;
    font-weight: 600;
    color:#fff;
  }
  .title {
    display: inline-block;
    left: 10%;
    top: 0.5em;
    font-size: 2.5em;
    font-weight: 600;
    color: #fff;
  }
</style>

<script>
export default {
  data () {
    return {
      roomCode: '',
    };
  },
  computed: {
    title() {
      return process.env.VUE_APP_TITLE || 'läs README.md';
    },
    socket() {
      return this.$store.state.socket;
    },
  },
  created () {
    this.socket.on("init", (roomCode) => {
      setTimeout(() => {
        this.$router.push({
          name: 'Game',
          params: { room: roomCode }
        });
      }, 500);
     });
  },
  methods: {
    create () {
      this.socket.emit("create");
      this.$store.state.animate();
      this.$store.state.host = true;
    },
    join () { this.socket.emit("join", this.roomCode); },
  },
  watch: {
    roomCode(val) {
      this.roomCode = val.toUpperCase().trim();
      if (this.roomCode.length > 0 && this.roomCode[0] != "#") {
        this.roomCode = "#" + this.roomCode;
      }
      if (this.roomCode.length == 1 && this.roomCode[0] == "#") {
        this.roomCode = "";
      }
    }
  }
}
</script>