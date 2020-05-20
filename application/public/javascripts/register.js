let registerForm = document.getElementById('inputs');


registerForm.onsubmit = (e) => {
    e.preventDefault();

    let username = e.target[0].value
    let email = e.target[1].value
    let password = e.target[2].value
    let password2 = e.target[3].value

    let data = {
        username,
        email,
        password,
        password2
    }
    let status;

    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => {
        status = resp.status;
        return resp.json();
    }).then(json => {
        if (status !== 200) {
            let errorMsg = document.getElementById('error-msg-li');
            debugger
            if (errorMsg) {
                errorMsg.innerText = json;
            } else {
                let parent = document.getElementById('formdiv');
                errorMsg = document.createElement("LI");
                errorMsg.innerText = json;
                errorMsg.setAttribute('class', 'error-msg');
                errorMsg.setAttribute('id', 'error-msg-li');
                parent.appendChild(errorMsg);
            }
        } else {
            window.location.replace('/login');
        }
    })

}