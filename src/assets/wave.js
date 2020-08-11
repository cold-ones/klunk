const sketch = (s) => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let oy = [];
    let oy2 = [];

    let startY = 0;
    let drag = false;

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
        for (let i = 0; i < s.width; i++) {
            oy[i] = s.height / 5;
            oy2[i] = s.height;
        }
    }

    s.setup = () => {
        s.createCanvas(w, h);
        s.noStroke();
        for (let i = 0; i < s.width; i++) {
            oy[i] = s.height / 5;
            oy2[i] = s.height;
        }
    };

    s.draw = () => {
        if (s.mouseIsPressed) {
            if (s.mouseY > (s.height/5)*4) {
              drag = true;
              startY = s.mouseY;
            }
          } else {
            if (drag && startY-s.mouseY > 75) {
              //next
            }
            drag = false;
          }  

        s.clear();
        s.fill(222, 56, 200);
        let d = new Date();
        for (let i = 0; i < s.width; i++) {
            const x1 = i+d.getTime()/30;
            const x2 = i+d.getTime()/10;
            let yy = s.height / 5;

            oy[i] = s.lerp(oy[i], yy, 0.1);
            const y = oy[i]
                +Math.sin(x1/30)*15
                +Math.sin((x2+1)/60)*15;
            s.rect(i, 0, 1, y);
        }

        for (let i = 0; i < s.width; i++) {
            let yy = s.height;

            if (drag) {
                const dist = s.mouseX-i;
                yy = Math.min(yy, Math.pow(dist,2)/s.width+s.mouseY-50);
            }

            oy2[i] = s.lerp(oy2[i], yy, 0.1);
            
            const y = oy2[i];
            s.rect(i, y, 1, 2*s.height);
        }
    };
};

export default sketch;
