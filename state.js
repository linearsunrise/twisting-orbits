export const state = {
  width: 0,
  height: 0,

  orbitsCount: 21,
  orbitStride: 1,

  twistAmount: 0,
  twistMin: 0,
  twistMax: 2,

  isAnimating: false,
};

export function getSceneParams(currentState) {
  return {
    width: currentState.width,
    height: currentState.height,
    centerX: currentState.width / 2,
    centerY: currentState.height / 2,
    orbitsCount: currentState.orbitsCount,
    orbitStride: currentState.orbitStride,
    twistAmount: currentState.twistAmount,
  };
}