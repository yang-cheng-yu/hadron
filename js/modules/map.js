import { fetchData } from "./fetch.js";

export function loadMap() {
    const map = L.map('map').setView([35.6895, 139.69171], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    loadLocations(map);
}

async function loadLocations(map) {
    const placesUri = "/data/places.json";
    const locations = await fetchData(placesUri);

    const categories = locations.categories;

    L.icon({
        iconUrl: '/assets/markers/hardware-company.png',
    
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    });

    locations.places.forEach(place => {
        const coordinates = place.point.coordinates;

        let category = categories.find(category => category.id === place.categoryId).name;
        let content = `<div class='place-name ${category}'>${place.name}</div><div>${place.description}</div><div>${coordinates.join(', ')}</div>`;

        addMarker(coordinates, content, map);
    });
}

function addMarker(coordinates, contentString, map) {
    const marker = L.marker(coordinates);
    marker.bindPopup(contentString);
    marker.addTo(map);
}