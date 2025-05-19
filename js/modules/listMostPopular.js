import { fetchData } from "./fetch.js";
import { appendNewElement } from "./util.js";
import { sleep } from "./login.js";

export function initMostPopular() {
    updateList();
}

async function updateList() {
    const data = await fetchData("/data/products.json");

    parseList(data.products);
}

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
                window.location.href = "/pages/product.html"
                sessionStorage.setItem("selectedProductId", product.id);
            });
                
            const img = appendNewElement("img", "", element);
            img.src = "/assets/images/appicons/" + product.image;
            img.alt = product.title;
        }

        await sleep(4000);
        currentIndex = (currentIndex + amount) % list.length;
    }
}
