export const TWO_PI = Math.PI * 2;

export function pointAngle(pointIndex, pointsOnOrbit, phaseOffset) {
  return pointIndex * (TWO_PI / pointsOnOrbit) + phaseOffset;
}

export function polarToCartesian(centerX, centerY, radius, angle) {
  return {
    x: centerX + Math.sin(angle) * radius,
    y: centerY + Math.cos(angle) * radius,
  };
}

export function orbitTwistOffset(orbitIndex, orbitsCount, twistAmount) {
  return twistAmount * (orbitIndex / orbitsCount) * Math.PI;
}