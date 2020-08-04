<template>
  <div>
    <h1 class="roomCode">{{ roomCode }}</h1>
    <h1 class="question">{{ question }}</h1>
    <div class="centered">
      <button class="close" @click="send"><img src="@/assets/close.svg"/></button>
      <textarea v-model="essay" placeholder="skriv här..."/>
      <br>
      <button class="send" @click="send"><img src="@/assets/send.svg"/></button>
    </div>
    <h2 class="swipe" v-if="host">Swipea up för frågor.</h2>
  </div>
</template>

<style scoped>
  .swipe {
    position: absolute;
    padding: 0;
    width: 100vw;
    text-align: center;
    color: rgb(16,16,16);
    bottom:10%;
    left:0;
    transform: translateY(50%);
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
    left: 5%;
    top: 5%;
    color:#aaa;
  }
  .question {
    width: 90vw;
    height: 300px;
    z-index: -10;
    left: 5%;
    top: calc(5% + 3rem);
    overflow-wrap: break-word;
    color: #DE38C8;
  }
  button {
    border: none;
    color: #fff;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    border: white solid 4px;
  }
  .send {
    background: #DE38C8;
    transform: translate(30%, -70%);
  }
  .close { 
    background: #DE38C8;
    transform: translate(30%, -30%);
  }
  img {
    width: 100%;
    position: relative;
  }
  .send img {
    left:-2px;
  }
  .close img {
    width: 40% !important;
    left: 0.25px;
    top: 2px;
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
        this.question = "";
        this.$nextTick(() => { this.question = question; })
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
      var trimmed = this.essay.replace(/\s+/g, '')
      if (trimmed.length > 0) {
        this.socket.emit("push", this.essay);
        this.essay = "";
      } 
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