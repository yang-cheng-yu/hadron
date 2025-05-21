import { fetchData } from "./fetch.js";
import { appendNewElement, arrayEquals } from "./util.js";

/**
 * Description placeholder
 *
 * @type {{}}
 */
const markers = [];

/**
 * Initializes and renders the Leaflet map on the page.
 * Loads OpenStreetMap tiles and place markers with popup info.
 * 
 * @export
 */
export function loadMap() {
    const map = L.map('map').setView([35.6895, 139.69171], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    loadLocations(map);
}

/**
 * Loads place data from a JSON file and 
 * adds them as markers and list items
 * 
 * @async
 * @param {L.Map} map - The Leaflet map instance to add markers to
 * @returns {Promise<void>}
 */
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
        title.classList.add("place-title", category);
        const desc = appendNewElement("div", place.description, textHolder);
        desc.classList.add("place-desc");
    });
}

/**
 * Creates a custom Leaflet icon using the given category.
 * Icon file should match category name
 * 
 * @param {string} category - The category name for icon
 */
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

/**
 * Adds a marker to the map with a popup 
 * and stores it in the markers array.
 * 
 * @param {number[]} coordinates - coordinates for the marker
 * @param {string} contentString - HTML content for the marker's popup
 * @param {L.Map} map - Leaflet map instance
 * @param {string} category - The category used to determine the marker icon
 */
function addMarker(coordinates, contentString, map, category) {
    const marker = L.marker(coordinates, {icon: getCustomIcon(category)});
    marker.bindPopup(contentString);
    marker.addTo(map);

    markers.push(marker);
}

/**
 * Finds a marker in the markers
 * array that matches the given coordinates.
 * 
 * @param {number[]} coordinates - coordinates of the target marker
 * @returns {L.Marker|null} The matching marker, or null if not found
 */
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