<template>
  <div class="">
    <button class="btn" @click="create">nytt spel</button>
    <div class="input-group col-4">
      <input v-model="roomCode" type="text" class="form-control" placeholder="#AAA" aria-label="Room code">
      <div class="input-group-append">
        <button class="btn" @click="join" type="button">delta</button>
      </div>
    </div>
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