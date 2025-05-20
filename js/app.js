import { initList } from "./modules/listProducts.js";
import { setupNav } from "./modules/nav.js";
import { loadDataPage } from "./modules/dataRendering.js";
import { initMostPopular } from "./modules/listMostPopular.js";
import { loadProducts } from "./modules/productLoad.js";
import { loadMap } from "./modules/map.js";
import { createAccount } from "./modules/createAccount.js";
import { login } from "./modules/login.js";
import { addToCart } from "./modules/addToCart.js";
import { loadCart } from "./modules/loadCart.js";
import { goToCheckout } from "./modules/loadCart.js";
import { handlePromo } from "./modules/loadCart.js";
import { sendInquiry } from "./modules/sendInquiry.js";
import { loadCheckout } from "./modules/loadCheckout.js";
import { confirmPurchase } from "./modules/loadCheckout.js";

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
        loadDataPage();
    }
    if(page === "product") {
        loadProducts();
        const addCart = document.getElementById("add");
        addCart.addEventListener("click", addToCart);
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
    if(page === "cart") {
        loadCart();
        const chkBtn = document.getElementById("checkout");
        chkBtn.addEventListener("click", goToCheckout);
        const promoBtn = document.getElementById("addPromo");
        promoBtn.addEventListener("click", handlePromo);
    }
    if(page === "contact") {
        const sndBtn = document.getElementById("sendComment");
        sndBtn.addEventListener("click", sendInquiry);
    }
    if(page === "checkout"){
        loadCheckout();
        const confBtn = document.getElementById("confirmBtn");
        confBtn.addEventListener("click", confirmPurchase);
    }
}