const dotcanvas = document.getElementById('dotCanvas');
const ctx = dotcanvas.getContext('2d');

dotcanvas.width = window.innerWidth;
dotcanvas.height = window.innerHeight;

const colors = ['#ff9933', '#ffffff', '#138808']; 
const dots = [];

class Dot {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color; 
    this.size = Math.random() * 2 + 1; 
    this.life = Math.random() * 0.1 + 40; 
    this.speedX = (Math.random() - 0.5) * 10; 
    this.speedY = (Math.random() - 0.5) * 40;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--; 
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function addDot() {
  // Only add a dot if there are fewer than 780
  if (dots.length < 780) {
    const x = Math.random() * dotcanvas.width;
    const y = Math.random() * dotcanvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    dots.push(new Dot(x, y, color));
  }
}

function removeDot() {
  // Remove a dot if there are more than 780
  if (dots.length > 780) {
    dots.shift(); // Remove the first dot (you could also randomly remove a dot if you'd prefer)
  }
}

function animate() { 
  ctx.clearRect(0, 0, dotcanvas.width, dotcanvas.height);

  // Add a dot with some probability, but ensure the number of dots stays between 28 and 780
  if (Math.random() < 0.1 && dots.length < 780) addDot(); 
  
  // Ensure the dots array stays within bounds (28 to 780)
  if (dots.length > 780) removeDot();
  if (dots.length < 28) addDot(); // Ensure at least 28 dots at all times

  for (let i = dots.length - 1; i >= 0; i--) {
    const dot = dots[i];
    dot.update();
    dot.draw();

    if (dot.life <= 0) {
      dots.splice(i, 1);  // Remove dots when their life ends
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  dotcanvas.width = window.innerWidth;
  dotcanvas.height = window.innerHeight;
});

animate();
