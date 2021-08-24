import { DEFAULT_FPS } from './constants/EngineConstants.js';
import Sprite from './objects/Sprite.js';

class Engine {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  loopInterval: NodeJS.Timer | null;
  fps: number;
  sprites: any[]; // TODO: change type

  constructor() {
    this.canvas = (document.getElementById('c') as HTMLCanvasElement);
    this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
    this.loopInterval = null;
    this.fps = DEFAULT_FPS;
    this.sprites = [];
  }

  loop = (fn: () => void) => {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
    }
    this.loopInterval = setInterval(() => {
      fn();
      this.sprites.forEach((sprite) => {
        sprite.draw();
        sprite.applyGravity();
      });
    }, (1000/this.fps));
  }

  addOnClickListner = (fn: () => void) => {
    this.canvas.addEventListener('click', fn, false);
  }

  // Setters ----------------------------------------------------------------------
  setFPS = (fps: number) => {
    this.fps = fps;
  }

  setBackgroundColor = (color: string) => {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const prevFillColor = this.context.fillStyle;

    this.setFillColor(color);
    this.rect(0, 0, canvasWidth, canvasHeight);
    this.setFillColor(prevFillColor);
  }

  setFillColor = (color: string|CanvasGradient|CanvasPattern) => {
    this.context.fillStyle = color;
  }

  setCanvasWidth = (width: number) => {
    this.canvas.width = width;
  }

  setCanvasHeight = (height: number) => {
    this.canvas.height = height;
  }

  // Getters ----------------------------------------------------------------------
  getContext = () => this.context;

  getCanvasWidth = () => this.canvas.width;

  getCanvasHeight = () => this.canvas.height;

  // Shpaes ------------------------------------------------------------------------
  rect = (x: number, y: number, width: number, height: number) => {
    this.context.fillRect(x, y, width, height); // Draw sky
  }

  // Sprites ------------------------------------------------------------------------
  createSprite = (image: string, width: number, height: number, startX: number, startY: number) => {
    const newSprite = new Sprite(this.context, image, width, height, startX, startY)
    this.sprites.push(newSprite);
    return newSprite;
  }

  isTouchingWalls = (sprite: Sprite) => {
    return (sprite.getX() < 0 || (sprite.getX() + sprite.getWidth()) > this.canvas.width ||
           sprite.getY() < 0 || (sprite.getY() + sprite.getHeight()) > this.canvas.height)
  }

  // Text ------------------------------------------------------------------------
  drawText = (text: string, x: number, y: number) => {
  this.context.fillText(text, x, y); 
  }
}

export default Engine;
