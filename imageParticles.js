window.addEventListener("load", () => {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = 10;
        this.x = this.radius +  Math.random()*(this.effect.width - this.radius) ;
        this.y = this.radius + Math.random()*(this.effect.height - this.radius) ;
        this.velX = Math.random()*5 - 5;
        this.velY = Math.random()*5 - 5;
        
    }
    draw(context){
        this.context = context;
        this.context.beginPath();
        this.context.arc(this.x , this.y, this.radius, 0, Math.PI*2)
        this.context.fill()
    }
    update(){
        this.x += this.velX;
        this.y += this.velY
    }
  }

  class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particlesArray = []
        this.createParticles()

    }
    createParticles(){
        for(let i=0; i<100; i++){
            this.particlesArray.push(new Particle(this));
        }
        console.log(this.particlesArray)
    }
    handleParticles(context){
        this.particlesArray.forEach(particle => {
            particle.draw(context)
            particle.update()
        })
    }

  }
  const effect = new Effect(canvas)
  

  function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate)
  }
  animate()
});

