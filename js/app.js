import { initList } from "./modules/listProducts.js";
import { setupNav } from "./modules/nav.js";
import { fetchShows } from "./modules/dataRendering.js";
import { initMostPopular } from "./modules/listMostPopular.js";
import { loadProducts } from "./modules/productLoad.js";
import { loadMap } from "./modules/map.js";
import { createAccount } from "./modules/createAccount.js";
import { login } from "./modules/login.js";

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    setupNav();
    const currentUser = localStorage.getItem('currentUser');
    const cart = document.getElementById("cart");
    if (!currentUser){
        cart.href = "";
    }
    else{
        cart.href = "/pages/cart.html";
    }

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
    if(page === "map") {
        loadMap();
    }
    if(page === "sign-up") {
        const signUp = document.getElementById("form-sign-up");
        signUp.addEventListener("submit", createAccount);
    }
    if(page === "sign-in") {
        const signIn = document.getElementById("form-sign-in");
        signIn.addEventListener("submit", login);
    }
}