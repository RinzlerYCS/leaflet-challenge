let myMap = L.map("map").setView([45.52, -122.67], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


let baseURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


function markerSize(magnitude) {
    return magnitude * 4; 
}
function depthColor(depth) {
    return depth > 90  ? "#ff0000" : 
           depth > 50  ? "#ff7300" : 
           depth > 20  ? "#ffba00" : 
                        "#00ff00";  
}

d3.json(baseURL).then(function(response) {
    let earthquakes = response.features;

    earthquakes.forEach(eq => {
        let coords = eq.geometry.coordinates;
        let magnitude = eq.properties.mag;
        let depth = coords[2]; 
        let place = eq.properties.place;

        if (magnitude) {
            L.circleMarker([coords[1], coords[0]], {
                radius: markerSize(magnitude),
                fillColor: depthColor(depth),
                color: "#000",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.75
            }).bindPopup(`<strong>Location:</strong> ${place}<br>
                          <strong>Magnitude:</strong> ${magnitude}<br>
                          <strong>Depth:</strong> ${depth} km`)
              .addTo(myMap);
        }
    });
});



