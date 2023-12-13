let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white"
console.log(ctx)
ctx.strokeStyle = "white"

// setup classes


class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = 10;
        this.x = this.radius + Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height - this.radius * 2);
        this.velX = Math.random()*4 -2 ;
        this.velY = Math.random()*4 -2;
    }
    
    draw(context){
        context.beginPath();
        context.fillStyle = 'hsl(' + this.x + ', 100%, 50%';
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
        this.connectParticles(context)
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update()
        })
    }

    connectParticles(context){
        const maxDist = 100;
        for(let i =0; i < this.particles.length; i++){
            for(let j = i; j < this.particles.length; j++){
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;

                const dist = Math.hypot(dx, dy);
                if(dist <= maxDist){
                    context.save()
                    const opacity = 1- (dist/maxDist);
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[i].x, this.particles[i].y);
                    context.lineTo(this.particles[j].x, this.particles[j].y);
                    context.stroke();
                    context.restore()
                }
            }
        }
    }
}


const effect = new Effect(canvas)



function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)

}

animate()