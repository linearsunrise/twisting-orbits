export interface AppState {
  width: number;
  height: number;
  orbitsCount: number;
  orbitStride: number;
  twistAmount: number;
  twistMin: number;
  twistMax: number;
  isAnimating: boolean;
  isDisplayOrbitLines: boolean;
}

export interface SceneParams {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  orbitsCount: number;
  orbitStride: number;
  twistAmount: number;
  clear?: boolean;
  isDisplayOrbitLines: boolean;
}

export interface DrawingContext extends CanvasRenderingContext2D {
  // clearRect(x: number, y: number, w: number, h: number): void;
  // fillStyle: string | CanvasGradient | CanvasPattern;
  // beginPath(): void;
  // arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  // fill(fillRule?: CanvasFillRule): void;
}

export interface Controls {
  refresh(): void;
}

export interface InitControlsOptions {
  state: AppState;
  onChange: () => void;
  onToggleAnimation: (isAnimating: boolean) => void;
  onExport: () => void;
}
