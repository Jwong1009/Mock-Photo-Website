import { axios } from 'axios';

window.addEventListener('DOMContentLoaded', (event) => {
    const loginBtn = document.getElementById('login');
    const registerBtn = document.getElementById('register');
    if (hasUser() === true) {
        loginBtn.innerHTML = "logout"; 
        registerBtn.style.display = "none";
    }
});

function hasUser() {
    cookiearray = document.cookie.split(';');
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
    }
    if (name !== "") {
        return true;
    } else {
        return false;
    }
}


