
// these querySelectors grab the html elements that I need so I can manipulate them later
const placeMarkerForm = document.querySelector('#placeMarkerForm'); // the html form 
const latitude = document.querySelector('#lat'); // html lat textbox
const longitude = document.querySelector('#long'); // html long textbox
const latReader = document.querySelector('#latReader');
const longReader = document.querySelector('#longReader');

// init the actual map. Set to center on DC
const mymap = L.map('mapid').setView([38.881, -77.091], 10); 

L.tileLayer('/static/mapImages/{z}/{x}/{y}.png', { // this line here is very important. Redirects --
    // leaflet to get images from mapImages instead of the web
    maxZoom: 9, // default zoom can only be 10 because thats the max that I downloaded. The more --
    // zoom that you want, the more tiles you need to download. It grows exponentially
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

// places marker on the map when the form is submitted
placeMarkerForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const latValue = latitude.value;
    const longValue = longitude.value;
    console.log(latValue, longValue);

    const marker = L.marker([latValue, longValue]).addTo(mymap);
    marker.bindPopup(e.latlng.toString());
    mymap.panTo([latValue, longValue],0);
    latitude.value = '';
    longitude.value = '';
});

// handles being able to click on the map and place a marker
function onMapClick(e) {
    const confirmation = confirm("You clicked at " + e.latlng + ". Would you like to place a marker here?");
    if (confirmation == true){
        const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
        marker.bindPopup(e.latlng.toString());
    }
}

// gives the current coords when hovering over the map 
function onMapHover(e) {
    latReader.innerHTML = 'Current Lat: ' + e.latlng.lat;
    longReader.innerHTML = 'Current Long: ' + e.latlng.lng;
}

// resets the coords when you leave the map so the last known coords dont stay there
function onMapLeave(e) {
    latReader.innerHTML = 'Current Lat:';
    longReader.innerHTML = 'Current Long:';
}

// event handlers 
mymap.on('click', onMapClick);
mymap.on('mousemove' , onMapHover);
mymap.on('mouseout', onMapLeave);
