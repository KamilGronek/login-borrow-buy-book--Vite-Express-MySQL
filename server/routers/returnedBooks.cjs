const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
let jsonParser = bodyParser.json()
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);




router.post('/returnedBooks', upload.single('image'), jsonParser, (req, res) => {

    const { id, cover, price, title, author, 
            pages, link, date, important, active,
            activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;
    const file = req.file
    console.log(file);

    console.log(req.body)


    const createReturnedBooks = {
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

    const returnedBooks = db.get('returnedBooks')
    let result = returnedBooks.find({id : createReturnedBooks.id});

    let book = result.value();

    if (book == null) {
        console.log("nie książka isnieje")
        returnedBooks.push(createReturnedBooks).write();
    //    return;
    }

});


router.get('/returnedBooks', (req, res) => {
    const returnedBooks = db.get('returnedBooks')
    console.log(returnedBooks)
    res.send(returnedBooks);
});


router.delete('/returnedBooks/:id', (req, res) => {
    const bookId = req.params.id
    console.log(bookId)
    const borrowedBooks = db.get('returnedBooks');
    borrowedBooks.remove({ id: bookId }).write();
});

module.exports = router;
