import { Engine } from './LazyEngine/index.js'
import { Pipe } from './objects/index.js';
import { PIPE_GAP, PIPE_WIDTH, PIPE_HEIGHT, TOP_PIPE_BOTTOM_Y } from './constants/PipeConstants.js'
import Sound from './LazyEngine/audio/Sound.js';

// TODO: set z index of sprites to change render order
// Setup
const engine = new Engine();
engine.setFPS(42);
engine.setCanvasWidth(880)
engine.setCanvasHeight(480)

let gameInProgress = false;

// Sounds
const pointSound = new Sound('./assets/point.mp3');
const dieSound = new Sound('./assets/die.mp3');
const flapSound = new Sound('./assets/flap.mp3');

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

const jump = () => {
  flapSound.play()
  birdSprite.jump(9);
};

engine.addOnClickListner(jump);
engine.addKeyPressListener(jump);

// Score
const scoreX = 9;
const scoreY = 25;
let score = 0;

const bestScoreX = 9;
const bestScoreY = 50;
let bestScore = 0;

// Pipes
let pipeX = engine.getCanvasWidth();
const pipeSprites: Pipe[] = [];
const numPipes = 2;
const pipeOffset = engine.getCanvasWidth() / 2;

for (let i = 1; i <= numPipes; i++) {
  const pipeSprite = new Pipe(engine.getContext(), engine, PIPE_WIDTH, PIPE_HEIGHT, (pipeX * (i / numPipes)) + pipeOffset, TOP_PIPE_BOTTOM_Y, PIPE_GAP)

  pipeSprite.setRandomPipeGapPosition();
  pipeSprites.push(pipeSprite);
  engine.addSprite(pipeSprite.getTop());
  engine.addSprite(pipeSprite.getBottom());
}

const resetPipes = (pipes: Pipe[]) => {
  for (let i = 1; i <= pipes.length; i++) {
    const pipe = pipes[i -1];
    pipe.setX((pipeX * (i / numPipes)) + pipeOffset);
    pipe.setRandomPipeGapPosition();
  }
}

const updatePipes = () => {
  pipeSprites.forEach((pipe) => {
    // Move horizontally
    pipe.moveHorizontally(-8)

    // wrap pipe around screen
    if (pipe.getX() < (-1 * pipe.getWidth())) { 
      pipe.top.setX(engine.getCanvasWidth());
      pipe.bottom.setX(engine.getCanvasWidth());
      pipe.setRandomPipeGapPosition();
    }
  })
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
  const groundHeight = engine.getCanvasHeight() * 0.05;
  engine.setFillColor('SandyBrown');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight)
  engine.setFillColor('SaddleBrown');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight * 0.4)
  engine.setFillColor('green');
  engine.rect(0, engine.getCanvasHeight() - groundHeight, engine.getCanvasWidth(), groundHeight * 0.15)
}


const updateScore = () => {
  pipeSprites.forEach((pipe) => {
    if (birdSprite.getX() > pipe.getX() && birdSprite.getX() - pipe.getX() <= 8) {
      score++;
      pointSound.play()
    }
  });
}

const drawScore = () => {
  engine.setFillColor("black");
  engine.drawText(String(score), scoreX, scoreY); // Increase and draw score

  bestScore = bestScore < score ? score : bestScore; // New best score?
  engine.drawText(`Best: ${bestScore}`, bestScoreX, bestScoreY)
};

const detectCollisions = () => {
  return (pipeSprites.some((pipe) => {
    return birdSprite.isTouching(pipe.top) || birdSprite.isTouching(pipe.bottom);
  }) || engine.isTouchingWalls(birdSprite));

}

const startGame = () => {
  birdSprite.setGravity(0.5);
  birdSprite.setDY(0);
  gameInProgress = true;

}

const endGame = () => {
  pointSound.stop();
  dieSound.play();

  birdSprite.setDY(0);
  birdSprite.setY(200);

  birdSprite.setGravity(0);
  birdSprite.setDY(0);

  resetPipes(pipeSprites);

  score = 0; // Bird died
  gameInProgress = false;
}

engine.addOnClickListner(() => {
  if (!gameInProgress) {
    startGame();;
  }
});

engine.addKeyPressListener(() => {
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
    updateScore();
    if (detectCollisions()) {
      endGame();
    }
  }
  drawScore();
});

