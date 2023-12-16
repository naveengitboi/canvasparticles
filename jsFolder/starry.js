class StarryNight extends Project {
  constructor(canvas) {
    super(canvas)
    this.particleSize = 100;
     this.stars = this.getRandomStars(this.particleSize);

     this.drawFrame();
     this.showDisabled();
  }
  drawFrame(){
  fillBackground(this.ctx, this.canvas)
        for(let i =0; i< this.stars.length; i++){
            this.stars[i].update()
            this.stars[i].draw(this.ctx)
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


