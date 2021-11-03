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

function updateLocs(name, location) {
    console.log(location);
    const loc = {
        id: locs.length,
        name,
        lat: location.lat, 
        lng: location.lng, 
        weather: 22, 
        createdAt: Date.now(), 
        updatedAt: Date.now() 
    }
    locs.push(loc)
    console.log(loc);
}

