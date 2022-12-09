import { Assets } from "./types";
import { createCanvas, loadImage } from "./util";

export class App {
  public async run() {
    const assets = await this.loadAssets();
    const canvas = this.setupCanvas(assets);
    this.draw(assets, canvas);
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

  private draw(assets: Assets, canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(assets.background, 0, 0);

    requestAnimationFrame(() => {
      this.draw(assets, canvas);
    });
  }
}
