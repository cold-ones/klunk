let w = window.innerWidth;
let h = window.innerHeight;

let waves = [];
let startY, drag;

function Wave(s, y, h) {
	this.y = y;
	this.target = y;
	this.height = h;

	this.idle = false; //Don't animate, hide outside the frame.
	this.kamikaze = false; //Kill wave when it reaches target.

	this.yy = [];
	for (var i = 0; i < s.width; i++) {
		this.yy[i] = this.y;
	}

	this.update = () => {
		var speed = 30;
		if (this.y - this.target < speed) { this.y = this.target; }
		this.y += Math.sign(this.target - this.y) * speed;

		if (this.y == this.target && this.kamikaze) { //Reincarnate this bitch.
			waves.pop();
			var wave = new Wave(s, s.height, s.height);
			wave.idle = true;
			waves.unshift(wave);
		}

		for (let i = 0; i < s.width; i++) {
			var d = new Date();
			var x1 = i + d.getTime() / 30;
			var x2 = i + d.getTime() / 10;

			var y = this.y;
			if (this.idle && drag || this.y != this.target) {
				const dist = Math.abs(s.mouseX - i);
				y = Math.min(y, s.mouseY + dist / 4);
				y -= Math.cos(dist / 30) * 20;
			}

			if (!this.idle || drag) {
				y += Math.sin(x1 / 30) * 15 + Math.sin(x2 / 60) * 15;
			}
			this.yy[i] = s.lerp(this.yy[i], y, 0.1);
		}
	}

	this.draw = () => {
		for (let i = 0; i < s.width; i++) {
			s.fill(222, 56, 200)
			s.rect(i, this.yy[i], 1, this.height);
		}
	}
}

const sketch = (s) => {
	s.callback = null;
	s.locked = null;

	s.swipe = () => {
		waves[0].idle = false;
		waves[0].target = -s.height / 5 * 4;
		waves[1].target = -s.height * 1.5;
		waves[1].kamikaze = true;
	}

	s.windowResized = () => {
		s.resizeCanvas(s.windowWidth, s.windowHeight);
	}

	s.setup = () => {
		s.createCanvas(w, h);
		s.noStroke();
		var wave = new Wave(s, s.height, s.height);
		wave.idle = true;
		waves.push(wave);
		waves.push(new Wave(s, -s.height / 5 * 4, s.height));
	};

	s.draw = () => {
		if (s.mouseIsPressed) {
			if (s.mouseY > (s.height / 5) * 4) {
				drag = true;
				startY = s.mouseY;
			}
		} else {
			if (drag && startY - s.mouseY > 75) {
				s.swipe();
				if (typeof s.callback === "function") {
					s.callback();
				}
			}
			drag = false;
		}
		if (typeof s.locked === "function" && ! s.locked()) {
			drag = false;
		}

		s.clear();
		waves.forEach(wave => {
			wave.update();
			wave.draw();
		});
	};
};

export default sketch;
