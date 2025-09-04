
mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v9',
zoom: 9,
center: [77.1025, 28.7041] //starting from [lng, lat]
});
