
export const locService = {
    getLocs,
    updateLocs,
    removeLoc,
    loadFromStorage
}

const locs = [];
var gId = 0;

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function updateLocs(locationProp) {
    const loc = {
        id: gId++,
        name: locationProp.address,
        lat: locationProp.loc.lat,
        lng: locationProp.loc.lng,
        weather: 22,
        createdAt: _getFormattedTime(Date.now()),
        updatedAt: _getFormattedTime(Date.now())
    }
    locs.push(loc);
    saveToStorage('locationsDB', locs)
}

function removeLoc(id) {
    const idx = locs.findIndex(loc => loc.id === id);
    locs.splice(idx, 1);
    saveToStorage('locationsDB', locs);
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}

function _getFormattedTime(ts) {
    var d = new Date(ts);
    var dateStr = `${d.getDate()}.${(d.getMonth() + 1)}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return dateStr;
}