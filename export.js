import { renderOrbitField } from "./render.js";

export function exportSceneAsSvg(sceneParams, filename = "twisting-orbits.svg") {
  if (typeof C2S === "undefined") {
    alert(
      "Не найдена библиотека для экспорта в SVG. Подключите canvas2svg " +
        "(или совместимую svgcanvas-библиотеку) в index.html.",
    );
    return;
  }

  const svgContext = new C2S(sceneParams.width, sceneParams.height);

  // clear: false — свежий SVG-контекст и так пустой, незачем полагаться
  // на то, что clearRect одинаково реализован во всех svgcanvas-аналогах.
  renderOrbitField(svgContext, { ...sceneParams, clear: false });

  const svgMarkup = svgContext.getSerializedSvg(true);
  downloadTextFile(filename, svgMarkup, "image/svg+xml");
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}