import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";

export function initMostPopular() {
    updateList();
}

async function updateList() {
    const data = await fetchData("/data/products.json");

    parseList(data.products);
}

function parseList(list) {
    const parent = document.getElementById("popular-apps");
    parent.innerHTML = '';

    list.sort((a, b) => a.copiesSold - b.copiesSold)

    for (let i = 0; i < 6; i++) {
        let product = list[i];

        const element = appendNewElement("div", "", parent);
        element.classList.add("app");
        element.addEventListener('click', () => {
            window.location.href = "/pages/product.html"
        });
        
        const img = appendNewElement("img", "", element);
        img.src = "/assets/images/appicons/" + product.image;
        img.alt = product.title;
    };
}
