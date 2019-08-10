figma.showUI(__html__, { width: 400, height: 430 });

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      }
    : { r: 0, g: 0, b: 0 };
}

figma.ui.onmessage = msg => {
  if (msg.type === 'import-humaaan') {
    const humaaanSvg = msg.humaaan;
    const humaaanNode = figma.createNodeFromSvg(humaaanSvg);
    figma.currentPage.appendChild(humaaanNode);
    figma.viewport.scrollAndZoomIntoView([humaaanNode]);
  }
};
