let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white"
console.log(ctx)


// setup classes


class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.random() * 40;
        this.x = this.radius + Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height - this.radius * 2);
        this.velX = Math.random()*4 ;
        this.velY = Math.random()*4 ;
    }
    
    draw(context){
        context.beginPath();
        context.fillStyle = 'hsl(' + 655 + ', 100%, 50%';
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
    }

    update(){
        this.x += this.velX;
        this.y += this.velY
        if(this.x >= this.effect.width || this.x <= 0) {
            this.velX = -this.velX
        }
        if(this.y >= this.effect.height || this.y <= 0){
            this.velY = -this.velY
        }

    }
}



class Effect{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 200;
        this.createParticles();

    }

    createParticles(){
        for(let i=0; i<this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
            
        }
    }

    handleParticles(context){
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update()
        })
    }
}


const effect = new Effect(canvas)



function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)

}

animate()