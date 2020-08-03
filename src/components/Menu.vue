<template>
  <div class="daddy">
    <h1>dricka.</h1>
    <button class="btn" @click="create">Nytt spel</button>
    <div class="join">
      <div class="container-4">
        <input v-model="roomCode" maxlength="3" placeholder="#AAA" id="search" type="search"/>
        <button @click="join" class="icon">Delta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    display: inline-block;
    position: absolute;
    left: 5%;
    bottom: calc(45vh - 150px);
    font-size: 3em;
    font-weight: 600;
    color:white;
  }
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
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
</style>

<script>
export default {
  props: ['host','socket'],
  data () {
    return {
      roomCode: '',
    };
  },
  methods: {
    create () {
      this.$emit('update:host', true)
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