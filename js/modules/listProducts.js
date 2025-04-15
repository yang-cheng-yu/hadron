import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";

document.addEventListener("DOMContentLoaded", initList);

function initList() {
    fullList();
}

async function fullList() {
    const data = await fetchData("/json/products.json");

    parseList(data, 0);
}

// Views:
// tens
// 00 = grid
// 10 = compactGrid
// 20 = list
// units
// 00 = hideDesc
// 01 = showDesc

function parseList(list, style) {
    const parent = document.getElementById("products-list");
    parent.innerHTML = '';
    parent.className = '';

    if(style >= 30) {
        throw new Error("Something went wrong...");
    } else if(style >= 20) {
        parent.classList.add("list-view");
    } else if(style >= 10) {
        parent.classList.add("compact-grid-view");
    } else if(style >= 0) {
        parent.classList.add("grid-view");
    } else {
        throw new Error("Something went wrong...");
    }

    list.forEach(product => {
        const element = appendNewElement("div", "", parent);
        element.classList.add("list-item");
        
        const img = appendNewElement("img", "", element);
        img.src = "/images/appicons/" + product.image;

        appendNewElement("div", product.title, element);
        if(style % 10 == 1) {
            appendNewElement("div", product.description, element)
        }
    });
}
