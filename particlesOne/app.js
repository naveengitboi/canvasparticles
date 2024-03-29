let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white"
ctx.strokeStyle = "white"
ctx.lineWidth = 1
console.log(ctx)


// setup classes


class Particle{
    constructor(effect){
        this.effect = effect;
        this.radius = Math.floor(Math.random()*1);
        this.x = this.radius + Math.random()*(this.effect.width - this.radius*2);
        this.y = this.radius + Math.random()*(this.effect.height - this.radius * 2);
        this.velX = Math.random()*1 - 0.5;
        this.velY = Math.random()*1  - 0.5 ;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.85;
    }
    
    draw(context){
        context.beginPath();
        context.fillStyle = 'hsl(' + this.x + ', 100%, 50%';
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        context.fill();
    }

    update(){

        if(this.effect.mouse.pressed){
            let dx = this.x - this.effect.mouse.x;
            let dy = this.y - this.effect.mouse.y;
            const dist = Math.hypot(dx, dy);
            const force = (this.effect.mouse.radius/dist)
            if(dist <= this.effect.mouse.radius){
                const angle = Math.atan2(dy,dx);
                this.pushX += Math.cos(angle)*force;
                this.pushY += Math.sin(angle)*force;
            }
        }
        this.x += (this.pushX *= this.friction) + this.velX;
        this.y += (this.pushY *= this.friction) + this.velY;
        if(this.x < this.radius){
            this.x = this.radius;
            this.velX *= -1;
        }
        else if(this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius;
            this.velX *= -1;
        }

        if(this.y < this.radius){
            this.y = this.radius;
            this.velY *= -1;
        }
        else if(this.y > this.effect.height - this.radius){
             this.y = this.effect.height - this.radius;
            this.velY *= -1;
        }

  


        // this.x += this.velX;
        // this.y += this.velY
        // if(this.x >= this.effect.width || this.x <= 0) {
        //     this.velX = -this.velX
        // }
        // if(this.y >= this.effect.height || this.y <= 0){
        //     this.velY = -this.velY
        // }

    }
    reset(){
        this.x = this.radius + Math.random()*(this.effect.width-this.radius*2);
        this.y =  this.radius + Math.random()*(this.effect.height - this.radius*2)
    }
}



class Effect{
    constructor(canvas, context){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = context;
        this.particles = [];
        this.numberOfParticles = 100;
        this.createParticles();

        this.mouse = {
            x:0,
            y:0,
            pressed : false,
            radius: 300
        }

        window.addEventListener('resize', (e) => {
            console.log(e)
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
        })

        window.addEventListener('mousemove', (e) => {
            if(this.mouse.pressed == true){
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            }
        })
        window.addEventListener("mousedown", (e) => {
            this.mouse.pressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })

        window.addEventListener("mouseup", (e) => {
            this.mouse.pressed = false;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })


        

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

    resize(updatedWidth, updatedHeight){
        this.canvas.width = updatedWidth;
        this.canvas.height = updatedHeight;
        this.width = updatedWidth;
        this.height = updatedHeight;
         this.context.fillStyle = "white"
         this.context.strokeStyle = "white"
        this.particles.forEach(particle => {
            particle.reset();
        })

    }
}


const effect = new Effect(canvas, ctx)



function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    effect.handleParticles(ctx)
    requestAnimationFrame(animate)

}

animate()