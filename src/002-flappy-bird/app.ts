import { Assets } from "./types";
import { createCanvas, loadImage } from "./util";

export class App {
  private assets: Assets;
  private canvas: HTMLCanvasElement;
  private fps: number;
  private then: number;

  constructor() {
    this.fps = 120;
    this.then = Date.now();
  }

  public async run() {
    this.assets = await this.loadAssets();
    this.setup();
    this.loop();
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

  private setup() {
    if (!this.assets) return;

    this.canvas = createCanvas({
      width: this.assets.background.width,
      height: this.assets.background.height,
    });
    document.body.append(this.canvas);
  }

  private draw() {
    if (!this.assets || !this.canvas) return;

    const context = this.canvas.getContext("2d");

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.drawImage(this.assets.background, 0, 0);
  }

  private loop() {
    const now = Date.now();
    const delta = now - this.then;
    const interval = 1000 / this.fps;

    // Control the FPS.
    if (delta > interval) {
      // Calculate fps
      // const currentFps = Math.round(1000 / delta);
      // console.log(currentFps);

      // update time stuffs

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

      this.then = now - (delta % interval);

      // ... Code for Drawing the Frame ...
      this.draw();
    }

    requestAnimationFrame(() => {
      this.loop();
    });
  }
}
