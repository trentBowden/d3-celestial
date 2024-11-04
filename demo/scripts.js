Celestial.display({
    background: { fill: "#000000", stroke: "#000000", opacity: 1, width: 4 },
    disableAnimations: false,
    // form: true,
    // formFields: { download: true },
    datapath: "../data/",
    stars: {
        show: true,    // Show stars
        limit: 6,      // Show only stars brighter than limit magnitude
        colors: true,  // Show stars in spectral colors, if not use "color"
        style: { fill: "#ffffff", opacity: 1 }, // Default style for stars
        names: false,  // Show star names (Bayer, Flamsteed, Variable star, Gliese, whichever applies first)
        proper: false, // Show proper name (if present)
        desig: false,  // Show all names, including Draper and Hipparcos
        namelimit: 2.5,  // Show only names for stars brighter than namelimit
        namestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif", align: "left", baseline: "top" },
        size: 4,       // Maximum size (radius) of star circle in pixels
        data: 'stars.6.json' // Data source for stellar data
        //data: 'stars.8.json' // Alternative deeper data source for stellar data
      },
    width: 140,
    height: 140,
    projection: 'orthographic',
    dsos: {     show: false },
    mw: { style: { fill: "#ffffff", opacity: "0.05" } },
    controls: false,
    interactive: false,
    constellations: {
        show: false,   // Show constellations
        names: false,   // Show constellation names
        desig: true,   // Show short constellation names (3 letter designations)
        namestyle: { fill:"#cccc99", font: "12px Helvetica, Arial, sans-serif", align: "center", baseline: "middle" },
        lines: true,   // Show constellation lines
        linestyle: { stroke: "#cccccc", width: 1, opacity: 0.6 },
        bounds: false,  // Show constellation boundaries
        boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
      },
      lines: {
        graticule: { show: false, stroke: "#cccccc", width: 0.6, opacity: 0.8 },    // Show graticule lines
        equatorial: { show: false, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },   // Show equatorial plane
        ecliptic: { show: false, stroke: "#66cc66", width: 1.3, opacity: 0.7 },     // Show ecliptic plane
        galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },     // Show galactic plane
        supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 } // Show supergalactic plane
      }
  });

// JavaScript code to handle interactions (if any)
document.getElementById('select-location').addEventListener('click', () => {
    const locationText = document.getElementById('locationText').value;
    const encodedAddress = encodeURIComponent(locationText);
    let locationLat, locationLon;

    console.log("Location text:", locationText);
    console.log("Encoded:", encodedAddress);
    
    fetch('https://nominatim.openstreetmap.org/search?q='+encodedAddress+'&format=json')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {

        console.log(data);
        const {lat, lon} = data[0];
        locationLat = lat;
        locationLon = lon;


    // const date = document.getElementById('date').value;
    // const message = document.getElementById('message').value;

    console.log('Location:', locationLat+','+locationLon);
    // console.log('Date:', date);
    // console.log('Message:', message);
    // console.log(Celestial.metrics());
    Celestial.skyview({"location": [locationLat, locationLon]});
    // Celestial.rotate({center:[locationLat, locationLon, 0]});

        } else {
            console.log("Data not found");
        }
    })
    .catch(error => console.error('Error:', error));



});

// var button = document.getElementById('btnDownload');
//   // Set the file name to your liking, e.g. add the displayed date/time
//   button.setAttribute('download', 'd3-celestial.png');
//   button.addEventListener('click', function (e) {

//     html2canvas(document.querySelector("#poster")).then(canvas => {
//         dataURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
//         button.href = dataURL;
//     });
//   });

var button = document.getElementById('btnDownload');
// Set the file name to your liking, e.g. add the displayed date/time
button.setAttribute('download', 'd3-celestial.png');
button.addEventListener('click', function (e) {
    var poster = document.querySelector("#poster");
    
    // Desired width and height
    var desiredWidth = 1000;
    var desiredHeight = 1500;

    // Calculate aspect ratio based on the current size
    var aspectRatio = poster.offsetWidth / poster.offsetHeight;

    // Adjust the height to maintain aspect ratio, if needed
    if (aspectRatio > 1) {
        desiredHeight = desiredWidth / aspectRatio;
    } else {
        desiredWidth = desiredHeight * aspectRatio;
    }

    html2canvas(poster, {
        width: desiredWidth,
        height: desiredHeight,
        scale: desiredWidth / poster.offsetWidth // Scale to fit the desired size
    }).then(canvas => {
        var dataURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        button.href = dataURL;
    });
});



