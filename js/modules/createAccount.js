
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

    let isValid = true;
    const messages = [];

    if (email === "" || username === "" || password === "" || confpassword === ""){
        messages.push("Fill out all fields");
        isValid = false;
    }
    if (regex.test(email) == false){
        messages.push("Invalid email Form");
        isValid = false;
    }
    const passregex = /.{8,}/;
    if (passregex.test(password) == false) {
        messages.push("Password must be at least 8 characters");
        isValid = false;
    }
    if (password != confpassword){
        messages.push("Passwords do not match");
        isValid = false;
    }

    if (isValid) {
        addAccounts(username,email,password);
        showAlert("User registered successfully", "success", "alert-container");
    } else {
        showAlert(`Error registering user: <ul><li>${messages.join('</li><li>')}</ul>`, "danger", "alert-container");
    }
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

export function showAlert(message, type, alertPlaceholderId) {
    const alertPlaceholder = document.getElementById(alertPlaceholderId);
    alertPlaceholder.innerHTML = '';
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}