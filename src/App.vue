<template>
  <div id="app">
    <div id="canvas"></div>
    <Menu v-if="! roomCode" :host.sync="host" :socket="socket" />
    <Game v-else :roomCode="roomCode" :host="host" :socket="socket" @question="pepo.lol()" />
  </div>
</template>

<style scoped>
  #canvas {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  </style>

<script>
import P5 from 'p5';
import io from "socket.io-client";
const socket = io("155.4.60.233:3000");

import Menu from "@/components/Menu.vue";
import Game from "@/components/Game.vue";

export default {
  data() {
    return {
      roomCode: "",
      socket: socket,
      pepo: null,
      host: false,
    };
  },
  created() {
    const sketch = (s) => {
      let w = window.innerWidth;
      let h = window.innerHeight;
      let oy = [];
      let drag = false;
      let startY = 0;
      let next = false;
      let stop = false;
      let ebic = 0;

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
        for (let i=0; i<s.width; i++) {
          oy[i] = s.height;
        }
      }

      s.setup = () => {
        s.createCanvas(w, h);
        s.noStroke();
        for (let i=0; i<s.width; i++) {
          oy[i] = s.height;
        }
        ebic = s.height;
      };

      s.lol = () => {
        next = true;
      }

      s.draw = () => {
        if (this.host && s.mouseIsPressed && !next) {
          if (s.mouseY > (s.height/5)*4) {
            drag = true;
            startY = s.mouseY;
          }
        } else {
          if (drag && startY-s.mouseY > 75) {
            this.socket.emit("next");
            next = true;
          }
          drag = false;
        }

        s.background(16);
        s.fill(222,56,200);
        let d = new Date();
        for (let i=0; i<s.width; i++) {
          const x1 = i+d.getTime()/30;
          const x2 = i+d.getTime()/10;
          let yy = (s.height/5)*4;
          
          if (drag) {
            const dist = Math.abs(s.mouseX-i);
            yy = Math.min(yy, s.mouseY+dist/2);
          }

          if (next) {
            yy = -yy/4;
          }

          oy[i] = s.lerp(oy[i],yy,0.1);
          if (next && Math.abs(yy-oy[i]) < 50) {
            stop = true;
          }
          
          const y = oy[i]+Math.sin(x1/30)*15 + Math.sin((x2+1)/60)*15;

          let e = s.height*2;
          if (stop) {
            e = 0;
          }
          ebic = s.lerp(ebic, e, 0.0001);
          if (stop && ebic < 100) {
            drag = false;
            next = false;
            stop = false;
            ebic = 0;
            for (let i=0; i<s.width; i++) {
              oy[i] = s.height;
            }
          }

          s.rect(i,y,1,ebic);
        }
      };
    };

    this.pepo = new P5(sketch, "canvas");

    socket.on("init", (roomCode) => {
      this.roomCode = roomCode;
    });
    socket.on("host", () => {
      this.host = true;
    });
    socket.on("empty", () => {
      alert("rummet finns inte :(");
    });
  },
  components: {
    Menu,
    Game,
  },
};
</script>
