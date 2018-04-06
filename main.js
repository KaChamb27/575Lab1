/* Getting the corn yield data into map form using leaflet, ajax, etc.*/

//Function to instantiate the leaflet map
function createMap(){
    //create map using variable
    var mymap = L.map('mapid').setView([39.000, -97.000], 4);
    
    // add base tilelayer from mapbox.com
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 5,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FjaGFtYjI3IiwiYSI6ImNqNmpibGQ4MDExa3kzMm81cm40Nno2MmcifQ.P2vpP3jBxEef_K51_3nRHg'
    }).addTo(mymap);
        
    //call getData function to get feature data
    createPropSymbols(mymap);
};

/* Turned off to test function for prop symbols. 
//Adding styled markers to points
var geojsonMarkerOptions = {
    radius: 10,
    fillColor: "#faf357",
    weight: 0,
    opacity: 1,
    fillOpacity: 0.8
}; */

/* Will come back to this...
// Function to add popups to each marker.
function onEachFeature(feature, layer) {
    var yearYield = "";
    if (feature.properties) {
        //loop to add year and yields to html string
        for (var year in feature.properties){
            yearYield += "<p>" + "yr2017" + ": " + feature.properties[yr2017] + "</p>";
        }
        layer.bindPopup(yearYield);
    }
}; */

//Proportional symbols, modified from Lesson 2, 1-2.
function createPropSymbols(geojsonFeature, mymap){
    //attribute to visualize
    var attribute = "yr2017";
    
    var geojsonMarkerOptions = {
        radius: 10,
        fillColor: "#faf357",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    //create a leaflet geojson layer and add to map.
    L.geoJson(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            //For each feature, determine value
            var attValue = Number(feature.properties[attribute]);
            //check value
            console.log(feature.properties, attValue);
            //create circle markers
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(mymap);
};
    /* To test function above.
// Function to retrieve the data and place on map.
function getData(mymap){
    //load the data
    //Adding markers to geojson features.
    L.geoJSON(geojsonFeature, {pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
        onEachFeature
    }}).addTo(mymap);
}; */



$(document).ready(createMap);

