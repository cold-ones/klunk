<template>
  <div>
    <h1 class="roomCode">{{ roomCode }}</h1>
    <h1 class="type">{{ type }}</h1>
    <h1 class="question">{{ question }}</h1>
    <div class="centered" :style="closeCenter">
      <button class="close" @click="edit = !edit; if (edit) { $refs.text.focus() }" :style="closeButton"><img :style="rotateButton" src="@/assets/close.svg"/></button>
      <textarea ref="text" :style="hiddenText" v-model="essay" placeholder="skriv en fråga..."/>
      <br>
      <button class="send" @click="send" :style="sendButton"><img src="@/assets/send.svg"/></button>
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
    color: #fff;
    bottom:10%;
    left:0;
    transform: translateY(50%);
  }
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    transition: all 0.6s ease;
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
    left: 10%;
    top: 10%;
    font-size: 1.7em;
    color:#aaa;
  }
  .question {
    width: 80vw;
    z-index: -10;
    left: 10%;
    top: 40%;
    transform: translateY(-50%);
    overflow-wrap: break-word;
    color: #fff;
  }
  .type {
    display: inline-block;
    left: 10%;
    top: 0.5em;
    font-size: 2.5em;
    font-weight: 600;
    color: #fff;
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
    transition: all 0.6s ease;
  }
  .send {
    background: #DE38C8;
    transform: translate(30%, -70%);
    vertical-align: -1px;
    z-index: 0;
  }
  .close { 
    background: #DE38C8;
    transform: translate(30%, calc(-30% - 3px));
    z-index: 1;
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
    transition: all 0.6s ease;
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
    transition: all 0.6s ease;
  }
</style>

<script>
export default {
  created() {
    this.socket.emit("join", this.roomCode);

    this.socket.on('question', (question) => {
      this.$store.state.animate();
      setTimeout(() => {
        this.question = "";
        this.type = "";
        this.$nextTick(() => {
          this.question = question.text;
          this.type = question.type;
        });
      }, 400);
    });
  },
  data () {
    return {
      question: '',
      type: process.env.VUE_APP_TITLE,
      essay: '',
      edit: false,
    };
  },
  mounted () {
    if (this.host) {
      this.question = "Du äger rummet!";
    } else {
      this.question = "Väntar på ägaren av rummet.";
    }
  },
  computed: {
    roomCode() {
      return this.$route.params.room;
    },
    socket() {
      return this.$store.state.socket;
    },
    host() {
      return this.$store.state.host;
    },
    hiddenText() {
      return this.edit || { padding: 0, height: 0, width: 0 };
    },
    rotateButton() {
      return this.edit || { transform: 'rotate(-45deg)' };
    },
    closeButton() {
      return this.edit || { transform: 'translate(50%, calc(-30% - 3px))' };
    },
    sendButton() {
      return this.edit || { backgroundColor: "#fff", transform: 'translate(50%, -70%)' };
    },
    closeCenter() {
      return this.edit || { top: "70%" };
    }
  },
  methods: {
    send () {
      var trimmed = this.essay.replace(/\s+/g, '')
      if (trimmed.length > 0) {
        this.socket.emit("push", this.essay);
        this.essay = "";
        this.edit = false;
      } 
    }
  },
  watch: {
    host: {
      immediate: true, 
      handler () {
        this.question = "Du äger nu rummet!";
      }
    },
    edit (to) {
      this.$refs.text.placeholder = to ? "skriv en fråga..." : "";
    }
  }
}
</script>