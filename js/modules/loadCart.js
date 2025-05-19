import { fetchData } from "./fetch.js";

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
        image.setAttribute("width", "250");
        rowContent[0].appendChild(image);
        rowContent[1].textContent = product.title;
        rowContent[2].textContent = product.quantity;
        rowContent[3].textContent = "$" + product.price;

        table.appendChild(newRow);
    });
}