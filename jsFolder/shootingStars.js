class ShootingStars extends Project {
  constructor(canvas) {
    super(canvas);
    this.particleSize = 100;
    this.stars = this.getRandomStars(this.particleSize);
    this.shootingstars = [];

    this.drawFrame();
    this.showDisabled();
  }
  drawFrame() {
    if (Math.random() < 0.1) {
      this.shootingstars.push(new ShootingStar(this.canvas));
    }

    fillBackground(this.ctx, this.canvas);

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].update();
      this.stars[i].draw(this.ctx);
    }

    for (let i = 0; i < this.shootingstars.length; i++) {
      this.shootingstars[i].update();
      this.shootingstars[i].draw(this.ctx);
    }
  }

  getRandomStars(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        new Star([
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
        ])
      );
    }
    return arr;
  }
}

class ShootingStar {
  constructor(canvas) {
    this.loc = [Math.random() *canvas.width, Math.random() *canvas.height];
    this.step = 0.1;
    this.radius = 1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.loc[0], this.loc[1], this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.step += 0.1;
    if(this.step > Math.PI){
        this.radius = 0;
    }
    else{
        this.radius = Math.sin(this.step)*5+2
    }
    this.loc[0] += Math.random()*5 + 50;
    this.loc[1] += Math.random()*5 + 50;
  }
}
