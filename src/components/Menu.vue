<template>
  <div>
    <button @click="create">nytt spel</button>
    <br><br>
    <input v-model="roomCode" placeholder="#AAA"/>
    <button @click="join">delta</button>
  </div>
</template>

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
  }
}
</script>