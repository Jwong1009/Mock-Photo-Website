function createTile(data) {
    return `<div class="picture-grid"> \
            <a href="/posts/photo/${data.id}" >
                <div class="title-of-photo">${data.title}</div> \
                <div class="photo-owner-uname">${data.username}</div> \
                <img class="photo" src="${data.thumbnail}" /> \
            </a>\
             </div>`;
}

let submitEvent = document.getElementById('submit');

submitEvent.onclick = (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById('searchbox').value;
    let searchURL = 'http://localhost:3000/posts/search/' + searchTerm;
    fetch(searchURL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let html = "";
            data.forEach((post) => {
                html += createTile(post);
            })
            document.getElementById('grid-container').innerHTML = html;
        })
        .catch((err) => {
            console.log("Unable to get search results");
            let error = "Error, could not get search results";
            alert(error);
        });
}

fetch("http://localhost:3000/posts/getRecentPosts")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let html = "";
        data.forEach((post) => {
            html += createTile(post);
        })
        document.getElementById('grid-container').innerHTML = html;
    })
    .catch((err) => {
        let error = "Could not populate";
        alert(error);
    });