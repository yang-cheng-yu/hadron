
/**
 * Global variable for holding already fetched list
 */
let shows;

/**
 * Global variable for holding already fetched list
 */
let characters;

/**
 * Global variable for holding already fetched list
 */
let amiibo;

import { appendNewElement } from "./util.js";

/**
 * Function that loads data page
 * by attaching event listeners to buttons and
 * displaying selection UI
 * 
 * @export
 */
export function loadDataPage() {
    loadButtons();
    showElementGroup("selection");
}


/**
 * Attaches click event listeners to buttons.
 * Handles the logic for showing the correct UI 
 * group and fetching data when needed.
 */
function loadButtons() {
    const back = document.getElementById("btn-back");

    const anime = document.getElementById("btn-anime");
    const schale = document.getElementById("btn-schale");
    const amiibo = document.getElementById("btn-amiibo");

    const schools = document.querySelectorAll('.schale button');

    back.addEventListener('click', () => {
        const parent = document.querySelector(".show").dataset.parent;
        if (parent)
            showElementGroup(parent);
    });

    anime.addEventListener('click', () => {
        showElementGroup("anime");
        fetchShows();
    });
    schale.addEventListener('click', () => {
        showElementGroup("schale");
    });
    amiibo.addEventListener('click', () => {
        showElementGroup("amiibo");
        fetchAmiibo();
    });

    schools.forEach(school => {
        school.addEventListener('click', (event) => {
            showElementGroup("characters");
            fetchSchale();
        })
    })
}

/**
 * Displays a specific UI group and hides
 * others
 * 
 * @param {string} group - The class name of the group to display
 */
function showElementGroup(group) {
    const elementGroup = document.querySelector(`.${group}`);
    if (!elementGroup) {
        console.log("group not found");
        return;
    }

    const fadingElements = document.querySelectorAll(".fading-element");

    fadingElements.forEach(element => {
        element.classList.remove('show');
    })
    elementGroup.classList.add('show');
}


/**
 * Fetches anime show data from the 
 * API and calls the parser.
 * 
 * @async
 */
async function fetchShows(){
    if (!shows) {
        console.log("Fetching Shows...");
        let uri = "https://api.jikan.moe/v4/anime";

        shows = await fetchData(uri);
        shows = shows.data;
        console.log(shows);
    }
    parseShows();
}


/**
 * Fetches JSON data from the provided URI with error handling.
 * 
 * @async
 * @param {string} resourceUri - The URL to fetch data from
 */
async function fetchData(resourceUri){
    try {
        const response = await fetch(resourceUri);

        if(!response.ok) {
            throw new Error(`Network Error: failed to fetch data\nError code: ${response.status}`)            
        }

        const data = await response.json();

        return data;
    } catch (error){
        console.log(error);
    }
}


/**
 * Populates table with anime show data.
 * 
 * @param {Array<Object>} shows - An array of anime show objects to display in the table
 */
function parseShows() {
    const table = document.getElementById("table-shows");
    table.innerHTML = "";

    shows.forEach(show => {
        const newRow = document.createElement("tr");
        const rowContent = []

            for(let i = 0; i < 12; i++) {   
                rowContent.push(document.createElement("td"));
                newRow.appendChild(rowContent[i]);
            }
            rowContent[0].textContent = show.mal_id;
            rowContent[1].textContent = show.title;
            rowContent[2].textContent = show.type;
            rowContent[3].textContent = show.episodes;
            rowContent[4].textContent = show.genres.length ? show.genres[0].name : "";
            rowContent[5].textContent = show.source;
            rowContent[6].textContent = show.status;
            rowContent[7].textContent = show.aired.length ? show.aired[0].name : "";
            rowContent[8].textContent = show.score;
            rowContent[9].textContent = show.rank;

            const image = document.createElement("img");
            image.setAttribute("src", show.images.jpg.image_url);
            rowContent[10].appendChild(image);

            table.appendChild(newRow);
    });
}

/**
 * Fetch Blue Archive data (does not work)
 *
 * @async
 * @returns {*} 
 */
async function fetchSchale(){

    console.log("Fetching Schale...");
    let uri = `https://api-blue-archive.vercel.app/api/characters?school=${kebabToEncoded(school)}`;

    characters = await fetchData(uri);
    console.log(characters);
    parseCharacters();
}

function parseCharacters() {

}

/**
 * Fetch Amiibo data
 */
async function fetchAmiibo(){
    console.log("Fetching Schale...");
    let uri = `https://www.amiiboapi.com/api/amiibo/`;

    amiibo = await fetchData(uri);
    amiibo = amiibo.amiibo;
    console.log(amiibo);
    parseAmiibo();
}

/**
 * Parse Amiibo data (card form)
 */
function parseAmiibo() {
    const parent = document.getElementById('amiibo');

    parent.innerHTML = '';

    amiibo.forEach(card => {
        const wrapper = appendNewElement('div', '', parent);
        wrapper.classList.add('card');

        const imgWrapper = appendNewElement('div', '', wrapper);
        imgWrapper.classList.add('amiibo-img');

        const image = appendNewElement('img', '', imgWrapper);
        image.src = card.image;

        const name = appendNewElement('div', card.name, wrapper);
        name.classList.add('amiibo-name');
        const game = appendNewElement('div', card.gameSeries, wrapper);
        game.classList.add('amiibo-game');
    })
}

/**
 * Converts kebab-case string into encoded Title Case format
 * @param {string} string in kebab-case
 * @returns string in encoded Title Case format
 */
function kebabToEncoded(string) {
    return string
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('%20');
}
