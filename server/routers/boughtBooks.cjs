const express = require("express");
const jwt = require('jsonwebtoken')
const data = require("../db.json");
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
let jsonParser = bodyParser.json()
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

router.post('/boughtBooks', upload.single('image'), jsonParser, (req, res) => {

    const { id, cover, price, title, author, 
            pages, link, date, important, active,
            activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;
    const file = req.file
    console.log(file);

    console.log(req.body)


    const createBoughtBooks = {
        id,
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

    const boughtBooks = db.get('boughtBooks')
    let result = boughtBooks.find({id : createBoughtBooks.id});

    let book = result.value();

    if (book == null) {
        boughtBooks.push(createBoughtBooks).write();
    //    return;
    }

});




router.get('/boughtBooks', authenticateToken, (req, res) => {
    const boughtBooks = db.get('boughtBooks')
    res.send(boughtBooks);
});



router.delete('/boughtBooks/:id', authenticateToken, (req,res) => {
    const bookId = req.params.id;
    const boughtBooks = db.get('boughtBooks');
    boughtBooks.remove({ id: bookId }).write();
    
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({warning:'No token provided'})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("Show error:", err)
        console.log("Token !!!!:", token)

        if (err){
            console.log('Error verifying JWT:', err);
            res.status(401).json({ warning: 'Invalid token', code: "EXPIRED"
            });
        }
        req.user = user;
        console.log("dane4000 BoughtBooks:", user)

    next()
    })
}


module.exports = router;