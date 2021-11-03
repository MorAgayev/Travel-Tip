export const locService = {
    getLocs
}


const locs = [
    { id: 0, name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 22, createdAt: Date.now(), updatedAt: Date.now() },
    { id: 1, name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 30, createdAt: Date.now(), updatedAt: Date.now() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


