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

export interface Controls {
  refresh(): void;
}

export interface InitControlsOptions {
  state: AppState;
  onChange: () => void;
  onToggleAnimation: (isAnimating: boolean) => void;
  onExport: () => void;
}
