class starryNight {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.fillBackground();
    this.particleSize = 100;
    const stars = this.getRandomStars(this.particleSize);
    // console.log(stars)
    for (let i = 0; i < stars.length; i++) {
      stars[i].draw(this.ctx);
    }
    let me = this;
    setInterval(() => {
        me.fillBackground()
        for(let i =0; i< stars.length; i++){
            stars[i].update()
            stars[i].draw(me.ctx)
        }
    }, 1000/10)
  }

  draw(loc) {
    for (let i = 0; i < 100; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.fillStyle = "white";
      this.ctx.arc(loc[i][0], loc[i][1], 4, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  getRandomStars(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        new star([
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
        ])
      );
    }
    return arr;
  }

  fillBackground() {
      this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class star {
  constructor(locations) {
    this.loc = locations;
    this.radius = Math.random()*5+5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.loc[0], this.loc[1], this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  update(){
    this.radius = Math.random()*5 + 5;
  }
}
