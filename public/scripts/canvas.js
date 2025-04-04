const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth+window.innerHeight;
canvas.height = window.innerHeight+window.innerWidth;
const lim=canvas.height<canvas.width ? canvas.height : canvas.width;

const dots = [];
const numDots = lim*0.2;
	class Dot {
constructor() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.radius = Math.random()*lim*0.006;
  this.velocity = {
    x: (Math.random() - 0.5) * 1.8,
    y: (Math.random() - 0.5) * 1.8
  };
}

draw() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'grey';
  ctx.fill();
}

update() {
  this.draw();

  for (let i = 0; i < dots.length; i++) {
      if (this === dots[i]) continue;
      const distance = Math.sqrt(Math.pow(this.x - dots[i].x, 2) + Math.pow(this.y - dots[i].y, 2));
      
      if (distance < lim*0.1+Math.random()*0.09) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(dots[i].x, dots[i].y);
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = Math.random()*0.1+canvas.height*0.0005;
          ctx.stroke();
      }
      if (distance < lim*0.01) {
          // Randomly deflect or attract
          const randomness = Math.random() * 0.02 - 0.01;
          this.velocity.x += (dots[i].x - this.x) * randomness;
          this.velocity.y += (dots[i].y - this.y) * randomness;
      }
      }

  // Random speed change upon collision with the walls
  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.velocity.x = Math.random() * 2 - 1;
  }

  if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    this.velocity.y = Math.random() * 2 - 1;
  }

  this.x += this.velocity.x;
  this.y += this.velocity.y;
}
}

function init() {
for (let i = 0; i < numDots; i++) {
  dots.push(new Dot());
}
}

function deleteCloseDots() {
for (let i = 0; i < dots.length; i++) {
  for (let j = i + 1; j < dots.length; j++) {
    const distance = Math.sqrt(Math.pow(dots[i].x - dots[j].x, 2) + Math.pow(dots[i].y - dots[j].y, 2));
    if (distance < lim*0.008) {
      dots.splice(j, 1);
      j--; // Adjust index after removal
    }
  }
}
}

function animate() {
requestAnimationFrame(animate);
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < dots.length; i++) {
  dots[i].update();
}

deleteCloseDots();

while (dots.length < numDots) {
  const newDot = new Dot();
  newDot.velocity = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2
  };
  dots.push(newDot);
}
}
init();
animate();
