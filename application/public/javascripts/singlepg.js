
let link = document.URL.split('/');
let id = link[link.length - 1];
debugger
console.log(id);
let postURL = "http://localhost:3000/posts/getPostByID/" + id;
fetch(postURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        let photopath = 'http://localhost:3000/' + data[0].photopath;
        debugger
        document.getElementById('photo-title').innerHTML = data[0].title;
        document.getElementById('photo').src = photopath;
        document.getElementById('photo-owner-uname').innerHTML = "User: " + data[0].username;
        document.getElementById('photo-description').innerHTML = "Description: " + data[0].description;
    })
    .catch((err) => {
        console.log("Error");
        let error = "Could not populate";
        alert(error);
    });