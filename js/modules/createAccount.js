export function createAccount(event){
    event.preventDefault();

    const result = checkCredentials();
    if (result != true){
        console.log(result);
        return;
    }
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem('username', username, 'email', email, "password", password);

    addAccounts(username,email,password);
}

function checkCredentials(){
    const error = document.getElementById("error-message");
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]+$/;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confpassword = document.getElementById("confirm-password").value;

    if (email === "" || username === "" || password === "" || confpassword === ""){
        error.textContent = "Fill out all fields"
        return false;
    }
    if (regex.test(email) == false){
        error.textContent = "Invalid email Form";
        return false;
    }
    const passregex = /.{8,}/;
    if (passregex.test(password) == false) {
        error.textContent = "Password must be at least 8 characters";
        return false;
    }
    if (password != confpassword){
        error.textContent = "Passwords do not match";
        return false;
    }
    return true;
}

function addAccounts(username, email, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const duplicate = accounts.find(acc => acc.email === email || acc.username === username);
    if (duplicate) {
        const errormsg = document.getElementById("error-message");
        errormsg.textContent = "Username or email already exists";
        return;
    }
    accounts.push({ username, email, password, cart: [] });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    const errormsg = document.getElementById("error-message");
    errormsg.textContent = "account added";
}