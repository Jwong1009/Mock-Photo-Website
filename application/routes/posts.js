var express = require('express');
var router = express.Router();
const db = require('../config/database');
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;

const multer = require('multer');
const sharp = require('sharp');
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

    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destofThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;

    sharp(fileUploaded)
        .resize(280)
        .toFile(destofThumbnail)
        .then(() => {
            let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);'
            return db.execute(baseSQL, [title, desc, fileUploaded, destofThumbnail, fk_userid]);
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                successPrint("new post created");
                res.status(200).json({ message: "Post created succesfully" });
            } else {
                res.status(400).json({ message: "Unable to create post" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err });

        });

    console.log(req.body);
    console.log(req.file);
});

router.get("/search/:searchTerm", (req, res, next) => {
    let searchTerm = req.params.searchTerm;
    console.log(searchTerm);
    let SQL = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    WHERE title LIKE ?;';
    searchTerm = "%" + searchTerm + "%";
    db.query(SQL, [searchTerm])
        .then(([results, fields]) => {
            res.json(results);
        })
        .catch((err) => next(err));
});

router.get("/getRecentPosts", (req, res, next) => {
    let SQL = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username \
    FROM posts p \
    JOIN users u on p.fk_userid=u.id \
    ORDER BY p.created DESC;';
    db.query(SQL)
        .then(([results, fields]) => {
            res.json(results);
        })
        .catch((err) => next(err));
});

router.get('/photo/:id', (req, res, next) => {
    res.sendFile('singleimg.html', { root: 'public/html' });
});

router.get('/getPostByID/:id', (req, res, next) => {
    let id = req.params.id;
    //selecting posts with comments
    let SQL = 'SELECT p.id, p.title, p.description, p.photopath, p.created, u.username AS post_author, u2.username AS comment_author, c.comment, c.date \
    FROM posts p \
    JOIN (users u, comments c, users u2) ON (p.fk_userid=u.id AND c.post_id=p.id AND c.author_id=u2.id) \
    WHERE p.id=?';

    //selecting posts without comments
    let SQL_nocomments = 'SELECT p.id, p.title, p.description, p.photopath, p.created, u.username AS post_author \
    FROM posts p \
    JOIN users u ON p.fk_userid=u.id \
    WHERE p.id=?';
    debugger
    db.query(SQL, id)
        .then(([results, fields]) => {
            if (results && results.length == 0) {
                return db.query(SQL_nocomments, id)
            } else {
                console.log(results);
                res.json(results);
            }
        })
        .then(([results, fields]) => {
            res.json(results);
        })
        .catch((err) => next(err));
})
module.exports = router;