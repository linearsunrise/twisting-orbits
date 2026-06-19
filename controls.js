export function initControls({ state, onChange, onToggleAnimation, onExport }) {
  const twistRange = document.getElementById("twistRange");
  const twistValue = document.getElementById("twistValue");
  const orbitsCountRange = document.getElementById("orbitsCountRange");
  const orbitsCountValue = document.getElementById("orbitsCountValue");
  const orbitStrideRange = document.getElementById("orbitStrideRange");
  const orbitStrideValue = document.getElementById("orbitStrideValue");
  const animateToggle = document.getElementById("animateToggle");
  const exportButton = document.getElementById("exportButton");

  function refresh() {
    twistRange.value = state.twistAmount;
    twistValue.textContent = state.twistAmount.toFixed(2);
    orbitsCountValue.textContent = state.orbitsCount;
    orbitStrideValue.textContent = state.orbitStride;
  }

  twistRange.addEventListener("input", () => {
    state.twistAmount = parseFloat(twistRange.value);
    refresh();
    onChange();
  });

  orbitsCountRange.addEventListener("input", () => {
    state.orbitsCount = parseInt(orbitsCountRange.value, 10);
    refresh();
    onChange();
  });

  orbitStrideRange.addEventListener("input", () => {
    state.orbitStride = parseInt(orbitStrideRange.value, 10);
    refresh();
    onChange();
  });

  animateToggle.addEventListener("change", () => {
    const isAnimating = animateToggle.checked;

    twistRange.disabled = isAnimating;
    exportButton.disabled = isAnimating;

    onToggleAnimation(isAnimating);
  });

  exportButton.addEventListener("click", onExport);

  orbitsCountRange.value = state.orbitsCount;
  orbitStrideRange.value = state.orbitStride;
  refresh();

  return { refresh };
}