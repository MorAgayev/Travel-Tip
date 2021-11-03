import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;

function onInit() {
    mapService.initMap()
        .then(() => {
            // console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    onGetLocs();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            renderLocs(locs);
        })
}

function renderLocs(locs) {
    const strHTML = locs.map(loc => {
        return `<li>
                   <h5>${loc.name}</h5>
                   <p>${loc.createdAt}</p>
               </li>`;
    })
    document.querySelector('.locs').innerHTML = strHTML.join('');
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    //getLocs(id)
    // .then(location => {len , lng} = location)
    // .then(mapService.panTo)
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSearch() {
    const locName = document.querySelector('.search-loc').value;
    mapService.searchLoc(locName);
}

//lat lng = data.results[0].geometry.location
