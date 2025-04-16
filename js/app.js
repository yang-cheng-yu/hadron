import { initList } from "./modules/listProducts.js";
import { setupNav } from "./modules/nav.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    setupNav();

    const page = document.querySelector("[data-page]").dataset.page;
    if(page === "product-listing") {
        initList();
    }
}