import { initList } from "./modules/listProducts.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    const page = document.querySelector("[data-page]").dataset.page;
    if(page === "product-listing") {
        initList();
    }
}