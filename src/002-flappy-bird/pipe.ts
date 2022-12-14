import { Assets } from "./types";
import { Bird } from "./bird";
import { random } from "./util";

export class Pipe {
  private assets: Assets;
  private canvas: HTMLCanvasElement;
  private gap: number;
  private pipeTopY: number;
  private pipeBottomY: number;
  private pipeTopBottomY: number;
  private pipeBottomTopY: number;
  private width: number;
  private hasPassed: boolean;

  public x: number;

  constructor(assets: Assets, canvas: HTMLCanvasElement, x: number) {
    this.assets = assets;
    this.canvas = canvas;

    this.x = x;
    this.gap = random(120, 150);
    this.width = this.assets.pipeTop.width;

    this.pipeTopY = random(0, -this.assets.pipeTop.height + 50);
    this.pipeBottomY = this.pipeTopY + this.assets.pipeTop.height + this.gap;

    this.pipeTopBottomY = this.pipeTopY + this.assets.pipeTop.height;
    this.pipeBottomTopY = this.pipeBottomY;

    this.hasPassed = false;
  }

  public update() {
    const context = this.canvas.getContext("2d");

    context.drawImage(this.assets.pipeTop, this.x, this.pipeTopY);
    context.drawImage(this.assets.pipeBottom, this.x, this.pipeBottomY);

    const speed = 1;
    this.x -= speed;
  }

  public isCollidedWithBird(bird: Bird) {
    if (bird.x + bird.width >= this.x && bird.x <= this.x + this.width) {
      if (
        bird.y <= this.pipeTopBottomY ||
        bird.y + bird.height >= this.pipeBottomTopY
      ) {
        return true;
      }
    }
    return false;
  }

  public pass(x: number): boolean {
    if (this.x + this.width < x && !this.hasPassed) {
      this.hasPassed = true;
      return true;
    }
    return false;
  }
}
