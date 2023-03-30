
const express = require("express");
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
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
  // console.log(file);

  // console.log(req.body)


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



router.get('/borrowedBooks', authenticateToken,  (req, res) => {
    const borrowedBooks = db.get('borrowedBooks');
    res.send(borrowedBooks);
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({warning:'No token provided'})
  }
  
    console.log("token getting m: ", token);
    console.log("token getting secret -", process.env.ACCESS_TOKEN_SECRET);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    console.log("Show error:", err)
    console.log("Token !!!!:", token)
      if (err){
        console.log('Error verifying JWT:', err);
        res.status(401).json({ warning: 'Invalid token',code: "EXPIRED"}); // expired

        // const message = err.name === 'JsonWebTokenError' ?(
        //   'Unauthirized' ): (
        //     err.message)
        //  return next(createError.Unauthorized(message)) 
      }

    // if(err.name === "TokenEpiredError"){
    //   res.status(403).json({ warning: 'Token expired' })
    // }
   
      req.user = user;
      console.log("dane4000:", user)
    next()
  })
}




router.delete('/borrowedBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    const borrowedBooks = db.get('borrowedBooks');
    borrowedBooks.remove({ id: bookId }).write();
  
    // db.write((err) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send('Internal server error'); 
    //   } else {
    //     res.sendStatus(204); 
    //   }
    // });
  });
// const returnedBooks = db.get('returnedBooks')
// let result = returnedBooks.find({id : createReturnedBooks.id});
//  returnedBooks.push(createReturnedBooks).write();

module.exports = router;