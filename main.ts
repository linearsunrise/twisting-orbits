import { state, getSceneParams } from './state.ts';
import { renderOrbitField } from './render.ts';
import { initControls } from './controls.ts';
import { startAnimation, stopAnimation } from './animation.ts';
import { exportSceneAsSvg } from './export.ts';

const canvas = document.getElementById('draw') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function resizeCanvas(): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  state.width = canvas.width;
  state.height = canvas.height;
}

resizeCanvas();

function render(): void {
  controls.refresh();
  renderOrbitField(ctx, getSceneParams(state));
}

const controls = initControls({
  state,
  onChange: render,
  onToggleAnimation: (isAnimating: boolean) => {
    state.isAnimating = isAnimating;

    if (isAnimating) {
      startAnimation(state, render);
    } else {
      stopAnimation();
    }
  },
  onExport: () => {
    if (state.isAnimating) return;
    exportSceneAsSvg(getSceneParams(state));
  },
});

window.addEventListener('resize', () => {
  resizeCanvas();
  render();
});

const controlsEl = document.querySelector('.controls') as HTMLElement;
const controlsToggle = document.getElementById('controlsToggle') as HTMLButtonElement;

controlsEl.addEventListener('dblclick', () => {
  controlsEl.classList.add('controls--hidden');
});

controlsToggle.addEventListener('click', () => {
  controlsEl.classList.remove('controls--hidden');
});

render();
