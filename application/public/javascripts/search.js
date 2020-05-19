function createTile(data) {
    debugger
    return `<div class="picture-grid"> \
            <a href="/photo/${data.id}" >
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
    debugger
    fetch(searchURL)
        .then((res) => {
            debugger
            return res.json();
        })
        .then((data) => {
            let html = "";
            debugger
            data.forEach((post) => {
                html += createTile(post);
            })
            debugger
            document.getElementById('grid-container').innerHTML = html;
        })
        .catch((err) => {
            debugger
            console.log("Unable to get search results");
            let error = "Error, could not get search results";
            alert(error);
        });
}

