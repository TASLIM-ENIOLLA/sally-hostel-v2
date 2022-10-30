let map = new flightmap.Map({
    container: 'map',
    style: 'style-dark.json',
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 16,
    accessToken: '2faa7ee0-cd07-11eb-9f76-576fcdb6d845'
});

new flightmap
.Marker({
    draggable: false
})
.setLngLat([position.coords.longitude, position.coords.latitude])
.addTo(map);

new flightmap
.Marker({
    draggable: false
})
.setLngLat([destination_coords[0], destination_coords[1]])
.addTo(map);
