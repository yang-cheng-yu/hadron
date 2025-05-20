import { showAlert } from "./createAccount.js";


/**
 * Initializes the checkout page by 
 * loading shipping and billing information
 * 
 * @export
 */
export function loadCheckout(){
    loadShippingInformation();
}

/**
 * Loads the current user's contact and 
 * shipping information into the form fields.
 * Also displays the total price stored in sessionStorage.
 */
function loadShippingInformation(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    document.getElementById("email").value = currentUser.email;
    document.getElementById("phonenum").value = currentUser.phone;
    
    document.getElementById("street").value = currentUser.location.street;
    document.getElementById("aptNum").value = currentUser.location.aptNum;
    document.getElementById("postalCode").value = currentUser.location.postalCode;
    document.getElementById("city").value = currentUser.location.city;
    document.getElementById("province").value = currentUser.location.province;
    document.getElementById("country").value = currentUser.location.country;
    const totalPrice = sessionStorage.getItem("total-price");
    document.getElementById("price").textContent = "Total Price: " + totalPrice;
}

/**
 * Handles purchase confirmation by validating card 
 * input and either confirming or rejecting the transaction.
 * 
 * @export
 * @param {Event} event - form submission event
 */
export function confirmPurchase(event){
    event.preventDefault();
    checkCardCredentials();
}

/**
 * Validates the credit card number and CVV fields.
 * If valid, it clears the cart and displays a success message.
 * If invalid, shows an error alert with a list of problems.
 */
function checkCardCredentials(){
    const cardNum = document.getElementById("cardnumber").value;
    const cvv = document.getElementById("cvv").value;
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;

    let isValid = true;
    const message = [];

    if(cardNum === "" || cvv === ""){
        message.push("Fill out all fields");
        isValid = false;
    }
    else{
        if(cardNumberRegex.test(cardNum) == false){
            message.push("Ivalid Card Format");
            isValid = false;
        }

        if(cvvRegex.test(cvv) == false){
            message.push("Invalid cvv Format");
            isValid = false;
        }
    }
    if (isValid) {
        clearCart();
        showAlert("Purchase Confirmed!", "success", "alert-placeholder");
    } else {
        showAlert(`Error Confirming Purchase: <ul><li>${message.join('</li><li>')}</ul>`, "danger", "alert-placeholder");
    }
}
/**
 * Clears the cart of the account that is logged in
 */
function clearCart(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    const userIndex = accounts.findIndex(acc =>
        acc.email === currentUser.email || acc.username === currentUser.username
    );

    if (userIndex !== -1) {
        accounts[userIndex].cart = [];
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }
}