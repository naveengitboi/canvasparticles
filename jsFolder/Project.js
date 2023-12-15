class Project{
    constructor(canvas){
        this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");    this.particleSize = 100;
    this.stars = this.getRandomStars(this.particleSize);

    this.addEventsLis();

    }

    addEventsLis(){
        
        let me = this
        this.canvas.addEventListener('mouseover', function(){
            if(me.interval == null){
                    me.drawFrame()
                    me.interval = setInterval(() => {
                me.drawFrame()
            }, 1000/10)
            }
        }, false);

        this.canvas.addEventListener('mouseout', function(){
            clearInterval(me.interval)
            me.interval = null;
            me.showDisabled();
        }, false);
    }

      showDisabled(){
        this.ctx.fillStyle = "rgb(0,0,0,0.8)"
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
        this.ctx.font = "bold 5rem monospace";
        this.ctx.textAlign ="center";
        this.ctx.textBaseAlign = "middle";
        this.ctx.fillStyle = "orange"
        this.ctx.fillText(this.constructor.name, this.canvas.width/2, this.canvas.height/2);
      
    }

    
}

function fillBackground(ctx, canvas){
       ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}