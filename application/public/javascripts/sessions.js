function logoutClick() {
    var fetchOptions = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application.json'
        }
    }
    let fetchURL = 'http://localhost:3000/users/logout';
    fetch(fetchURL, fetchOptions)
        .then((data) => {
            console.log(data);
            let logButton = document.getElementById('login');
            logButton.innerHTML = "Sign In";
            logButton.setAttribute('href', '/login');
            logButton.onclick = null;
            let regButton = document.getElementById('register');
            regButton.innerHTML = "Register";
            regButton.setAttribute('href', '/register');

        }).catch((err) => location.reload());
}


if (document.cookie.includes('cscid')) {
    console.log("User is logged in");
    let logButton = document.getElementById('login')
    logButton.innerHTML = "Sign Out";
    logButton.removeAttribute('href');
    logButton.onclick = logoutClick;
    let regButton = document.getElementById('register');
    regButton.remove();

} else {
    let logButton = document.getElementById('login')
    logButton.innerHTML = "Sign In";
    logButton.setAttribute('href', '/login');
}