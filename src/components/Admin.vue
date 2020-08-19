<template>
  <div class="daddy">
    <div style="margin-bottom:10px;">
      <input style="width:30vw;" v-model="newQuestion.text" @keyup.enter="addQuestion" placeholder="add question" />
      <select v-model="newQuestion.type">
        <option disabled value>Please select one</option>
        <option>jag har aldrig</option>
        <option>pekleken</option>
      </select>
      <button @click="addQuestion">Add question</button>
    </div>
    <div class="questions">
      <div v-for="(question, index) in questions" :key="index">
        <input
          :disabled="!question.edit"
          style="width:30vw;"
          v-model="question.text"
          placeholder="add question"
        />
        <select v-if="question.edit==true" v-model="question.type">
          <option disabled value>Please select one</option>
          <option>jag har aldrig</option>
          <option>pekleken</option>
        </select>
        <button v-if="question.edit==false" @click="toggleEdit(question)">Edit</button>
        <button
          v-if="question.edit==true"
          @click="toggleEdit(question); commitChange(question)"
        >Commit</button>
        <button v-if="question.edit==false" @click="fuckingRemove(question)">Delete</button>
        <button v-if="question.edit==true" @click="cancelEdit(question)">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      edit: false,
      currentEdit: {
        text: "",
        type: "",
      },
      newQuestion: {
        type: null,
        text: null,
      },
    };
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
  },
  methods: {
    addQuestion() {
      var trimmed = this.newQuestion.text.replace(/\s+/g, '')
      if (trimmed.length > 0) {
        this.newQuestion.type = this.newQuestion.type || "pekleken";

        var samesies = this.questions.filter(q => {
          return q.text.toLowerCase() == this.newQuestion.text.toLowerCase()  
        });

        if (samesies.length == 0) {
          this.socket.emit("admin-newQuestion", this.newQuestion);
        } else {
          alert("frågan finns redan, retard.");
        }

        this.newQuestion.text = "";
      }
    },
    toggleEdit(question) {
      this.cancelEdit(this.questions.find(q => q.edit))
      this.questions.map((q)=> {q.edit =false})
      if (question.edit == false) {
        this.currentEdit = Object.assign({}, question);
      }
      question.edit = !question.edit;
    },
    cancelEdit(question){
      if(!question) return
      question.id = this.currentEdit.id
      question.text = this.currentEdit.text
      question.type = this.currentEdit.type
      question.edit = this.currentEdit.edit
    },
    commitChange(question) {
      this.socket.emit("admin-updateQuestion", question);
    },
    fuckingRemove(question) {
      var confirmed = confirm(
        'Are you sure you want to remove: "' + question.text + '"'
      );
      if (confirmed) {
        this.socket.emit("admin-removeQuestion", question);
        this.questions = this.questions.filter((q) => q.id !== question.id);
      }
    },
  },
  created() {
    this.socket.emit("admin-auth", prompt("Enter password"));
    this.socket.on("403", () => {
      this.socket.emit("admin-auth", prompt("Enter password"));
    });

    this.socket.on("admin-questions", (questions) => {
      this.questions = questions.map((question) => {
        return { ...question, edit: false };
      });
    });

    this.socket.on("admin-confirmCreate", (question) => {
      this.questions.push(question);
    });
  },
};
</script>

<style>
.send {
  background: #de38c8;
  transform: translate(30%, -70%);
  vertical-align: -1px;
  z-index: 0;
}
.questions {
  height: 90vh;
  overflow: auto;
}
input {
  text-align: left;
}
.daddy {
  text-align: center;
  margin-top: 50px;
}
</style>