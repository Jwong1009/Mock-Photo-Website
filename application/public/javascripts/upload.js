let postForm = document.getElementById('post-image-form');

postForm.onsubmit = (e) => {
    e.preventDefault();

    let data = new FormData(postForm);
    let status;

    fetch('/posts/createPost', {
        body: data,
        method: "POST"
    })
        .then((res) => {
            status = res.status;
            
            return res.json();
        })
        .then((resObj) => {
            if (status !== 200) {
                alert(resObj.message);
            } else {
                window.location.replace('/');
            }
    })

}
