/** @type {HTMLCanvasElement}*/
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_HEIGHT = canvas.height = 1000;
CANVAS_WIDTH = canvas.width = 500;
const numberOfEnemies = 300;
const enemiesArray = [];
let gameFrame = 0; // play speed


class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = 'enemy3.png';
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteWidth / 2.5;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0; // play frame by frame
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 1.5 + 0.5;
    // this.curve = Math.random() * 200 + 50;
  }

  update() {
    // if 90, 90 then circular
    this.x = canvas.width/2 * Math.cos(this.angle * Math.PI / 90) + (canvas.width/2 - this.width/2);
    this.y = canvas.height/2 * Math.sin(this.angle * Math.PI / 270) + (canvas.height/2 - this.height/2);
    this.angle += this.angleSpeed;
    // left to right
    if (this.x + this.width < 0) this.x = canvas.width; 
    // animate sprites
    if (gameFrame % this.flapSpeed == 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(this.image,
       this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
      this.x, this.y, this.width, this.height);
  }
}

// create enemies 
for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
