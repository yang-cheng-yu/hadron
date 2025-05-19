import { showAlert } from "./createAccount.js";

export function login(){
    event.preventDefault();

    const useremail = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    checkLogin(useremail, password);
}

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

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}