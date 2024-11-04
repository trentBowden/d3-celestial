document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-svg');

  generateButton.addEventListener('click', async () => {
    try {
      console.log("Generating SVG from celestial map...");

      const result = await Celestial.exportSVG();
      const svgText = typeof result === 'string' ? result : await blobToText(result);

      const [line1, line2, line3] = Array.from(
        document.querySelectorAll('.editable-line')
      ).map(el => el.innerText);

      const circleBorderAndClip = `
        <defs>
          <clipPath id="celestial-clip">
            <circle cx="250" cy="250" r="250" />
          </clipPath>
        </defs>
        <circle cx="250" cy="250" r="252" stroke="white" stroke-width="4" fill="none" />`;

      const celestialMapSVG = svgText.replace(
        /<svg /,
        `<svg clip-path="url(#celestial-clip)" preserveAspectRatio="xMinYMin meet" `
      );

      const svgWrapper = `
        <svg xmlns="http://www.w3.org/2000/svg" width="700" height="900">
          <rect width="700" height="900" fill="#0d1b2a" />
          <rect x="10" y="10" width="680" height="880" 
                stroke="white" stroke-width="6" fill="none" />
          ${circleBorderAndClip}
          <g transform="translate(80, 100)">
            ${celestialMapSVG}
          </g>
          <foreignObject x="0" y="700" width="700" height="200">
            <div xmlns="http://www.w3.org/1999/xhtml" 
                 style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: white;">
              <div style="font-size: 28px; margin-bottom: 8px;">${line1}</div>
              <div style="font-size: 18px;">${line2}</div>
              <div style="font-size: 18px;">${line3}</div>
            </div>
          </foreignObject>
        </svg>`;

      const exportBlob = new Blob([svgWrapper], { type: 'image/svg+xml;charset=utf-8' });
      const exportUrl = URL.createObjectURL(exportBlob);

      const a = document.createElement('a');
      a.href = exportUrl;
      a.download = 'starmap-portrait.svg';
      a.click();

      URL.revokeObjectURL(exportUrl);
    } catch (error) {
      console.error("Error generating SVG:", error);
    }
  });
});
