function createComment(data) {
    return `<div class="commentarea> \
                <div class="comment-date">[${new Date(data.date).toLocaleString('en-US')}] ${data.comment_author}: ${data.comment} </div> \
            </div>`;
}

let link = document.URL.split('/');
let id = link[link.length - 1];
let postURL = "http://localhost:3000/posts/getPostByID/" + id;
fetch(postURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let photopath = 'http://localhost:3000/' + data[0].photopath;
        document.getElementById('photo-title').innerHTML = data[0].title;
        document.getElementById('photo').src = photopath;
        document.getElementById('photo-owner-uname').innerHTML = "User: " + data[0].post_author;
        document.getElementById('photo-description').innerHTML = "Description: " + data[0].description;
        document.getElementById('photo-created-date').innerHTML = "Date created: " + new Date(data[0].created).toLocaleString('en-US');

        if (data[0].comment) {
            let html = "";
            data.forEach((comment) => {
                html += createComment(comment);
            })
            document.getElementById('commentlist').innerHTML = html;
        }
    })
    .catch((err) => {
        console.log("Error");
        let error = "Could not populate";
        alert(error);
    });