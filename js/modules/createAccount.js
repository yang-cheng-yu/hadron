
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
    const emailregex = /[a-z0-9]+@[a-z]+\.[a-z]+$/;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const phonenum = document.getElementById("phonenum").value;
    const street = document.getElementById("street").value;
    const aptNum = document.getElementById("aptNum").value;
    const postCode = document.getElementById("postalCode").value;
    const city = document.getElementById("city").value;
    const province = document.getElementById("province").value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confpassword = document.getElementById("confirm-password").value.trim();

    let isValid = true;
    const messages = [];

    if (email === "" || username === "" || password === "" || confpassword === "" ||
        phonenum === "" || street === "" || aptNum === "" || postCode === "" ||
        city === "" || province === "" || country === "")
    {
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
    const phonenumRegex = /^\d{10}$/;
    if (phonenumRegex.test(phonenum) == false){
        messages.push("Phone Number must be 10 numbers");
        isValid = false;
    }
    const lettersRegex = /^[A-Za-z]+$/;
    if (lettersRegex.test(fname) == false){
        messages.push("First name must be only letters");
        isValid = false;
    }
    if (lettersRegex.test(lname) == false){
        messages.push("Last name must be letters");
        isValid = false;
    }
    const numberRegex = /\d+/;
    if (numberRegex.test(aptNum) == false){
        messages.push("apt Num must be a number");
        isValid = false;
    }
    if (lettersRegex.test(city) == false){
        messages.push("City must be letters");
        isValid = false;
    }
    if (lettersRegex.test(country) == false){
        messages.push("Country must be letters");
        isValid = false;
    }
    const postCodeRegex = /[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d/;
    if (postCodeRegex.test(postCode) == false){
        messages.push("Postal Code bad Format");
        isValid = false;
    }
    if (lettersRegex.test(province) == false){
        messages.push("province must be letters");
        isValid = false;
    }

    if (isValid) {
        addAccounts(username,email,password);
        showAlert("User registered successfully", "success", "alert-container");
    } else {
        showAlert(`Error registering user: <ul><li>${messages.join('</li><li>')}</ul>`, "danger", "alert-container");
    }
}

function addAccounts(username, email, password, fname, lname, phonenum, street, aptNum, postCode, city, province, country) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const duplicate = accounts.find(acc => acc.email === email || acc.username === username);
    if (duplicate) {
        return;
    }
    const newAccount = {
        username: username,
        email: email,
        password: password,
        name: {
            firstName: fname,
            lastName: lname
        },
        phone: phonenum,
        location: {
            street: street,
            aptNum: aptNum,
            postalCode: postCode,
            city: city,
            province: province,
            country: country
        },
        cart: []
    };
    accounts.push(newAccount);
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