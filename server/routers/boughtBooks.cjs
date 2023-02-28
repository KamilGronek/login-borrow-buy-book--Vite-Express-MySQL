const express = require("express");
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




router.get('/boughtBooks', (req, res) => {
    res.send(data.boughtBooks);
});

module.exports = router;