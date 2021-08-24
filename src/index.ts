import Engine from './LazyEngine/Engine.js'

// // Setup
const engine = new Engine();
engine.setFPS(42);

// Bird
let birdX = 0;
let birdY = 200;
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
let pipeY = 200;
const pipeGap = 200;
const pipeWidth = 50;
const pipeHeight = 400;
let topPipeBottomY = 24;

// Pipes
// const pipeTopSprite = engine.createSprite('./assets/pipeTop.png', pipeWidth, pipeHeight, pipeX - 200, pipeY);
// const pipeBottomSprite = engine.createSprite('./assets/pipeBottom.png', pipeWidth, pipeHeight, pipeX - 200, pipeY);

const drawScore = () => {
  engine.setFillColor("black");
  engine.drawText(String(score++), scoreX, scoreY); // Increase and draw score

  bestScore = bestScore < score ? score : bestScore; // New best score?
  engine.drawText(`Best: ${bestScore}`, bestScoreX, bestScoreY)
};


const drawPipe = () => {
  engine.setFillColor("green");
  pipeX -= 8; // Move pipe
  if (pipeX < -pipeWidth) { // Pipe off screen
    pipeX = canvasSize; // Move pipe to end of screen
    topPipeBottomY = pipeGap * Math.random(); // Randomize gap.
  }

  engine.rect(pipeX, 0, pipeWidth, topPipeBottomY) // Draw top pipe
  engine.rect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize) // Draw bottom pipe
};

const detectCollisions = () => {
  // Detect Collisions or fall off screen
  return ((birdSprite.getY() < topPipeBottomY || birdSprite.getY() > topPipeBottomY + pipeGap) && 
    pipeX < birdSprite.getWidth() || birdSprite.getY() > canvasSize);
}

const endGame = () => {
  birdSprite.setDY(0);
  birdSprite.setY(200);

  pipeX = canvasSize; 
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

