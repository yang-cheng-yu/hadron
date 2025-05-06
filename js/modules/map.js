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

    locations.places.forEach(place => {
        const coordinates = place.point.coordinates;

        let category = categories.find(category => category.id === place.categoryId).name;
        let content = `<div class='place-name ${category}'>${place.name}</div><div>${place.description}</div><div>${coordinates.join(', ')}</div>`;

        addMarker(coordinates, content, map, category);
    });
}

function getCustomIcon(category) {
    var customIcon = L.Icon.extend({
        options: {
            iconSize:     [40, 50],
            iconAnchor:   [20, 50],
            popupAnchor:  [0, -50]
        }
    });
    return new customIcon({iconUrl: `/assets/markers/${category}.png`});
}

function addMarker(coordinates, contentString, map, category) {
    const marker = L.marker(coordinates, {icon: getCustomIcon(category)});
    marker.bindPopup(contentString);
    marker.addTo(map);
}