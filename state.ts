import type { AppState, SceneParams } from './types.ts';

export const state: AppState = {
  width: 0,
  height: 0,
  orbitsCount: 21,
  orbitStride: 1,
  twistAmount: 0,
  twistMin: 0,
  twistMax: 21,
  isAnimating: false,
  isDisplayOrbitLines: false,
};

export function getSceneParams(currentState: AppState): SceneParams {
  return {
    width: currentState.width,
    height: currentState.height,
    centerX: currentState.width / 2,
    centerY: currentState.height / 2,
    orbitsCount: currentState.orbitsCount,
    orbitStride: currentState.orbitStride,
    twistAmount: currentState.twistAmount,
    isDisplayOrbitLines: currentState.isDisplayOrbitLines,
  };
}

export function setOrbitsCount(state: AppState, value: number): void {
  state.orbitsCount = value;
  state.twistMax = value;
  if (state.twistAmount > state.twistMax) {
    state.twistAmount = state.twistMax;
  }
}