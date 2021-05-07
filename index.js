import fCanvas, { changeSize, hypot, random } from "https://unpkg.com/fcanvas@0.0.4-b26/fcanvas.esm.js";
const canvas = new fCanvas();
const MAX_DISTANCE = 80;

let hue = 0;
class Particle extends fCanvas.Element {
  x = 0;
  y = 0;
  size = random(5) + 1;
  speedX = random(-1.5, 1.5);
  speedY = random(-1.5, 1.5);
  hue = hue;

  constructor(x, y) {
    super(canvas);
    [this.x, this.y] = [x, y];
  }

  draw() {
    this.fill(this.hue, 100, 50);
    // console.log( );
    this.circle(this.x, this.y, this.size);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }
}

const particles = [];

canvas.setup(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;

  canvas.append();
  // canvas.noClear();
  canvas.colorMode("hsl");

  // for (let index = 0; index < 100; index++) {
  //   particles.push(new Particle());
  // }
});

class App extends fCanvas.Element {
  draw() {
    for (let index = 0, { length } = particles; index < length; index++) {
      canvas.run(particles[index]);

      for (let index2 = index; index2 < length; index2++) {
        const distance = hypot(
          particles[index].x - particles[index2].x,
          particles[index].y - particles[index2].y
        );

        if (distance < MAX_DISTANCE) {
          this.stroke(particles[index].hue, 100, 50);
          // this.lineWidth(particles[index].size / 10)
          this.lineWidth(0.2);
          this.line(
            particles[index].x,
            particles[index].y,
            particles[index2].x,
            particles[index2].y
          );
        }
      }
      if (particles[index].size <= 0.3) {
        particles.splice(index, 1);
        index--;
        length--;
      }
    }
  }
}

const app = new App();

canvas.draw(() => {
  // canvas.background(`rgba(0, 0, 0, .02)`);
  canvas.background(0);
  canvas.run(app);
  hue += 5;
});

canvas.mouseClicked(() => {
  for (let index = 0; index < 10; index++) {
    particles.push(new Particle(canvas.mouseX, canvas.mouseY));
  }
});
canvas.mouseMoved(() => {
  for (let index = 0; index < 5; index++) {
    particles.push(new Particle(canvas.mouseX, canvas.mouseY));
  }
});

changeSize(() => {
  canvas.width = canvas.windowWidth;
  canvas.height = canvas.windowHeight;
});
