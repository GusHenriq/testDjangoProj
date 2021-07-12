
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

// array to store the markers. Every new marker gets pushed to this array
const markers = [];

// places marker on the map when the form is submitted
placeMarkerForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const latValue = latitude.value;
    const longValue = longitude.value;
    console.log(latValue, longValue);

    // sets the proper id number to every new marker made
    let id = 0;
    if(markers.length < 1) {
        id = 0;
    }else {
        id = markers.length + 1;
    }

    const popupContent = '<p>' + e.latlng.toString() + '</p></br>' + 
        '<button onclick="clearMarker(' + id + ')">Clear Marker</button>';

    const marker = L.marker([latValue, longValue]).addTo(mymap);
    marker._id = id; // attaches the id to the marker
    marker.bindPopup(popupContent);
    markers.push(marker);
    mymap.panTo([latValue, longValue],0);
    latitude.value = '';
    longitude.value = '';
})

// handles the clearing of a marker when you clock the "clearMarker" poppup button
function clearMarker(id) {
    console.log(markers);
    let newMarkers = [];
    markers.forEach((marker) => {
        if (marker._id == id) {
            mymap.removeLayer(marker);
        }else {
            newMarkers.push(marker);
        }
    });
    markers = newMarkers;
}

function placeMarkerClick(e) {
    // sets the proper id number to every new marker made
    let id = 0;
    if(markers.length < 1) {
        id = 0;
    }else {
        id = markers.length + 1;
    }

    const popupContent = '<p>' + e.latlng.toString() + '</p></br>' + 
        '<button onclick="clearMarker(' + id + ')">Clear Marker</button>';

    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
    marker._id = id; // attaches the id to the marker
    marker.bindPopup(popupContent);
    markers.push(marker);
    mymap.panTo([e.latlng.lat, e.latlng.lng],0);
}

// handles being able to click on the map and place a marker
function onMapClick(e) {
    const confirmation = confirm("You clicked at " + e.latlng + ". Would you like to place a marker here?");
    if (confirmation == true){
        placeMarkerClick(e);
    }
    // const confirmation = confirm("You clicked at " + e.latlng + ". Would you like to place a circle here?");
    // if (confirmation == true){
    //     const circle = L.circle([e.latlng.lat, e.latlng.lng], {
    //         color: 'red', 
    //         fillColor: '#f03',
    //         fillOpacity: 0.5,
    //         radius: 12000
    //     }).addTo(mymap);
    //     circle.bindPopup(e.latlng.toString());
    // }
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
