import { renderOrbitField } from './render.ts';
import type { CanvasRenderingContext2D, SceneParams } from './types.ts';

declare var C2S: new (width: number, height: number) => CanvasRenderingContext2D & {
  getSerializedSvg(fix: boolean): string;
};

export function exportSceneAsSvg(sceneParams: SceneParams, filename = 'twisting-orbits.svg'): void {
  if (typeof C2S === 'undefined') {
    alert(
      'Не найдена библиотека для экспорта в SVG. Подключите canvas2svg ' +
        '(или совместимую svgcanvas-библиотеку) в index.html.',
    );
    return;
  }

  const svgContext = new C2S(sceneParams.width, sceneParams.height);
  renderOrbitField(svgContext, { ...sceneParams, clear: false });

  const svgMarkup = svgContext.getSerializedSvg(true);
  downloadTextFile(filename, svgMarkup, 'image/svg+xml');
}

function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
