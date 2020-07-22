<template>
  <div class="daddy">
    <h1>dricka.</h1>
    <button @click="create">Nytt spel</button>
    <div class="join">
      <input v-model="roomCode" maxlength="3" type="text" placeholder="#AAA">
      <button class="half" @click="join" type="button">Delta</button>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    display: inline-block;
    position: absolute;
    left: 40px;
    bottom: calc(50vh - 150px);
    font-size: 3em;
    font-weight: 600;
    color:white;
  }
  button {
    font-size: 1.5em;
    font-weight: 600;
    border-radius: calc(47.5px / 2);
    border: none;
    padding: 5px 41px;
    background: #DE38C8;
    color: #fff;
  }
  input {
    font-size: 1.5em;
    font-weight: 600;
    height: 35px;
    width: 90px;
    margin: 0px;
    border: none;
    border-radius: calc(47.5px / 2) 0px 0px calc(47.5px / 2);
  }
  .half {
    padding: 5px 15px;
    border-radius: 0px calc(47.5px / 2) calc(47.5px / 2) 0px;
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
  }
</style>

<script>
export default {
  props: ['socket'],
  data () {
    return {
      roomCode: '',
    };
  },
  methods: {
    create () {
      this.socket.emit("create");
    },
    join () {
      this.socket.emit("join", this.roomCode);
    }
  },
  watch: {
    roomCode(val) {
      this.roomCode = val.toUpperCase();
    }
  }
}
</script>