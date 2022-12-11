import { Assets } from "./types";
import { Pipe } from "./pipe";
import { random } from "./util";

export class PipeManager {
  private assets: Assets;
  private canvas: HTMLCanvasElement;
  private pipes: Array<Pipe>;

  constructor(assets: Assets, canvas: HTMLCanvasElement) {
    this.assets = assets;
    this.canvas = canvas;
    this.pipes = [];

    this.addPipe();
  }

  private addPipe() {
    const { width } = this.assets.background;
    const pipe = new Pipe(this.assets, this.canvas, width);

    this.pipes.push(pipe);
  }

  public update() {
    if (this.pipes.length <= 0) return;

    for (const pipe of this.pipes) {
      pipe.update();
    }

    const lastPipe = this.pipes[this.pipes.length - 1];
    if (lastPipe.x < random(0, 10)) {
      this.addPipe();
    }

    const firstPipe = this.pipes[0];
    if (firstPipe.x < -this.assets.pipeTop.width) {
      this.pipes.shift();
    }
  }
}
