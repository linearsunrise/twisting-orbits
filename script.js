const f = (x, a, om) => Math.sin(x * ((2 * Math.PI) / a) + om);
const g = (x, a, om) => Math.cos(x * ((2 * Math.PI) / a) + om);

const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

const slider = document.getElementById("pointRange");
const valDisplay = document.getElementById("val");
const slider2 = document.getElementById("pointRange2");
const valDisplay2 = document.getElementById("val2");
const slider3 = document.getElementById("pointRange3");
const valDisplay3 = document.getElementById("val3");

function drawCirclePoint(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawOrbit(centerX, centerY, radius, color) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let frame = 0;

function render() {
  const divider = parseInt(slider3.value);
  valDisplay3.textContent = divider;

  const orbitsCount = parseInt(slider2.value);
  valDisplay2.textContent = orbitsCount;

  const orbits = Array.from({ length: orbitsCount }).map((_, v) => v);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // const phaseShift = frame;
  const phaseShift = parseFloat(slider.value);
  const phaseShiftMax = parseInt(slider.max) - 1;
  valDisplay.textContent = phaseShift;

  orbits.forEach((numPoints, index, { length: max }) => {
    const radius = index * 10;
    // const color = `hsl(${index * 40}, 70%, 60%)`; // Разные цвета
    const color = "#a0a0a0";

    if (![0].includes(index % divider)) return;

    // drawOrbit(centerX, centerY, radius, color);

    for (let i = 0; i < numPoints; i++) {
      const x =
        centerX +
        f(
          i,
          numPoints,
          (phaseShift / phaseShiftMax) * ((index / max) * Math.PI),
        ) *
          radius;
      const y =
        centerY +
        g(
          i,
          numPoints,
          (phaseShift / phaseShiftMax) * ((index / max) * Math.PI),
        ) *
          radius;

      drawCirclePoint(x, y, 4, color);
    }
  });
}

slider.addEventListener("input", render);
slider2.addEventListener("input", render);
slider3.addEventListener("input", render);

render();

function autoIncrement() {
  frame++;

  render();

  setTimeout(autoIncrement, 1000 / 60);
}

// autoIncrement();
