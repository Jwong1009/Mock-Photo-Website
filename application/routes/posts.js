var express = require('express');
var router = express.Router();
var isLoggedIn = require('../public/middleware/routeProtectors').userIsLoggedIn;

const postController = require('../Controller/postController');

const multer = require('multer');
const crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(15).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single('img'), (req, res, next) => {
    postController.postCreation(req, res, next);
});

router.get("/search/:searchTerm", (req, res, next) => {
    postController.postSearch(req, res, next);
});

router.get("/getRecentPosts", (req, res, next) => {
    postController.populate(req, res, next);
});

router.get('/photo/:id', (req, res, next) => {
    res.sendFile('singleimg.html', { root: 'public/html' });
});

router.get('/getPostByID/:id', (req, res, next) => {
    postController.single(req, res, next);
})

router.use('/:id/uploadComments', isLoggedIn);
router.post('/:id/uploadComments', (req, res, next) => {
    postController.comment(req, res, next);
});

module.exports = router;
