import { fetchData } from "./fetch.js";

/**
 * Loads and displays detailed information about the selected product on the product page.
 * Retrieves the product ID from sessionStorage, 
 * matches it with the product list from the JSON file,
 * and fills in HTML elements with the product's data.
 * 
 * @export
 * @async
 */
export async function loadProducts(){
    const data = await fetchData("../data/products.json");
    const products = data.products;

    const selectedProductId = sessionStorage.getItem("selectedProductId");

    let product = null;
    const selectedID = parseInt(selectedProductId);

    products.forEach(p => {
        if (p.id === selectedID) {
            product = p;
        }
    });

    if (!product){
        console.error("Product Not Found");
        return;
    }

    document.getElementById("product-image").src = "/assets/images/appicons/" + product.image;
    document.getElementById("title").textContent = product.title;
    document.getElementById("company").textContent = product.company;
    document.getElementById("price").textContent = product.price + "$";
    document.getElementById("categories").textContent = product.categories;
    document.getElementById("description").textContent = product.description;
    document.getElementById("copies-sold").textContent = "Copies Sold: " + product.copiesSold;
    document.getElementById("id").textContent = "Product ID: " + selectedID;
}