import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";
import { sleep } from "./login.js";


/**
 * Initializes the most popular apps 
 * section by loading and displaying data
 * 
 * @export
 */
export function initMostPopular() {
    updateList();
}

/**
 * Fetches product data from a JSON file 
 * and passes it to the parser for display
 * 
 * @async
 */
async function updateList() {
    const data = await fetchData("./../data/products.json");

    parseList(data.products);
}

/**
 * Displays a rotating list of the most popular
 * products sorted by number of copies sold.
 * Continuously updates the DOM every 4 seconds.
 * 
 * @async
 * @param {Array<Object>} list - An array of product objects to display
 */
async function parseList(list) {
    const parent = document.getElementById("popular-apps");
    parent.innerHTML = '';

    list.sort((a, b) => b.copiesSold - a.copiesSold);

    let currentIndex = 0;
    let amount = 6;

    while (true) {

        parent.innerHTML = '';
        for (let i = 0; i < amount; i++) {
            let product = list[(currentIndex + i) % list.length];

            const element = appendNewElement("div", "", parent);
            element.classList.add("app");
            element.addEventListener('click', () => {
                window.location.href = "./../pages/product.html"
                sessionStorage.setItem("selectedProductId", product.id);
            });
                
            const img = appendNewElement("img", "", element);
            img.src = "./../assets/images/appicons/" + product.image;
            img.alt = product.title;
        }

        await sleep(4000);
        currentIndex = (currentIndex + amount) % list.length;
    }
}
