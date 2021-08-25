import { getRandomNumberInRange } from '../helpers/getRandomNumberInRange.js';
import { Engine, Sprite } from '../LazyEngine/index.js';

getRandomNumberInRange
class Pipe {
  top: Sprite;
  bottom: Sprite;
  engine: Engine; // TODO: remove this and refactor engine to singleton
  pipeHeight: number;
  pipeGap: number;

  constructor(context: CanvasRenderingContext2D, engine: Engine, pipeWidth: number, pipeHeight: number, pipeX: number, topPipeBottomY: number, pipeGap: number) {
    this.top = new Sprite(context, '../assets/pipeTop.png', pipeWidth, pipeHeight, pipeX, topPipeBottomY - pipeHeight);
    this.bottom = new Sprite(context, '../assets/pipeBottom.png', pipeWidth, pipeHeight, pipeX, topPipeBottomY + pipeGap);
    this.engine = engine;
    this.pipeHeight = pipeHeight;
    this.pipeGap = pipeGap;
  }

  moveHorizontally = (amount: number) => {
    const currX = this.top.getX();
    this.top.setX(currX + amount);
    this.bottom.setX(currX + amount);
  }

  setRandomPipeGapPosition = () => {
    const canvasHeight = this.engine.getCanvasHeight();
    const pipeBottomY = getRandomNumberInRange(canvasHeight * 0.15, canvasHeight * 0.75 - this.pipeGap);

    this.top.setY(pipeBottomY - this.pipeHeight);
    this.bottom.setY(pipeBottomY + this.pipeGap);
  }


  // Getters
  getWidth = () => this.top.getWidth();

  getX = () => this.top.getX();

  getTop = () => this.top;

  getBottom = () => this.bottom;

  // Setters
  setX = (x: number) => {
    this.top.setX(x);
    this.bottom.setX(x);
  }
}

export default Pipe;
