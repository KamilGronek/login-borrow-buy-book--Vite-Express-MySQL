
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


router.post('/borrowedBooks', upload.single('image'), jsonParser, (req, res) => {

  const { id, cover, price, title, author, 
          pages, link, date, important, active,
          activeReturnedBook,finishDate } = req.body;

  const {large,small} = cover;
  const file = req.file
  console.log(file);

  console.log(req.body)


  const createBorrowedBooks = {
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

  const borrowedBooks = db.get('borrowedBooks')
  let result = borrowedBooks.find({id : createBorrowedBooks.id});

  let book = result.value();

  if (book == null) {
      borrowedBooks.push(createBorrowedBooks).write();
  //    return;
  }

});



router.get('/borrowedBooks', (req, res) => {
    const borrowedBooks = db.get('borrowedBooks');
    res.send(borrowedBooks);
});


router.delete('/borrowedBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    const borrowedBooks = db.get('borrowedBooks');
    borrowedBooks.remove({ id: bookId }).write();
  
    db.write((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error'); 
      } else {
        res.sendStatus(204); 
      }
    });
  });
// const returnedBooks = db.get('returnedBooks')
// let result = returnedBooks.find({id : createReturnedBooks.id});
//  returnedBooks.push(createReturnedBooks).write();

module.exports = router;