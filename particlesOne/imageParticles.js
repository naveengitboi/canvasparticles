window.addEventListener("load", () => {
  const resolution = document.getElementById("resolution");
  const ease = document.getElementById("easeFunc");

  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(effect, x, y, color, gap, ease) {
      this.effect = effect;
      this.rectH = this.rectW = gap;
      this.x = x;
      this.y = y;
      this.velX = Math.random() * 5 - 5;
      this.velY = Math.random() * 5 - 5;
      this.originX = Math.floor(x);
      this.originY = Math.floor(y);
      this.color = color;
      this.ease = ease;
    }
    draw(context) {
      this.context = context;
      this.context.fillRect(this.x, this.y, this.rectW, this.rectH);
      this.context.fillStyle = this.color;
    }

    run() {
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
    }
    update() {
      // this.x += this.velX;
      // this.y += this.velY;
      this.x += (this.originX - this.x) * this.ease;
      this.y += (this.originY - this.y) * this.ease;
    }
  }

  class Effect {
    constructor(canvas, context) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.particlesArray = [];
      this.image = document.getElementById("imageOne");
      this.centerX = (this.width - this.image.width) * 0.5;
      this.centerY = (this.height - this.image.height) * 0.5;
      this.createParticles(context, 5, 0.25);
    }
    createParticles(context, gap, ease) {
        this.ease = ease;
        this.gap = gap;
      context.drawImage(this.image, this.centerX, this.centerY);
      const pixels = context.getImageData(0, 0, this.width, this.height).data;
      // console.log(pixels)
      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          const idx = (y * this.width + x) * 4;
          // console.log(idx)
          const red = pixels[[idx]];
          const green = pixels[idx + 1];
          const blue = pixels[idx + 2];
          // console.log(red, green, blue)
          const alpha = pixels[idx + 3];
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          // console.log(alpha)
          if (alpha > 0) {
            this.particlesArray.push(new Particle(this, x, y, color, this.gap, this.ease));
          }
        }
      }
    }
    handleParticles(context) {
      this.particlesArray.forEach((particle) => {
        particle.draw(context);
        particle.update();
      });
    }
    runEffect() {
      this.particlesArray.forEach((particle) => {
        particle.run();
      });
    }
  }
  const effect = new Effect(canvas, ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
  }
  animate();

  const runBtn = document.getElementById("runBtn");
  runBtn.addEventListener("click", () => {
    effect.createParticles(ctx, parseInt(resolution.value), parseFloat(ease.value))
    effect.runEffect();
    
  });

});
