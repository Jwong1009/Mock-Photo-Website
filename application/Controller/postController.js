const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;
const postModel = require('../Model/postModel');

const postController = {
    postCreation: function (req, res, next) {
        let fileUploaded = req.file.path;
        let fileAsThumbnail = `thumbnail-${req.file.filename}`;
        let destofThumbnail = req.file.destination + "/" + fileAsThumbnail;
        let title = req.body.title;
        let desc = req.body.description;
        let fk_userid = req.session.userID;

        postModel.createPost(title, desc, fileUploaded, destofThumbnail, fk_userid)
            .then((created) => {
                if (created) {
                    successPrint("new post created");
                    res.status(200).json({ message: "Post created succesfully" });
                } else {
                    res.status(400).json({ message: "Unable to create post" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    },

    postSearch: function (req, res, next) { 
        let searchTerm = req.params.searchTerm;
        postModel.search(searchTerm)
            .then((successSearch) => {
                res.json(successSearch);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    },

    populate: function (req, res, next) {
        postModel.recent()
        .then((populate) => {
            res.json(populate);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
    },

    single: function (req, res, next) {
        let id = req.params.id;
        postModel.singlePost(id)
            .then((retrieved) => {
                if (retrieved) {
                    successPrint("Post acquired");
                    res.json(retrieved);
                } else {
                    errorPrint("Could not find posts");
                    res.status(400).json({ message: "Unable to retrieve post" });
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    },

    comment: function (req, res, next) {
        let author = req.session.userID;
        let comment = req.body.comment;
        let postID = parseInt(req.params.id);
        postModel.uploadComment(comment, author, postID)
            .then(() => {
                res.redirect(`/posts/photo/${postID}`);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    }
}


module.exports = postController;