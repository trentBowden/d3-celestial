document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-svg');
  const loadMapButton = document.getElementById('load-map');

  generateButton.addEventListener('click', async () => {
    try {
      console.log("Attempting to get an SVG from the celestial canvas");

      const result = await Celestial.exportSVG();
      const svgText = typeof result === 'string' ? result : await blobToText(result);

      const editableText = document.getElementById('editable-text').innerText;

      // Define a circular clipping path
      const clipPath = `
      <defs>
        <clipPath id="celestial-clip">
          <circle cx="250" cy="250" r="250" />
        </clipPath>
      </defs>`;

      // Inject the celestial map into a group with the clipping path applied
      const celestialMapSVG = svgText.replace(
        /<svg /,
        `<svg clip-path="url(#celestial-clip)" preserveAspectRatio="xMinYMin meet" `
      );

      // Construct the full SVG portrait
      const svgWrapper = `
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="700">
        <!-- Background -->
        <rect width="500" height="700" fill="blue" />

        <!-- Define the clipping path for the celestial map -->
        ${clipPath}

        <!-- Inject celestial map at top-left, with clipping applied -->
        <g transform="translate(0, 0)">
          ${celestialMapSVG}
        </g>

        <!-- Embed editable text at the bottom -->
        <foreignObject x="0" y="550" width="500" height="150">
          <div xmlns="http://www.w3.org/1999/xhtml" 
            style="width: 100%; text-align: center; background: rgba(255, 255, 255, 0.5); color: white;">
            <h3>${editableText}</h3>
          </div>
        </foreignObject>
      </svg>`;

      const exportBlob = new Blob([svgWrapper], { type: 'image/svg+xml;charset=utf-8' });
      const exportUrl = URL.createObjectURL(exportBlob);

      const a = document.createElement('a');
      a.href = exportUrl;
      a.download = 'portrait-with-text.svg';
      a.click();

      URL.revokeObjectURL(exportUrl);
    } catch (error) {
      console.error("Error generating SVG:", error);
    }
  });

  function blobToText(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  loadMapButton.addEventListener('click', () => {
    console.log("Map loaded (for testing purposes).");
  });
});
