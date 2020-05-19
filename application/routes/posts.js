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
                res.status(200).json({message: "Post created succesfully"});
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
    ORDER BY p.created DESC \
    LIMIT 9;'; 
    db.query(SQL)
        .then(([results, fields]) => {
            res.json(results);
        })
        .catch((err) => next(err));
});

module.exports = router;