export function useGeolocation() {
   
    const getLocation = () => {
        return new Promise((resolve, reject) =>{

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                resolve(pos)
            },
            (err) => {
                reject(err.message)
            })})
    };

    return { getLocation }
}