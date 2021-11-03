import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.onRemoveLoc = onRemoveLoc;

function onInit() {
    mapService.initMap()
        .then(() => {
            onGetLoc(mapService.getMap());
        })
        .catch(() => console.log('Error: cannot init map'));
    onGetLocs();
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(pos) {
    mapService.addMarker(pos);
}

function onGetLocs() {
    locService.getLocs()
        .then(renderLocs)
}

function renderLocs() {

    const locs = locService.loadFromStorage('locationsDB');
    if (!locs) return;

    const strHTML = locs.map(loc => {
        onAddMarker({ lat: loc.lat, lng: loc.lng });
        return `<li onclick="onPanTo(${loc.lat}, ${loc.lng})">
        <div>
        <h5>${loc.name}</h5>
        <p>${loc.createdAt}</p>
        </div>
        <button onclick="onRemoveLoc(${loc.id})">X</button>
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
            .then(res => {
                return { loc: res.geometry.location, address: res.formatted_address }
            })
            .then(locService.updateLocs)
        onGetLocs();
    });
}

function onRemoveLoc(id) {
    console.log(id);
    locService.removeLoc(id)
    onGetLocs();
}
