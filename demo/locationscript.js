document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-svg');

  generateButton.addEventListener('click', async () => {
      try {
          console.log("Attempting to get an SVG from the celestial canvas");

          const result = await Celestial.exportSVG();
          const svgText = typeof result === 'string' ? result : await blobToText(result);

          // Get editable text lines
          const [line1, line2, line3] = Array.from(
              document.querySelectorAll('.editable-line')
          ).map(el => el.innerText);

          // Define the white circular border and clip path
          const circleBorderAndClip = `
              <defs>
                  <clipPath id="celestial-clip">
                      <circle cx="250" cy="250" r="250" />
                  </clipPath>
              </defs>
              <circle cx="250" cy="250" r="252" stroke="white" stroke-width="4" fill="none" />`;

          // Update the celestial map to apply the clipping path
          const celestialMapSVG = svgText.replace(
              /<svg /,
              `<svg clip-path="url(#celestial-clip)" preserveAspectRatio="xMinYMin meet" `
          );

          // Construct the full SVG portrait with white rectangle border and formatted text
          const svgWrapper = `
              <svg xmlns="http://www.w3.org/2000/svg" width="500" height="700">
                  <!-- Background -->
                  <rect width="500" height="700" fill="#191970" />

                  <!-- White inset rectangular border -->
                  <rect x="10" y="10" width="480" height="680" 
                        stroke="white" stroke-width="4" fill="none" />

                  <!-- Circular border and clipping path -->
                  ${circleBorderAndClip}

                  <!-- Celestial map, positioned at top-left -->
                  <g transform="translate(0, 0)">
                      ${celestialMapSVG}
                  </g>

                  <!-- Embed the editable text -->
                  <foreignObject x="0" y="550" width="500" height="150">
                      <div xmlns="http://www.w3.org/1999/xhtml" 
                           style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                          <div class="editable-line" style="font-size: 24px; margin-bottom: 8px;">${line1}</div>
                          <div class="editable-line" style="font-size: 18px;">${line2}</div>
                          <div class="editable-line" style="font-size: 18px;">${line3}</div>
                      </div>
                  </foreignObject>
              </svg>`;

          const exportBlob = new Blob([svgWrapper], { type: 'image/svg+xml;charset=utf-8' });
          const exportUrl = URL.createObjectURL(exportBlob);

          // Trigger download
          const a = document.createElement('a');
          a.href = exportUrl;
          a.download = 'portrait-with-text.svg';
          a.click();

          // Clean up blob URL
          URL.revokeObjectURL(exportUrl);
      } catch (error) {
          console.error("Error generating SVG:", error);
      }
  });
});
