import { Assets } from "./types";
import { BackgroundManager } from "./background_manager";
import { PipeManager } from "./pipe_manager";
import { createCanvas, loadImage } from "./util";

export class App {
  private backgroundManager: BackgroundManager;
  private pipeManager: PipeManager;

  public async run() {
    const assets = await this.loadAssets();
    const canvas = this.setupCanvas(assets);

    this.backgroundManager = new BackgroundManager(assets, canvas);
    this.pipeManager = new PipeManager(assets, canvas);

    this.draw();
  }

  private async loadAssets() {
    return {
      background: await loadImage("002-flappy-bird/assets/background.png"),
      bird: await loadImage("002-flappy-bird/assets/bird.png"),
      ground: await loadImage("002-flappy-bird/assets/ground.png"),
      pipeBottom: await loadImage("002-flappy-bird/assets/pipe-bottom.png"),
      pipeTop: await loadImage("002-flappy-bird/assets/pipe-top.png"),
    };
  }

  private setupCanvas(assets: Assets): HTMLCanvasElement {
    const canvas = createCanvas({
      width: assets.background.width,
      height: assets.background.height,
    });
    document.body.append(canvas);
    return canvas;
  }

  private draw() {
    this.backgroundManager.update();
    this.pipeManager.update();

    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
