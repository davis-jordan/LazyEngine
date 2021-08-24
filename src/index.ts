import {getRandomNumberInRange} from './helpers/getRandomNumberInRange.js';
import Engine from './LazyEngine/Engine.js'

// // Setup
const engine = new Engine();
engine.setFPS(42);

// Bird
const birdX = 0;
const birdY = 200;
const birdWidth = 24;
const birdHeight = 24;

const birdSprite = engine.createSprite('./assets/bird.png', birdWidth, birdHeight, birdX, birdY);
birdSprite.setGravity(0.5);
engine.addOnClickListner(() => birdSprite.jump(9))

// Score
const scoreX = 9;
const scoreY = 25;
let score = 0;

const bestScoreX = 9;
const bestScoreY = 50;
let bestScore = 0;

// Pipes
let pipeX = 400;
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


const drawPipe = () => {
  const currPipeX = pipeTopSprite.getX();
  pipeTopSprite.setX(currPipeX - 8);
  pipeBottomSprite.setX(currPipeX - 8);

  if (currPipeX < -pipeWidth) { 
    // wrap pipe around screen
    pipeTopSprite.setX(canvasSize);
    pipeBottomSprite.setX(canvasSize);

    const canvasHeight = engine.getCanvasHeight();
    const pipeBottomY = getRandomNumberInRange(canvasHeight * 0.15, canvasHeight * 0.85 - pipeGap);

    pipeTopSprite.setY(pipeBottomY - pipeHeight);
    pipeBottomSprite.setY(pipeBottomY + pipeGap);
  }
};

const detectCollisions = () => {
  return (birdSprite.isTouching(pipeTopSprite) || birdSprite.isTouching(pipeBottomSprite) 
          || birdSprite.isTouching(pipeBottomSprite) || engine.isTouchingWalls(birdSprite));
}

const endGame = () => {
  birdSprite.setDY(0);
  birdSprite.setY(200);

  pipeBottomSprite.setX(canvasSize);
  pipeTopSprite.setX(canvasSize);

  score = 0; // Bird died
}

const canvasSize = 400;

engine.loop(() => {
  engine.setBackgroundColor('skyblue');
  
  drawPipe();
  drawScore();
  if (detectCollisions()) {
    endGame();
  }
});

