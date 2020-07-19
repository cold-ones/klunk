<template>
  <div id="app">
    <Menu v-if="! roomCode" :socket="socket"/>
    <Game v-else :roomCode="roomCode" :socket="socket" />
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('192.168.43.1:3000');

import Menu from '@/components/Menu.vue';
import Game from '@/components/Game.vue';

export default {
  data() {
    return {
      roomCode: '',
      socket: socket,
    }
  },
  created() {
    socket.on('init', (roomCode) => {
      this.roomCode = roomCode;
    });
  },
  components: {
    Menu,
    Game
  }
}
</script>
