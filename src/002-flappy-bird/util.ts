import { CanvasOptions } from "./types";

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function createCanvas(options: CanvasOptions): HTMLCanvasElement {
  const { width, height } = options;
  const canvas = document.createElement("canvas");
  const devicePixelRatio = window.devicePixelRatio || 1;
  const context = canvas.getContext("2d");

  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.scale(devicePixelRatio, devicePixelRatio);

  return canvas;
}

export function random(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
