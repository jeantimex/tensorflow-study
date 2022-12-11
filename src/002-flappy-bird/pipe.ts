import { Assets } from "./types";
import { random } from "./util";

export class Pipe {
  private assets: Assets;
  private canvas: HTMLCanvasElement;
  private speed: number;
  private gap: number;
  private y: number;
  private pipeTopY: number;
  private pipeBottomY: number;

  public x: number;

  constructor(assets: Assets, canvas: HTMLCanvasElement, x: number) {
    this.assets = assets;
    this.canvas = canvas;
    this.x = x;
    this.speed = 5;
    this.gap = random(80, 150);
    this.pipeTopY = random(0, -this.assets.pipeTop.height + 50);
    this.pipeBottomY = this.pipeTopY + this.assets.pipeTop.height + this.gap;
  }

  public update() {
    const context = this.canvas.getContext("2d");

    context.drawImage(this.assets.pipeTop, this.x, this.pipeTopY);
    context.drawImage(this.assets.pipeBottom, this.x, this.pipeBottomY);

    this.x -= this.speed;
  }
}
