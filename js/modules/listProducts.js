import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";

const VIEW_GRID = 0;
const VIEW_CONPACT_GRID = 1;
const VIEW_LIST = 2;

const DESC_HIDE = 0;
const DESC_SHOW = 1;

let style = 0;

export function initList() {
    updateList();
    
    const viewSet = document.querySelectorAll("#view-set button");
    const descSet = document.querySelectorAll("#desc-set button");
    
    viewSet.forEach((button, index) => {
        button.addEventListener("click", () => {
            changeDisplay(index, -1);
            updateButtons(button, viewSet);
        });
        console.log("Button loaded: " + index);
    })

    descSet.forEach((button, index) => {
        button.addEventListener("click", () => {
            changeDisplay(-1, index);
            updateButtons(button, descSet);
        });
        console.log("Button loaded: " + index);
    })
}

function changeDisplay(view, desc) {   
    if(view >= 0 && view <= 2) {
        let currentDesc = style % 10;
        style = view * 10 + currentDesc;
    }

    if(desc >= 0 && desc <= 1) {
        style = Math.floor(style / 10) * 10 + desc;
    }

    console.log("View: " + view);
    console.log("Desc: " + desc);
    console.log("Display changed to: " + style);

    updateList();
}

function updateButtons(button, set) {
    set.forEach(btn => {
        btn.classList.remove("btn-selected");
    });

    button.classList.add("btn-selected");
}

async function updateList() {
    const data = await fetchData("/data/products.json");

    parseList(data.products, style);
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
        console.log("Now in list-view");
    } else if(style >= 10) {
        parent.classList.add("compact-grid-view");
        console.log("Now in compact-grid-view");
    } else if(style >= 0) {
        parent.classList.add("grid-view");
        console.log("Now in grid-view");
    } else {
        throw new Error("Something went wrong...");
    }

    list.forEach(product => {
        const element = appendNewElement("div", "", parent);
        element.classList.add("list-item");
        element.addEventListener('click', () => {
            window.location.href = "product.html"
        });
        
        const img = appendNewElement("img", "", element);
        img.src = "/images/appicons/" + product.image;
        img.alt = product.title;

        appendNewElement("div", product.title, element).classList.add("item-title");
        if(style % 10 == 1) {
            console.log("Has description");
            const desc = appendNewElement("div", `${product.description}\r\n${product.categories.join(" ")}\r\nPublisher: ${product.company}\r\n$${product.price}`, element);
            desc.classList.add("item-desc");
            desc.setAttribute('style', 'white-space: pre-line;');
        }
    });
}