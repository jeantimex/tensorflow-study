import { Assets } from "./types";
import { createCanvas, loadImage } from "./util";

export class App {
  private fps: number;
  private then: number;

  constructor() {
    this.fps = 120;
    this.then = Date.now();
  }

  public async run() {
    const assets = await this.loadAssets();
    this.setup(assets);
    this.draw();
  }

  private setup(assets: Assets) {
    const canvas = createCanvas({
      width: assets.background.width,
      height: assets.background.height,
    });
    document.body.append(canvas);
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

  private draw() {
    const now = Date.now();
    const delta = now - this.then;

    if (delta > 1000 / this.fps) {
      // update time stuffs

      // Calculate fps
      const fps = Math.round(1000 / delta);
      console.log(fps);

      // Just `then = now` is not enough.
      // Lets say we set fps at 10 which means
      // each frame must take 100ms
      // Now frame executes in 16ms (60fps) so
      // the loop iterates 7 times (16*7 = 112ms) until
      // delta > interval === true
      // Eventually this lowers down the FPS as
      // 112*10 = 1120ms (NOT 1000ms).
      // So we have to get rid of that extra 12ms
      // by subtracting delta (112) % interval (100).
      // Hope that makes sense.

      this.then = now - (delta % (1000 / this.fps));

      // ... Code for Drawing the Frame ...
    }

    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
