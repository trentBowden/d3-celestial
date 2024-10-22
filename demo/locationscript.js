
let blob;

document.addEventListener('DOMContentLoaded', function () {
// // Create a blob from the SVG string
// const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
document.getElementById('generate-svg').addEventListener('click', async () => {
    console.log("Attempting to get an SVG from the celestial canvas");
    // Where there is no filename, will return a promise
    await Celestial.exportSVG().then((blobVal) => {
        blob = blobVal
        
        if (blob != null) {

            const url = URL.createObjectURL(blob);
            imgElement.src = url;
        } else {
            console.log("Blob not defined..")
        }
    }).catch((err) => {
        console.log("Error getting SVG:", err);
    }).finally(() => {
        console.log("LocationScript Theoretically Done getting SVG");
    });
        
        
    
});
const imgElement = document.getElementById('portrait-svg');
imgElement.onload = () => URL.revokeObjectURL(url);

// Clean up blob URL after image has loaded
document.getElementById('load-map').addEventListener('click', () => {
  const text = document.getElementById('editable-text').innerText;
  
  // Include the raw SVG data directly in the exported file
  const svgData = blob ?? `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>`;

  // Construct the full SVG export including the text and the raw SVG content
  const svgWrapper = `
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <!-- Inject the raw SVG data here -->
    ${svgData}
    <!-- Embed the editable text -->
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="position: relative; width: 100%; height: 100%;">
        <div style="position: absolute; bottom: 0; width: 100%; text-align: center; background: rgba(255, 255, 255, 0.5);">
          ${text}
        </div>
      </div>
    </foreignObject>
  </svg>`;

  // Create a new blob from the updated SVG content
  const exportBlob = new Blob([svgWrapper], { type: 'image/svg+xml;charset=utf-8' });
  const exportUrl = URL.createObjectURL(exportBlob);

  // Trigger download
  const a = document.createElement('a');
  a.href = exportUrl;
  a.download = 'portrait-with-text.svg';
  a.click();

  // Clean up blob URL
  URL.revokeObjectURL(exportUrl);
});
});
