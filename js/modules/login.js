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
        errormsg.textContent = "Fill out all fields";
        return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const match = accounts.find(acc => 
        (acc.email === username || acc.username === username) &&
        acc.password === password);

    if (match) {
        localStorage.setItem('currentUser', JSON.stringify(match));
        errormsg.textContent = "Logged in!";
        errormsg.style.color = "green";
        console.log("logged in succesfully");
        await sleep(1000);
        window.location.href = "../index.html";
        return;
    }
    errormsg.textContent = "No account with Those credentials";
    console.log("no accounts match");
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}