let canvas;
    let particles = [];
    const numParticles = 40;
    const maxDistance = 150;

    function setup() {
      let container = document.getElementById('particle-container');
      canvas = createCanvas(container.offsetWidth, container.offsetHeight);
      canvas.parent('particle-container');

      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    }

    function draw() {
      background(0);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
        particles[i].connect(particles);
      }
    }

    function windowResized() {
      let container = document.getElementById('particle-container');
      resizeCanvas(container.offsetWidth, container.offsetHeight);
    }

    class Particle {
      constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-1, 1);
        this.vy = random(-1, 1);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
        }

        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
        }
      }

      display() {
        fill(255, 100);
        noStroke();
        ellipse(this.x, this.y, 3);
      }

      connect(otherParticles) {
        for (let i = 0; i < otherParticles.length; i++) {
          let d = dist(this.x, this.y, otherParticles[i].x, otherParticles[i].y);
          if (d < maxDistance) {
            stroke(255, 100);
            line(this.x, this.y, otherParticles[i].x, otherParticles[i].y);
          }
        }
      }
    }