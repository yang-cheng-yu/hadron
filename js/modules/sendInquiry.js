import { showAlert } from "./createAccount.js";

/**
 * Handles the form submission for user inquiries.
 * 
 * @export
 * @param {Event} event - form submission event
 */
export function sendInquiry(event){
    event.preventDefault();
    checkCredentials();
}

/**
 * Form validation for input fields.
 * If valid, stores the inquiry in local storage
 * and shows a success alert.
 * Otherwise, displays an error alert with reasons.
 * 
 */
function checkCredentials(){
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value;
    const message = document.getElementById("comments").value;
    const lettersRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-z0-9\.]+@[a-z]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/;
    let isValid = true;
    const messages = [];

    if(name === "" || email === "" || message === ""){
        messages.push("Fill out fields");
        isValid = false;
    } 
    else
    {
        if (lettersRegex.test(name) == false){
            messages.push("Name should not contain numbers");
            isValid = false;
        }
        if (emailRegex.test(email) == false){
            messages.push("Email wrong format");
            isValid = false;
        }
    }
    if (isValid) {
        storeInquiry(name, email, message);
        showAlert("Inquiry Sent", "success", "alert-placeholder");
    } else {
        showAlert(`Error sending Inquiry: <ul><li>${messages.join('</li><li>')}</ul>`, "danger", "alert-placeholder");
    }
}

/**
 * Saves valid inquiry into localStorage.
 * 
 * @param {string} name - user's name
 * @param {string} email - user's email
 * @param {string} message - user's message
 */
function storeInquiry(name, email, message){
    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    const newComment = {name, email, message};
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));
}