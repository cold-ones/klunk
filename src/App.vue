<template>
  <div id="app">
    <Menu v-if="! roomCode" :socket="socket"/>
    <Game v-else :roomCode="roomCode" :socket="socket" />

  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('localhost:3000');

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
    this.createCanvas(100, 100);
    socket.on('init', (roomCode) => {
      this.roomCode = roomCode;
    });
    socket.on('host', () => {
      alert('hosten har lämnat spelet, nu är du host! :D');
    });
  },
  components: {
    Menu,
    Game
  }
}
</script>
