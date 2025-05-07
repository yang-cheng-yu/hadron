import { fetchData } from "./fetch.js";
import { appendNewElement, arrayEquals } from "./util.js";

const markers = [];

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

    const list = document.getElementById("place-list");

    locations.places.forEach(place => {
        // Marker
        const coordinates = place.point.coordinates;

        let category = categories.find(category => category.id === place.categoryId).name;
        let content = `<div class='place-name ${category}'>${place.name}</div>
                        <div>${place.description}</div>
                        <div>${coordinates.join(', ')}</div>`;

        addMarker(coordinates, content, map, category);

        // List item
        const item = appendNewElement("div", "", list);
        item.classList.add("place");
        item.addEventListener("click", () => {
            map.setView(coordinates, 13);
            const marker = findMarker(coordinates);
            console.log(marker);
            marker.openPopup();
        });

        const imageHolder = appendNewElement("div", "", item);
        imageHolder.classList.add("place-image");
        const image = appendNewElement("img", "", imageHolder);
        image.src = place.img;

        const textHolder = appendNewElement("div", "", item);
        textHolder.classList.add("place-text");
        const title = appendNewElement("div", place.name, textHolder);
        title.classList.add("place-title");
        const desc = appendNewElement("div", place.description, textHolder);
        desc.classList.add("place-desc");
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
    
    markers.push(marker);
}

function findMarker(coordinates) {

    for (const marker of markers) {
        const markerCoords = marker.getLatLng();
        console.log(coordinates.equals([markerCoords.lat, markerCoords.lng]));
        
        if (coordinates.equals([markerCoords.lat, markerCoords.lng])) {
            console.log(marker);
            return marker;
        }
    }

    console.log(nothing);
    return null;
}