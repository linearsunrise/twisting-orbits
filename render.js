import { pointAngle, polarToCartesian, orbitTwistOffset } from "./math.js";

const POINT_RADIUS_PX = 4;
const POINT_COLOR = "#a0a0a0";
const ORBIT_RADIUS_STEP_PX = 10;

/**
 * Орбита с индексом N содержит ровно N точек и имеет радиус N * ORBIT_RADIUS_STEP_PX.
 * Это намеренное правило, а не побочный эффект: оно и создаёt спиралевидный узор.
 *
 * @param {CanvasRenderingContext2D} ctx — обычный canvas-контекст или
 *   svgcanvas/canvas2svg-совместимый мок с тем же API.
 */
export function renderOrbitField(
  ctx,
  { width, height, centerX, centerY, orbitsCount, orbitStride, twistAmount, clear = true },
) {
  if (clear) {
    ctx.clearRect(0, 0, width, height);
  }

  for (let orbitIndex = 0; orbitIndex < orbitsCount; orbitIndex++) {
    if (orbitIndex % orbitStride !== 0) continue;

    const pointsOnOrbit = orbitIndex;
    const orbitRadius = orbitIndex * ORBIT_RADIUS_STEP_PX;
    const phaseOffset = orbitTwistOffset(orbitIndex, orbitsCount, twistAmount);

    drawOrbitPoints(ctx, centerX, centerY, orbitRadius, pointsOnOrbit, phaseOffset);
  }
}

function drawOrbitPoints(ctx, centerX, centerY, radius, pointsOnOrbit, phaseOffset) {
  for (let pointIndex = 0; pointIndex < pointsOnOrbit; pointIndex++) {
    const angle = pointAngle(pointIndex, pointsOnOrbit, phaseOffset);
    const { x, y } = polarToCartesian(centerX, centerY, radius, angle);

    drawPoint(ctx, x, y, POINT_RADIUS_PX, POINT_COLOR);
  }
}

function drawPoint(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}