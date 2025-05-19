function initApp() {
    const form = document.getElementById("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        validateForm();
    })
}

function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const post = document.getElementById('post').value;

    let isValid = true;
    const messages = [];

    if (!/^[a-zA-Z0-9\.]+$/.test(username.trim())) {
        isValid = false;
        messages.push("Invalid username");
    }

    if (!/^[a-zA-Z0-9.,\/';!@#$%^&*()-+=_\[\]"':;?><`~]{8,}$/.test(password.trim())) {
        isValid = false;
        messages.push("Invalid password");
    }

    if (!/^[a-z0-9\.]+@[a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/.test(email.trim())) {
        isValid = false;
        messages.push("Invalid email");
    }

    if (!/^\d{10}$/.test(phone.trim())) {
        isValid = false;
        messages.push("Invalid phone number");
    }

    if (!/^([a-zA-Z]\d){3,}$/.test(post.trim())) {
        isValid = false;
        messages.push("Invalid postal code");
    }

    if (isValid) {
        showAlert("User registered successfully", "success")
    } else {
        showAlert(`Error registering user: <ul><li>${messages.join('</li><li>')}</ul>`, "danger")
    }
}

const alertPlaceholder = document.getElementById('alert-placeholder');

function showAlert(message, type) {
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