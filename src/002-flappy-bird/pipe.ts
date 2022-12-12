import { Assets } from "./types";
import { random } from "./util";

export class Pipe {
  private assets: Assets;
  private canvas: HTMLCanvasElement;
  private gap: number;
  private pipeTopY: number;
  private pipeBottomY: number;

  public pipeTopBottomY: number;
  public pipeBottomTopY: number;
  public x: number;
  public width: number;

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
  }

  public update() {
    const context = this.canvas.getContext("2d");

    context.drawImage(this.assets.pipeTop, this.x, this.pipeTopY);
    context.drawImage(this.assets.pipeBottom, this.x, this.pipeBottomY);

    const speed = 1;
    this.x -= speed;
  }
}
