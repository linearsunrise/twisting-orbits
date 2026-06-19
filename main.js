import { state, getSceneParams } from "./state.js";
import { renderOrbitField } from "./render.js";
import { initControls } from "./controls.js";
import { startAnimation, stopAnimation } from "./animation.js";
import { exportSceneAsSvg } from "./export.js";

const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");

state.width = canvas.width;
state.height = canvas.height;

function render() {
  controls.refresh();
  renderOrbitField(ctx, getSceneParams(state));
}

const controls = initControls({
  state,
  onChange: render,
  onToggleAnimation: (isAnimating) => {
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

render();