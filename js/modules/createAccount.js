
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
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confpassword = document.getElementById("confirm-password").value.trim();

    let isValid = true;
    const messages = [];

    if (email === "" || username === "" || password === "" || confpassword === ""){
        messages.push("Fill out all fields");
        isValid = false;
    }
    else {
        if (!/^[a-zA-Z0-9\.]{1,16}$/.test(username.trim())) {
            isValid = false;
            messages.push("Invalid username - 16 chars max");
        }
        if (/^[a-z0-9\.]+@[a-z]+\.[a-z]{2,6}(\.[a-z]{2,6})?$/.test(email) == false){
            isValid = false;
            messages.push("Invalid email Form");
        }
        if (/^[a-zA-Z0-9.,\/';!@#$%^&*()-+=_\[\]"':;?><`~]{8,}$/.test(password) == false) {
            isValid = false;
            messages.push("Password must be at least 8 characters");
        }
        if (password != confpassword){
            isValid = false;
            messages.push("Passwords do not match");
        }
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
        return;
    }
    accounts.push({ username, email, password, cart: [] });
    localStorage.setItem("accounts", JSON.stringify(accounts));
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