let loginForm = document.getElementById('inputs');


loginForm.onsubmit = (e) => {
    e.preventDefault();

    let username = e.target[0].value;
    let password = e.target[1].value;

    let data = {
        username,
        password
    }
    let status;

    debugger

    fetch('/users/login', {
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
            if (errorMsg) {
                errorMsg.innerText = json;
            } else {
                let parent = document.getElementById('input-form');
                errorMsg = document.createElement("LI");
                errorMsg.innerText = json;
                errorMsg.setAttribute('class', 'error-msg');
                errorMsg.setAttribute('id', 'error-msg-li');
                parent.appendChild(errorMsg);
            }
        } else {
            window.location.replace('/');
        }
    })
        .catch((err) => {
            let error = "Error, please try again later";
            alert(error);
    })
}