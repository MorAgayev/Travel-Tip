export const locService = {
    getLocs,
    updateLocs
}

const locs = [];

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function updateLocs(locationProp) {
    const loc = {
        id: locs.length,
        name: locationProp.address,
        lat: locationProp.loc.lat,
        lng: locationProp.loc.lng,
        weather: 22,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    locs.push(loc)
}

