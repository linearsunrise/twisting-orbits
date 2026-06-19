export const TWO_PI = Math.PI * 2;

export function pointAngle(pointIndex: number, pointsOnOrbit: number, phaseOffset: number): number {
  return pointIndex * (TWO_PI / pointsOnOrbit) + phaseOffset;
}

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
): { x: number; y: number } {
  return {
    x: centerX + Math.sin(angle) * radius,
    y: centerY + Math.cos(angle) * radius,
  };
}

export function orbitTwistOffset(orbitIndex: number, orbitsCount: number, twistAmount: number): number {
  return twistAmount * (orbitIndex / orbitsCount) * Math.PI;
}
