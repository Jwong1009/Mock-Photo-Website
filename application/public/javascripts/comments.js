var isLoggedIn = require('../public/middleware/routeProtectors').userIsLoggedIn;

commentSubmit = document.getElementById('submit');

commentSubmit.onsubmit = (e) => {
    e.preventDefault();
    e.isLoggedIn;       //?? does this work lol

    debugger
    
    let comment = e.target[0].value;

    fetch('post/getPostByID/:id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.log(err);
            })

    })
}