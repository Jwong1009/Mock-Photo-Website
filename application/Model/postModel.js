const db = require('../config/database');
const sharp = require('sharp');


const postModel = {
    createPost: function (title, desc, fileUploaded, destofThumbnail, fk_userid) {
        return sharp(fileUploaded)
            .resize(280)
            .toFile(destofThumbnail)
            .then(() => {
                return db.execute('INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);',
                    [title, desc, fileUploaded, destofThumbnail, fk_userid]);
            })
            .then(([results, fields]) => {
                return Promise.resolve(results && results.affectedRows);
            })
            .catch((err) => {
                throw err;
            })
    },

    search: function (searchTerm) {
        let SQL = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username \
        FROM posts p \
        JOIN users u on p.fk_userid=u.id \
        WHERE title LIKE ?;';
        searchTerm = "%" + searchTerm + "%";
        return db.execute(SQL, [searchTerm])
            .then(([results, fields]) => {
                return Promise.resolve(results);
            })
            .catch((err) => {
                throw err;
            });
    },

    recent: function () {
        let SQL = 'SELECT p.id, p.title, p.description, p.thumbnail, u.username \
        FROM posts p \
        JOIN users u on p.fk_userid=u.id \
        ORDER BY p.created DESC;';
        return db.execute(SQL)
            .then(([results, fields]) => {
                return Promise.resolve(results);
            })
            .catch((err) => {
                throw err;
            })
    },

    singlePost: function (id) {
        let SQL = 'SELECT p.id, p.title, p.description, p.photopath, p.created, u.username AS post_author, u2.username AS comment_author, c.comment, c.date \
        FROM posts p \
        LEFT JOIN users u ON p.fk_userid=u.id \
        LEFT JOIN (comments c, users u2) ON (c.post_id=p.id AND c.author_id=u2.id) \
        WHERE p.id=?';
        return db.query(SQL, id)
            .then(([results, fields]) => {
                return Promise.resolve(results); 
            })
            .catch((err) => {
            throw err;
        })
    },

    uploadComment: function (comment, author, postID) {
        return db.execute('INSERT INTO comments (comment, date, author_id, post_id) VALUES (?, NOW(), ?, ?);',
            [comment, author, postID])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
            .catch((err) => {
                throw err;
        })
    }

}

module.exports = postModel;