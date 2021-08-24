import {getRandomNumberInRange} from './helpers/getRandomNumberInRange.js';
import Engine from './LazyEngine/Engine.js'

// TODO: set z index of sprites to change render order
// Setup
const engine = new Engine();
engine.setFPS(42);
engine.setCanvasWidth(900)
engine.setCanvasHeight(480)

let gameInProgress = false;

// Clouds
const clouds = [
  engine.createSprite('./assets/cloud.png', 100, 50, engine.getCanvasWidth() * 0.33, 50),
  engine.createSprite('./assets/cloud.png', 100, 50, engine.getCanvasWidth() * 0.75, 100),
  engine.createSprite('./assets/cloud.png', 100, 50, engine.getCanvasWidth()*1.33, 200),
];

// Bird
const birdX = engine.getCanvasWidth() * 0.03;
const birdY = engine.getCanvasHeight() / 2;
const birdWidth = 30;
const birdHeight = 24;

const birdSprite = engine.createSprite('./assets/bird.png', birdWidth, birdHeight, birdX, birdY);
engine.addOnClickListner(() => birdSprite.jump(9))
engine.addKeyDownListener(() => console.log('test'))

// Score
const scoreX = 9;
const scoreY = 25;
let score = 0;

const bestScoreX = 9;
const bestScoreY = 50;
let bestScore = 0;

// Pipes
let pipeX = engine.getCanvasWidth();
const pipeGap = 100;
const pipeWidth = 50;
const pipeHeight = 400;
let topPipeBottomY = 100;

// Pipes
const pipeTopSprite = engine.createSprite('./assets/pipeTop.png', pipeWidth, pipeHeight, pipeX, topPipeBottomY - pipeHeight);
const pipeBottomSprite = engine.createSprite('./assets/pipeBottom.png', pipeWidth, pipeHeight, pipeX, topPipeBottomY + pipeGap);

const drawScore = () => {
  engine.setFillColor("black");
  engine.drawText(String(score++), scoreX, scoreY); // Increase and draw score

  bestScore = bestScore < score ? score : bestScore; // New best score?
  engine.drawText(`Best: ${bestScore}`, bestScoreX, bestScoreY)
};


const updatePipes = () => {
  const currPipeX = pipeTopSprite.getX();
  pipeTopSprite.setX(currPipeX - 8);
  pipeBottomSprite.setX(currPipeX - 8);

  if (currPipeX < -pipeWidth) { 
    // wrap pipe around screen
    pipeTopSprite.setX(engine.getCanvasWidth());
    pipeBottomSprite.setX(engine.getCanvasWidth());

    const canvasHeight = engine.getCanvasHeight();
    const pipeBottomY = getRandomNumberInRange(canvasHeight * 0.15, canvasHeight * 0.75 - pipeGap);

    pipeTopSprite.setY(pipeBottomY - pipeHeight);
    pipeBottomSprite.setY(pipeBottomY + pipeGap);
  }
};

const updateClouds = () => {
  clouds.forEach((cloud) => {
    const currCloudX = cloud.getX();
    if (currCloudX + cloud.getWidth() < engine.getCanvasWidth() * -0.1) {
      cloud.setX(engine.getCanvasWidth());
    }
    else {
      cloud.setX(currCloudX - 2);
    }
  })

};

const drawGround = () => {
  const groundHeight = engine.getCanvasHeight() * 0.15;
  engine.setFillColor('SandyBrown');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight)
  engine.setFillColor('SaddleBrown');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight * 0.25)
  engine.setFillColor('green');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight * 0.05)
}

const detectCollisions = () => {
  return (birdSprite.isTouching(pipeTopSprite) || birdSprite.isTouching(pipeBottomSprite) 
          || birdSprite.isTouching(pipeBottomSprite) || engine.isTouchingWalls(birdSprite));
}



const startGame = () => {
  birdSprite.setGravity(0.5);
  birdSprite.setDY(0);
  gameInProgress = true;

}

const endGame = () => {
  birdSprite.setDY(0);
  birdSprite.setY(200);

  birdSprite.setGravity(0);
  birdSprite.setDY(0);

  pipeBottomSprite.setX(engine.getCanvasWidth());
  pipeTopSprite.setX(engine.getCanvasWidth());

  score = 0; // Bird died
  gameInProgress = false;
}

engine.addOnClickListner(() => {
  if (!gameInProgress) {
    startGame();
  }
});

engine.loop(() => {
  engine.setBackgroundColor('skyblue');
  
  drawGround();
  updateClouds();

  if (gameInProgress) {
    updatePipes();
    drawScore();
    if (detectCollisions()) {
      endGame();
    }
  }
});

