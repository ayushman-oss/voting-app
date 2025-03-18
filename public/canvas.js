const dotcanvas = document.getElementById('dotCanvas');
    const ctx = dotcanvas.getContext('2d');

    dotcanvas.width = window.innerWidth;
    dotcanvas.height = window.innerHeight;

    const colors = ['#ff9933', '#ffffff', '#138808']; // Orange, White, Green
    const dots = [];

    class Dot {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 2; 
        this.life = Math.random() * 80 + 40;
        this.speedX = (Math.random() - 0.5) * 0.8; 
        this.speedY = (Math.random() - 0.5) * 0.8;
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
      const x = Math.random() * dotcanvas.width;
      const y = Math.random() * dotcanvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      dots.push(new Dot(x, y, color));
    }

    function animate() {
      ctx.clearRect(0, 0, dotcanvas.width, dotcanvas.height);

      for (let i = 0; i < 5; i++) {
        addDot();
      }

      for (let i = dots.length - 1; i >= 0; i--) {
        const dot = dots[i];
        dot.update();
        dot.draw();

  
        if (dot.life <= 0) {
          dots.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      dotcanvas.width = window.innerWidth;
      dotcanvas.height = window.innerHeight
    });

    animate();
