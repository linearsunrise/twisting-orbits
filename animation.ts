import type { AppState } from './types.ts';

const TWIST_SPEED_PER_SECOND = 0.6;

let animationFrameId: number | null = null;
let direction = 1;
let lastTimestamp = 0;

export function startAnimation(state: AppState, onTick: () => void): void {
  if (animationFrameId !== null) return;

  lastTimestamp = performance.now();

  const tick = (timestamp: number): void => {
    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    advanceTwist(state, deltaSeconds);
    onTick();

    animationFrameId = requestAnimationFrame(tick);
  };

  animationFrameId = requestAnimationFrame(tick);
}

export function stopAnimation(): void {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function advanceTwist(state: AppState, deltaSeconds: number): void {
  state.twistAmount += direction * TWIST_SPEED_PER_SECOND * deltaSeconds;

  if (state.twistAmount >= state.twistMax) {
    state.twistAmount = state.twistMax;
    direction = -1;
  } else if (state.twistAmount <= state.twistMin) {
    state.twistAmount = state.twistMin;
    direction = 1;
  }
}
