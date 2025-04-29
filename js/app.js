import { initList } from "./modules/listProducts.js";
import { setupNav } from "./modules/nav.js";
import { fetchShows } from "./modules/dataRendering.js";
import { initMostPopular } from "./modules/listMostPopular.js";
import { loadProducts } from "./modules/productLoad.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    setupNav();

    const page = document.querySelector("[data-page]").dataset.page;
    if(page === "index") {
        initMostPopular();
    }
    if(page === "product-listing") {
        initList();
        document.getElementById("products").classList.add("selected");
    }
    if(page === "about") {
        document.getElementById("about").classList.add("selected");
    }
    if(page === "contact") {
        document.getElementById("contact").classList.add("selected");
    }
    if(page === "dataRendering"){
        fetchShows();
    }
    if(page === "product") {
        loadProducts();
    }
}