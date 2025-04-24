function initApp() {
    fetchShows()
}

export async function fetchShows(){
    console.log("Fetching Shows...");
    let uri = "https://api.jikan.moe/v4/anime";

    const data = await fetchData(uri);
    console.log(data);
    parseShows(data.data);
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