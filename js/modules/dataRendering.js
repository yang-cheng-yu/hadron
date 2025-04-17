function initApp() {
    fetchShows()
}

export async function fetchShows(){
    console.log("Fetching Shows...");
    let uri = "https://api.jikan.moe/v4/anime";

    const data = await fetchData(uri);
    console.log(data);
    parseShows(data);
}

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

function parseShows(shows) {
    const table = document.getElementById("table-shows");
    table.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        const newRow = document.getElementById("tr");
        const rowContent = []

        for(i = 0; i < 9; i++) {
            rowContent[0].textContent = shows.id;
            rowContent[1].textContent = show.name;
            rowContent[2].textContent = show.type;
            rowContent[3].textContent = show.language;
            rowContent[4].textContent = show.genres.join(" ");
            rowContent[5].textContent = show.source;
            rowContent[6].textContent = show.status;
            rowContent[7].textContent = show.aired;
            rowContent[8].textContent = show.score;
            rowContent[9].textContent = show.rank;
            const image = document.createElement("img");
            image.setAttribute("src", show.image.medium);
            rowContent[8].appendChild(image);

            table.appendChild(newRow);
        }
    };
}