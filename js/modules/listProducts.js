import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";

/**
 * Description placeholder
 *
 * @type {0}
 */
const VIEW_GRID = 0;
/**
 * Description placeholder
 *
 * @type {1}
 */
const VIEW_CONPACT_GRID = 1;
/**
 * Description placeholder
 *
 * @type {2}
 */
const VIEW_LIST = 2;

/**
 * Description placeholder
 *
 * @type {0}
 */
const DESC_HIDE = 0;
/**
 * Description placeholder
 *
 * @type {1}
 */
const DESC_SHOW = 1;

/**
 * Description placeholder
 *
 * @type {number}
 */
let style = 0;


/**
 * Starts the product list.
 * Adds event listeners to view 
 * and description toggle buttons
 * 
 * @export
 */
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

/**
 * Updates the style based on selected view or description mode.
 * 
 * @param {number} view - New view mode index
 * @param {number} desc - New description toggle index
 */
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

/**
 * Highlights the selected button 
 * and removes highlighting from others
 * 
 * @param {HTMLElement} button - The clicked button
 * @param {NodeListOf<HTMLElement>} set - The group of buttons to reset
 */
function updateButtons(button, set) {
    set.forEach(btn => {
        btn.classList.remove("btn-selected");
    });

    button.classList.add("btn-selected");
}

/**
 * Fetches the product data and 
 * renders it
 * 
 * @async
 */
async function updateList() {
    const data = await fetchData("/data/products.json");

    parseList(data.products, style);
}

/**
 * Parses and renders the list of products 
 * into the DOM
 * 
 * @param {Array<Object>} list - Array of product to render
 * @param {number} style - style value
 */
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
            sessionStorage.setItem("selectedProductId", product.id);
            window.location.href = "product.html";
        });
        
        const img = appendNewElement("img", "", element);
        img.src = "/assets/images/appicons/" + product.image;
        img.alt = product.title;

        appendNewElement("div", product.title, element).classList.add("item-title");
        if(style % 10 == 1) {
            console.log("Has description");
            const descLine1 = appendNewElement("div", `${product.description}\r\n${product.categories.join(" ")}\r\nPublisher: ${product.company}`, element);
            const descLine2 = appendNewElement("div", `$${product.price}\r\n${product.copiesSold} copies sold`, element);
            descLine1.classList.add("item-desc");
            descLine2.classList.add("item-desc", "line-two");
            descLine1.setAttribute('style', 'white-space: pre-line;');
            descLine2.setAttribute('style', 'white-space: pre-line;');
        }
    });
}