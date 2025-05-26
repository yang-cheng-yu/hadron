import { fetchData } from "./fetch.js";
import { loadPromo } from "./loadPromo.js";

/**
 * Description placeholder
 *
 * @type {number}
 */
let productTotal = 0;
/**
 * Description placeholder
 *
 * @type {number}
 */
let promo = 0;

/**
 * Loads the current user's cart and
 * calculates totals
 * 
 * @export
 * @async
 * @returns {Promise<void>}
 */
export async function loadCart(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const currentUsername = currentUser.username;

    const accounts = JSON.parse(localStorage.getItem("accounts"));
    
    const index = accounts.findIndex(acc =>
         acc.username === currentUsername
    );
    const customer = accounts[index];
    const cart = customer.cart;

    const finalProducts = await findProducts(cart);
    parseProducts(finalProducts);
    showAmount(finalProducts);
}

/**
 * Calculates and updates the product
 * total price before discounts.
 * 
 * @param {Array<Object>} products - List of products with quantities
 */
function updateProductTotal(products) {
    productTotal = 0;

    products.forEach(product => {
        const price = parseInt(product.price);
        productTotal += price * product.quantity;
    });
}

/**
 * Finds product data from the list of IDs in the user's cart
 * and merges quantities for duplicates.
 * 
 * @async
 * @param {Array<number>} productIds - List of product IDs from the cart
 */
async function findProducts(productIds) {
    const data = await fetchData("../../data/products.json");
    const products = data.products;

    const allProducts = {};

    productIds.forEach(id => {
        const product = products.find(p => p.id === id);
        if (product) {
            if (allProducts[id]){
                allProducts[id].quantity++;
            } else {
                allProducts[id] = {...product, 'quantity': 1};
            }
        }
    });
    return Object.values(allProducts);
}

/**
 * Renders the cart product table in the DOM.
 * Adds event listeners to quantity input fields for live updates.
 * 
 * @param {Array<Object>} products - List of products to display with quantity
 */
function parseProducts(products){
    const table = document.getElementById("table-cart");
    table.innerHTML = "";

    products.forEach(product => {
        const newRow = document.createElement("tr");
        const rowContent = []

        for(let i = 0; i < 4; i++)
        {
            rowContent.push(document.createElement("td"));
            newRow.appendChild(rowContent[i]);
        }

        const image = document.createElement("img");
        image.setAttribute("src", "/assets/images/appicons/" + product.image);
        image.setAttribute("width", "200");
        rowContent[0].appendChild(image);
        rowContent[1].textContent = product.title;
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "0";
        quantityInput.value = product.quantity;
        quantityInput.classList.add("product-quantity");
        quantityInput.dataset.productId = product.id;
        rowContent[2].appendChild(quantityInput);

        rowContent[3].textContent = "$" + Number(product.price).toFixed(2);

        table.appendChild(newRow);
    });

    document.querySelectorAll(".product-quantity").forEach(amount => {
        amount.addEventListener("change", event => {
            const newQuantity = parseInt(event.target.value);
            const productId = parseInt(event.target.dataset.productId);

            updateCartQuantity(productId, newQuantity);
            loadCart();
        });
    });
}

/**
 * Updates the cart in localStorage by 
 * setting the quantity of a specific product.
 * 
 * @param {number} productId - The ID of the product to update
 * @param {number} newQuantity - The new quantity to set
 */
function updateCartQuantity(productId, newQuantity) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const userIndex = accounts.findIndex(acc => acc.username === currentUser.username);
    
    const cart = accounts[userIndex].cart;

    const filteredCart = cart.filter(id => id !== productId);

    for (let i =0; i < newQuantity; i++) { //this handles if 0 at the same time
        filteredCart.push(productId);
    }

    accounts[userIndex].cart = filteredCart;
    localStorage.setItem("accounts", JSON.stringify(accounts));
}


/**
 * Updates the cart subtotal, 
 * applies promo discount, 
 * calculates tax, 
 * and updates display.
 * 
 * @param {Array<Object>} products - List of products with quantity
 */
function showAmount(products){
    updateProductTotal(products);
    updateValues();
}

/**
 * Changes window to checkout.html
 * 
 * @export
 */
export function goToCheckout(){
    window.location.href = "/pages/checkout.html";
}

/**
 * Handles promo code input, 
 * validates it, 
 * applies the discount, 
 * and updates the UI.
 * 
 * @export
 * @async
 */
export async function handlePromo() {
    const inputPromo = document.getElementById("promo").value;
    promo = await loadPromo(inputPromo);

    const discountDisplay = document.getElementById("discount");
    if (isNaN(promo)){
        discountDisplay.textContent = "Promo Discount: Not A Valid Code";
        promo = 0;
    } else{
        discountDisplay.textContent = "Promo Discount: " + promo + "%";
    }
    updateValues();
}

/**
 * Recalculates subtotal, tax, 
 * and total based on current cart 
 * and promo discount.
 * Updates DOM and saves total in sessionStorage.
 */
function updateValues() {
    const subtotalDisplay = document.getElementById("subtotal");
    let subtotal = productTotal - promo * productTotal / 100;
    subtotalDisplay.textContent = "Subtotal: $" + subtotal.toFixed(2);

    let tax = subtotal * 0.15;
    const taxDisplay = document.getElementById("tax");
    taxDisplay.textContent = "Tax (15%): $" + tax.toFixed(2);

    let total = tax + subtotal;
    const totalDisplay = document.getElementById("total-price");
    totalDisplay.textContent = "Total: $" + total.toFixed(2);

    sessionStorage.setItem("total-price", total);
}