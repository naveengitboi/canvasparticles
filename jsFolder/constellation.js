class Constellation extends Project {
  constructor(canvas) {
    super(canvas);
    this.particleSize = 100;
    this.stars = this.getRandomStars(this.particleSize);

    this.stars.push(new Star([100,700], true))
    this.stars.push(new Star([200,600], true))
    this.stars.push(new Star([300,800], true))
    this.stars.push(new Star([400,200], true))
    this.stars.push(new Star([500,300], true))
    this.stars.push(new Star([600,100], true))

    this.drawFrame();
    this.showDisabled();
  }
  drawFrame(){
    fillBackground(this.ctx, this.canvas)
        for(let i =0; i< this.stars.length; i++){
            this.stars[i].update()
            this.stars[i].draw(this.ctx)
        }
        for(let i = this.stars.length - 6; i< this.stars.length; i++){
            const prevStarLoc = this.stars[i-1].loc;
            const currStarLoc = this.stars[i].loc;
            // console.log(prevStarLoc)
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = 'white'
            this.ctx.moveTo(...prevStarLoc);
            this.ctx.lineTo(...currStarLoc);
            this.ctx.stroke();
        }
  }

  getRandomStars(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        new Star([
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height,
        ], false)
      );
    }
    return arr;
  }

  fillBackground() {
      this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Star {
  constructor(locations, isLarger) {
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
