<template>
  <div>
    <h1 class="roomCode">{{ roomCode }}</h1>
    <h1 class="question">{{ question }}</h1>
    <div class="centered">
      <textarea v-model="essay" placeholder="skriv här..."/>
      <br>
      <button @click="send"><img src="@/assets/send.svg"/></button>
    </div>
    <h2 class="swipe" v-if="host">Swipea up för frågor.</h2>
  </div>
</template>

<style scoped>
  .swipe {
    position: absolute;
    top: 80%;
    left: 50%;
    width: 100vw;
    color: rgb(16,16,16);
    transform: translateX(-50%);
  }
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .roomCode::before{
    content: "#";
  }
  h1 {
    text-align: left;
    position: fixed;
    font-size: 2em;
    font-weight: 600;
    color:#fff;
  }
  .roomCode {
    left: 30px;
    top: 10px;
    color:#aaa;
  }
  .question {
    width: 90vw;
    height: 300px;
    left: 30px;
    top: 50px;
    overflow-wrap: break-word;
    color: #DE38C8;
  }
  button {
    border: none;
    background: #DE38C8;
    color: #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    transform: translate(30%, -70%);
    border: white solid 4px;
  }
  img {
    width: 100%;
    position: relative;
    left:-2px;
  }
  textarea {
    resize: none;
    font-size: 1.5em;
    font-weight: 600;
    height: 200px;
    text-align: left;
    padding: 15px;
    border-radius: 20px;
    width: 69vw;
    margin: 0px;
    border: none;
  }
</style>

<script>
export default {
  props: ['socket', 'host', 'roomCode'],
  created() {
    this.socket.on('question', (question) => {
      this.$emit('question');
      setTimeout(() => {
        this.question = question;
      }, 200);
    });
  },
  data () {
    return {
      question: '',
      essay: '',
    };
  },
  mounted () {
    if (this.host) {
      this.question = "Du äger rummet!";
    } else {
      this.question = "Väntar på ägaren av rummet.";
    }
  },
  methods: {
    next () {
      this.socket.emit("next");
    },
    send () {
      this.socket.emit("push", this.essay);
      this.essay = "";
    }
  },
  watch: {
    host: {
      immediate: true, 
      handler () {
        this.question = "Du äger nu rummet!";
      }
    }
  }
}
</script>