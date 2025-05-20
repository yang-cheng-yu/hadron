import { showAlert } from "./createAccount.js";

/**
 * Handles the login form submission.
 * triggers login validation.
 * 
 * @export
 */
export function login(){
    event.preventDefault();

    const useremail = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    checkLogin(useremail, password);
}

/**
 * Validates the provided login credentials
 * and checks if that is a valid account.
 * If login is successful, 
 * sets the current user in localStorage and redirects to the homepage.
 * Otherwise, displays an error alert.
 * 
 * @async
 * @param {string} username - The email or username
 * @param {string} password - The password
 */
async function checkLogin(username, password){
    const errormsg = document.getElementById("error-message");
    errormsg.textContent = "";
    if (username === "" || password === ""){
        showAlert("Fill out all fields", "danger", "alert-container");
    }
    else {
        const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const match = accounts.find(acc => 
            (acc.email === username || acc.username === username) &&
            acc.password === password);

        if (match) {
            localStorage.setItem('currentUser', JSON.stringify(match));
            showAlert("Logged in", "success", "alert-container");
            console.log("logged in succesfully");
            await sleep(1000);
            window.location.href = "/index.html";
        }
        else {
            showAlert("Login failed - Check Username or Password", "danger", "alert-container");
            console.log("no accounts match");
        }
    }
}

/**
 * Delays execution for a specified number of milliseconds.
 * 
 * @export
 * @param {number} ms - The number of milliseconds to wait
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}