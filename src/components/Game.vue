<template>
  <div>
    <p>{{ roomCode }}</p>
    <p>{{ question }}</p>
    <textarea v-model="essay" placeholder="skriv här..."/>
    <br>
    <button @click="next">next</button>
    <button @click="send">skicka</button>
  </div>
</template>

<script>
export default {
  props: ['socket', 'roomCode'],
  created() {
    this.socket.on('question', (question) => {
      this.question = question;
    });
  },
  data () {
    return {
      question: '',
      essay: '',
    };
  },
  methods: {
    next () {
      this.socket.emit("next");
    },
    send () {
      this.socket.emit("push", this.essay);
      this.essay = "";
    }
  }
}
</script>