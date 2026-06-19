import type { Controls, InitControlsOptions } from './types.ts';

export function initControls({ state, onChange, onToggleAnimation, onExport }: InitControlsOptions): Controls {
  const twistRange = document.getElementById('twistRange') as HTMLInputElement;
  const twistValue = document.getElementById('twistValue') as HTMLSpanElement;
  const orbitsCountRange = document.getElementById('orbitsCountRange') as HTMLInputElement;
  const orbitsCountValue = document.getElementById('orbitsCountValue') as HTMLSpanElement;
  const orbitStrideRange = document.getElementById('orbitStrideRange') as HTMLInputElement;
  const orbitStrideValue = document.getElementById('orbitStrideValue') as HTMLSpanElement;
  const animateToggle = document.getElementById('animateToggle') as HTMLInputElement;
  const exportButton = document.getElementById('exportButton') as HTMLButtonElement;

  function refresh(): void {
    twistRange.value = String(state.twistAmount);
    twistValue.textContent = state.twistAmount.toFixed(2);
    orbitsCountValue.textContent = String(state.orbitsCount);
    orbitStrideValue.textContent = String(state.orbitStride);
  }

  twistRange.addEventListener('input', () => {
    state.twistAmount = parseFloat(twistRange.value);
    refresh();
    onChange();
  });

  orbitsCountRange.addEventListener('input', () => {
    state.orbitsCount = parseInt(orbitsCountRange.value, 10);
    refresh();
    onChange();
  });

  orbitStrideRange.addEventListener('input', () => {
    state.orbitStride = parseInt(orbitStrideRange.value, 10);
    refresh();
    onChange();
  });

  animateToggle.addEventListener('change', () => {
    const isAnimating = animateToggle.checked;
    twistRange.disabled = isAnimating;
    exportButton.disabled = isAnimating;
    onToggleAnimation(isAnimating);
  });

  exportButton.addEventListener('click', onExport);

  orbitsCountRange.value = String(state.orbitsCount);
  orbitStrideRange.value = String(state.orbitStride);
  refresh();

  return { refresh };
}
