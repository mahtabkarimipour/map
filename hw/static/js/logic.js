var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//var recordCount = 1000;
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

d3.json(url, function(response) {

  console.log(response);
  
  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;

    if (location) {
      L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    }
  
  var magnitude = response.features[i].properties.mag;

  
  function getColor(a) {
    return a > 79 ? '#a50f15':
           a > 59 ? '#de2d26' :
           a > 39  ? '#fb6a4A' :
           a > 19 ? '#fcae91' :
           '#fee5d9';
    }

function getStyle(feature) {
        return {
            fillColor: getColor(magnitude),
            color: getColor(magnitude),
            weight: 1,
            opacity: 0.4,
            fillOpacity: 0.7
        };
    }
  // L.circle(location, {
  //   fillOpacity: 0.75,
  //   color: "white",
  //   fillColor: color,

  //   radius: magnitude * 1500
  // }).bindPopup("<h1>" + response.features[i].properties.place + "</h1> <hr> <h3>Points: " + magnitude + "</h3>").addTo(myMap);
}
});