import { Assets } from "./types";
import { BackgroundManager } from "./background_manager";
import { Bird } from "./bird";
import { FpsMeter } from "./fps_meter";
import { PipeManager } from "./pipe_manager";
import { createCanvas, loadImage, random } from "./util";

const POPULATION = 1;

export class App {
  private backgroundManager: BackgroundManager;
  private pipeManager: PipeManager;
  private fpsMeter: FpsMeter;
  private currentBirds: Array<Bird>;

  public async run() {
    const assets = await this.loadAssets();
    const canvas = this.setupCanvas(assets);

    this.backgroundManager = new BackgroundManager(assets, canvas);
    this.pipeManager = new PipeManager(assets, canvas);
    this.currentBirds = this.createBirds(assets, canvas);
    this.fpsMeter = new FpsMeter(canvas);

    // Listen for keyboard strokes
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      this.handleKeyDown(event);
    });

    this.loop(assets, canvas);
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

  private createBirds(assets: Assets, canvas: HTMLCanvasElement): Array<Bird> {
    const birds: Array<Bird> = [];

    for (let i = 0; i < POPULATION; i++) {
      const x = 50;
      const canvasHeight = assets.background.height;
      const y = canvasHeight / 2;
      const bird = new Bird(assets, canvas, x, y);
      birds.push(bird);
    }

    return birds;
  }

  private handleKeyDown(event: KeyboardEvent) {
    for (const bird of this.currentBirds) {
      bird.jump();
    }
  }

  private loop(assets: Assets, canvas: HTMLCanvasElement) {
    this.backgroundManager.update();
    this.pipeManager.update();

    for (let i = this.currentBirds.length - 1; i >= 0; i--) {
      const bird = this.currentBirds[i];
      bird.update();

      if (bird.isOutOfScreen()) {
        this.currentBirds.splice(i, 1);
        continue;
      }

      const pipes = this.pipeManager.getPipes();
      for (const pipe of pipes) {
        if (pipe.isCollidedWithBird(bird)) {
          this.currentBirds.splice(i, 1);
        } else if (pipe.pass(bird.x)) {
          bird.score++;
          console.log(bird.score);
        }
      }
    }

    if (this.currentBirds.length === 0) {
      this.pipeManager.reset();
      this.currentBirds = this.createBirds(assets, canvas);
    }

    this.fpsMeter.update();

    requestAnimationFrame(() => {
      this.loop(assets, canvas);
    });
  }
}
