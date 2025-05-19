import { fetchData } from "./fetch.js";
import { loadPromo } from "./loadPromo.js";

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

async function findProducts(productIds) {
    const data = await fetchData("/data/products.json");
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

        rowContent[3].textContent = "$" + product.price;

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

function showAmount(products){
    let amount = 0;

    products.forEach(product => {
        const price = parseInt(product.price);
        amount += price * product.quantity;
    
    });
    const subtotal = document.getElementById("subtotal");
    subtotal.textContent = "Subtotal: $" + amount;

    const tax = amount * 0.15;
    const taxDisplay = document.getElementById("tax");
    taxDisplay.textContent = "Tax (15%): $" + tax;

    const total = tax + amount;
    const totalDisplay = document.getElementById("total-price");
    totalDisplay.textContent = "Total: $" + total;

    sessionStorage.setItem("total-price", total);
}

export function goToCheckout(){
    window.location.href = "/pages/checkout.html";
}

document.getElementById("addPromo").addEventListener("click", async () => {
    const inputPromo = document.getElementById("promo").value;
    const promo = await loadPromo(inputPromo);

    const discountDisplay = document.getElementById("discount");
    if (isNaN(promo)){
        discountDisplay.textContent = "Promo Discount: Not A Valid Code";
    } else{
        discountDisplay.textContent = "Promo Discount: " + promo + "%";

        let total = document.getElementById("total-price").textContent;
        const totalValue = parseFloat(total.split('$')[1]); //will return the string after $
        const totalprice = document.getElementById("total-price");

        totalprice.textContent = total = "Total: $" + (totalValue * (1 - (promo / 100)));
    }
}) 
