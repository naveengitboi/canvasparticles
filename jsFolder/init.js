window.addEventListener("load", () => {
  createCanvas();

  const projects = [
    ShootingStars,Constellation, StarryNight
  ]


  for(let i=0; i< projects.length; i++){
    new projects[i](document.getElementById(`canvas_${i}`))
  }
});

function createCanvas() {
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 1000;
  const projects = 3;

  for (let i = 0; i < projects; i++) {
    const canvas = document.createElement("canvas");
    canvas.id = `canvas_${i}`;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.appendChild(canvas);
  }
}
