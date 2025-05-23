import { fetchData } from "./fetch.js";
import { showAlert } from "./createAccount.js";


/**
 * function for adding products to cart
 * fetches all products from json file
 * takes selectedProductId from session storage
 * and matches it with one of the products from the
 * json file.
 * Puts the product id of that product into carts
 * array of the current logged in account
 * 
 * @export
 */
export async function addToCart(){
    const data = await fetchData("../data/products.json");
    const products = data.products;
    

    let selectedProductId = sessionStorage.getItem("selectedProductId");
    console.log(selectedProductId)

    let product = null;
    const selectedID = parseInt(selectedProductId);
    console.log(selectedID)

    products.forEach(p => {
        if (p.id === selectedID) {
            product = p;
        }
    });
    console.log(product)
    const productId = product.id;

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) 
    {
        console.error("No user is currently logged in.");
        return;
    }

    const index = accounts.findIndex(acc =>
        acc.email === currentUser.email || acc.username === currentUser.username
    );

    if (index === -1) {
        console.error("Current user not found in account list.");
        return;
    }
    
    accounts[index].cart.push(productId);

    localStorage.setItem("accounts", JSON.stringify(accounts));
    showAlert("Added to cart", "success", "message");
}