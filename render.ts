import { pointAngle, polarToCartesian, orbitTwistOffset } from "./math.ts";
import type { SceneParams } from "./types.ts";

const POINT_RADIUS_PX = 4;
const POINT_COLOR = "#a0a0a0";
const ORBIT_RADIUS_STEP_PX = 10;

export function renderOrbitField(
  ctx: CanvasRenderingContext2D,
  {
    width,
    height,
    centerX,
    centerY,
    orbitsCount,
    orbitStride,
    twistAmount,
    clear = true,
    isDisplayOrbitLines,
  }: SceneParams,
): void {
  if (clear) {
    ctx.clearRect(0, 0, width, height);
  }

  for (let orbitIndex = 0; orbitIndex < orbitsCount; orbitIndex++) {
    if (orbitIndex % orbitStride !== 0) continue;

    const pointsOnOrbit = orbitIndex;
    const orbitRadius = orbitIndex * ORBIT_RADIUS_STEP_PX;
    const phaseOffset = orbitTwistOffset(orbitIndex, orbitsCount, twistAmount);

    if (isDisplayOrbitLines) {
      drawOrbitLine(ctx, centerX, centerY, orbitRadius, POINT_COLOR);
    }

    drawOrbitPoints(
      ctx,
      centerX,
      centerY,
      orbitRadius,
      pointsOnOrbit,
      phaseOffset,
    );
  }
}

function drawOrbitLine(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  color: string,
) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

function drawOrbitPoints(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  pointsOnOrbit: number,
  phaseOffset: number,
): void {
  for (let pointIndex = 0; pointIndex < pointsOnOrbit; pointIndex++) {
    const angle = pointAngle(pointIndex, pointsOnOrbit, phaseOffset);
    const { x, y } = polarToCartesian(centerX, centerY, radius, angle);
    drawPoint(ctx, x, y, POINT_RADIUS_PX, POINT_COLOR);
  }
}

function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
