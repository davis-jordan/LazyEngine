import { DEFAULT_FPS } from './constants/EngineConstants';
import { getIntervalTimeFromFps } from './helpers/getIntervalTimeFromFps';
import Sprite from './objects/Sprite';

// TODO: refactor to be singleton or namespace

class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private loopInterval: number | null;
  private fps: number;
  private sprites: Sprite[]; 

  constructor() {
    this.canvas = (document.getElementById('c') as HTMLCanvasElement);
    this.context = (this.canvas.getContext("2d") as CanvasRenderingContext2D);
    this.loopInterval = null;
    this.fps = DEFAULT_FPS;
    this.sprites = [];
  }

  public loop = (fn: () => void) => {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
    }
    this.loopInterval = setInterval(() => {
      fn();
      this.sprites.forEach((sprite) => {
        sprite.draw();
        sprite.applyGravity();
      });
    }, getIntervalTimeFromFps(this.fps));
  }

  public addOnClickListner = (fn: () => void) => {
    window.addEventListener("click", (e) => {
      e.preventDefault();
      fn()
    });
  }

  public addKeyPressListener = (fn: () => void) => {
    window.addEventListener("keypress", (e) => {
      e.preventDefault();
      fn()
    });
  }

  // Setters ----------------------------------------------------------------------
  public setFPS = (fps: number) => {
    this.fps = fps;
  }

  public setBackgroundColor = (color: string) => {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const prevFillColor = this.context.fillStyle;

    this.setFillColor(color);
    this.rect(0, 0, canvasWidth, canvasHeight);
    this.setFillColor(prevFillColor);
  }

  public setFillColor = (color: string|CanvasGradient|CanvasPattern) => {
    this.context.fillStyle = color;
  }

  public setCanvasWidth = (width: number) => {
    this.canvas.width = width;
  }

  public setCanvasHeight = (height: number) => {
    this.canvas.height = height;
  }

  // Getters ----------------------------------------------------------------------
  public getContext = () => this.context;

  public getCanvasWidth = () => this.canvas.width;

  public getCanvasHeight = () => this.canvas.height;

  // Shpaes ------------------------------------------------------------------------
  public rect = (x: number, y: number, width: number, height: number) => {
    this.context.fillRect(x, y, width, height); // Draw sky
  }

  // Sprites ------------------------------------------------------------------------
  public createSprite = (image: string, width: number, height: number, startX: number, startY: number) => {
    const newSprite = new Sprite(this.context, image, width, height, startX, startY)
    this.sprites.push(newSprite);
    return newSprite;
  }

  public addSprite = (sprite: Sprite) => {
    this.sprites.push(sprite);
  }

  public isTouchingWalls = (sprite: Sprite) => {
    return (sprite.getX() < 0 || (sprite.getX() + sprite.getWidth()) > this.canvas.width ||
           sprite.getY() < 0 || (sprite.getY() + sprite.getHeight()) > this.canvas.height)
  }

  // Text ------------------------------------------------------------------------
  public drawText = (text: string, x: number, y: number) => {
  this.context.fillText(text, x, y); 
  }
}

export default Engine;
