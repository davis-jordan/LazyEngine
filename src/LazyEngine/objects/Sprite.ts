class Sprite {
  context: CanvasRenderingContext2D;
  sprite: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  gravity: number;
  dy: number;

  constructor(context: CanvasRenderingContext2D, image: string, width: number, height: number, startX: number, startY: number) {
    this.context = context;
    this.sprite = new Image();
    this.sprite.src = image;
    this.x = startX;
    this.y = startY;
    this.width = width;
    this.height = height;

    this.gravity = 0;
    this.dy = 0;
  }

  setGravity = (gravity: number) => {
    this.gravity = gravity;
  }

  applyGravity = () => {
    this.y -= this.dy;
    this.dy -= this.gravity;
  }

  jump = (value: number) => {
    this.dy = value;
  }

  draw = () => {
    this.context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  // Getters ----------------------------------------------------------------------
  getX = () => this.x;

  getY = () => this.y;

  getWidth = () => this.width;
  getHeight = () => this.height;

  // Setters ----------------------------------------------------------------------
  setX = (x: number) => {
    this.x = x;
  }

  setY = (y: number) => {
    this.y = y;
  }

  setDY = (dy: number) => {
    this.dy = dy;
  }
}

export default Sprite;
