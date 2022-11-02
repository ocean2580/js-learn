// DOM
const dropdown = document.getElementById('animations');
let playerState = 'idle';
dropdown.addEventListener('change',function(e) {
  playerState = e.target.value;
})

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);

const CANVAS_HEIGHT = (canvas.height = 600);
const CANVAS_WIDTH = (canvas.width = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;  // speed 
let staggerFrames = 5; // slow down speed
let spriteAnimations = [];  // name maps to positions
let animationStatus = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }
];


animationStatus.forEach((status, index) => {
  // store status
  let frames = {
    loc: [],
  };
  // create status for sprite
  for (let j = 0; j < status.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY});

  }
  spriteAnimations[status.name] = frames;
})
console.log(spriteAnimations);


function animate() {
  // clear
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  frameX = spriteWidth * position;
  // src, locate src, get from src
  ctx.drawImage(playerImage,
    frameX, frameY, spriteWidth, spriteHeight,
    0, 0, spriteWidth, spriteHeight);

  gameFrame++;

  requestAnimationFrame(animate);
}
animate();
