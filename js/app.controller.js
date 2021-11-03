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
            onGetLoc(mapService.getMap());
        })
        .catch(() => console.log('Error: cannot init map'));
    onGetLocs();
}

function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    mapService.addMarker(pos);
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            // console.log('Locations:', locs)
            renderLocs(locs);
        })
}

function renderLocs(locs) {
    const strHTML = locs.map(loc => {
        console.log('render', loc);
        return `<li onclick="onPanTo(${loc.lat}, ${loc.lng})">
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

function onPanTo(lat, lng) {
    mapService.panTo(lat, lng);
}

function onSearch() {
    const locName = document.querySelector('.search-loc').value;
    mapService.searchLoc(locName);
}

function onGetLoc(map) {
    map.addListener("click", (mapsMouseEvent) => {
        const coords = mapsMouseEvent.latLng;
        const lat = coords.lat();
        const lng = coords.lng();
        onAddMarker({ lat, lng });
        onPanTo(lat, lng)
        mapService.getLocAddress(lat, lng)
        .then(locService.updateLocs)
        onGetLocs()
    });
}
