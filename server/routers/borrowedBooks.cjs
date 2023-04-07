
const express = require("express");
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
let jsonParser = bodyParser.json()

const connection = require('../database.cjs')

router.post('/borrowedBooks', authenticateToken, upload.single('image'), jsonParser, (req, res) => {

  const { id, cover, price, title, author, 
          pages, link, date, important, active,
          activeReturnedBook,finishDate } = req.body;

  const {large,small} = cover;

  console.log("COVER:",cover)

  console.log("BOOKS_COVER:", req.body.cover);

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

  let sql = "INSERT INTO borrowedbooks(id, cover, price, title, author, pages, link,date, important,active, activeReturnedBook,finishDate) VALUES ?";
    let values = [ 
      [ 
        createBorrowedBooks.id, 
        JSON.stringify(createBorrowedBooks.cover), 
        createBorrowedBooks.price, 
        createBorrowedBooks.title, 
        createBorrowedBooks.author, 
        createBorrowedBooks.pages, 
        createBorrowedBooks.link, 
        createBorrowedBooks.date, 
        createBorrowedBooks.important, 
        createBorrowedBooks.active, 
        createBorrowedBooks.activeReturnedBook,
        createBorrowedBooks.finishDate 
      ]
    ];

    connection.query(sql,[values], function(err, result){
      if (err) throw err;
        console.log("borrowed results:", result);
        console.log("records inserted:", result.affectedRows);
    })
});



router.get('/borrowedBooks', authenticateToken, (req, res) => {
    connection.query(
      "SELECT * FROM project_book.borrowedbooks",
    (err, results) => {
      if (err) {
        console.log(err)
      } 

      const updatedResults = results.map(book => {
        return {
          ...book,
          cover: JSON.parse(book.cover)
        };
      });
      res.send(updatedResults);
    });
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


router.put('/borrowedBooks/:id' , (req,res) => {
  const bookId = req.params.id;

  const { id, cover, price, title, author, 
    pages, link, date, important, active,
    activeReturnedBook,finishDate } = req.body;

  const {large,small} = cover;

  const updateBorrowedBooks = {
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


  let sql = `UPDATE borrowedbooks SET price = ${price} WHERE id = ${bookId}`;

  let values = [ 
    [ updateBorrowedBooks.id, 
      JSON.stringify(updateBorrowedBooks.cover), 
      updateBorrowedBooks.price, 
      updateBorrowedBooks.title, 
      updateBorrowedBooks.author, 
      updateBorrowedBooks.pages, 
      updateBorrowedBooks.link, 
      updateBorrowedBooks.date, 
      updateBorrowedBooks.important, 
      updateBorrowedBooks.active, 
      updateBorrowedBooks.activeReturnedBook,
      updateBorrowedBooks.finishDate ]
  ];

  connection.query(sql,[values], function(err, result){
    if (err) throw err;
      console.log("records inserted:", result.affectedRows);
      res.send(result);
  })

});


router.delete('/borrowedBooks/:id', (req, res) => {
    const bookId = req.params.id;
  
    let sql = `DELETE FROM borrowedbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;
        console.log("records deleted:", result.affectedRows);
        res.send("BorrowedBook deleted successfully");
    })

});

module.exports = router;