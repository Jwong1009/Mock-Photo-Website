let submitComment = document.getElementById('usercomment');

submitComment.onsubmit = (e) => {
    e.preventDefault();

    let data = {
        comment: e.target[0].value
    }
    let status;

    let id = document.URL.split('/')[link.length - 1];

    fetch(`/posts/${id}/uploadComments`, {
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
    })
        .then((res) => {
            status = res.status;
            if (res.redirected) {
                window.location.replace(res.url);
            }
            return res.json();
        })
        .then((resObj) => {
            if (status !== 200) {
                alert(resObj.message);
            } else {
                location.replace(document.URL);
            }
        })
        .catch((err) => {
            
        })
}