const express = require("express");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
let jsonParser = bodyParser.json()
const connection = require('../database.cjs')

router.post('/boughtBooks', upload.single('image'), jsonParser, (req, res) => {

    const {  cover, price, title, author, 
            pages, link, date, important, active,
            activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;
    const file = req.file
    console.log(file);

    console.log(req.body)


    const createBoughtBooks = {
        cover: {
          large,
          small
        },
        price,
        title,
        author,
        pages,
        link,
        date,
        important,
        active,
        activeReturnedBook,
        finishDate
    }

    let sql = "INSERT INTO boughtbooks(cover, price, title, author, pages, link,date, important,active, activeReturnedBook,finishDate) VALUES ?";
    let values = [ 
      [ JSON.stringify(createBoughtBooks.cover), 
        createBoughtBooks.price, 
        createBoughtBooks.title, 
        createBoughtBooks.author, 
        createBoughtBooks.pages, 
        createBoughtBooks.link, 
        createBoughtBooks.date, 
        createBoughtBooks.important, 
        createBoughtBooks.active, 
        createBoughtBooks.activeReturnedBook,
        createBoughtBooks.finishDate ]
    ];

    connection.query(sql,[values], function(err, result){
      if (err) throw err;
        console.log("records inserted:", result.affectedRows);
    })

});


router.get('/boughtBooks', (req, res) => {
    connection.query(
        "SELECT * FROM project_book.boughtbooks",
      (err, results) => {
        if (err) {
          console.log(err)
        } 

        const allResults = results.map(book => {
          console.log("bookId: ", book.id);
          return {
            ...book,
            cover: JSON.parse(book.cover)
          };
        });
        res.send(allResults);
    });

});


router.delete('/boughtBooks/:id', (req, res) => {
    const bookId = req.params.id;

    console.log("boughtBooks ID:", req.params.id)

    let sql = `DELETE FROM boughtbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;

        console.log("delete ID:::",result)
        console.log("records deleted:", result.affectedRows);
        res.send("BoughtBooks deleted successfully");
    })
});

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (!token) {
//         return res.status(401).json({warning:'No token provided'})
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         console.log("Show error:", err)
//         console.log("Token !!!!:", token)

//         if (err){
//             console.log('Error verifying JWT:', err);
//             res.status(401).json({ warning: 'Invalid token', code: "EXPIRED"
//             });
//         }
//         req.user = user;
//         console.log("dane4000 BoughtBooks:", user)

//     next()
//     })
// }


module.exports = router;