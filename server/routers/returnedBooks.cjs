const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
let jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken')
const connection = require('../database.cjs')




router.post('/returnedBooks', authenticateToken, upload.single('image'), jsonParser, (req, res) => {

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

  
    let sql = "INSERT INTO returnedbooks(id, cover, price, title, author, pages, link,date, important,active, activeReturnedBook,finishDate) VALUES ?";
    let values = [ 
      [ createReturnedBooks.id, 
        JSON.stringify(createReturnedBooks.cover), 
        createReturnedBooks.price, 
        createReturnedBooks.title, 
        createReturnedBooks.author, 
        createReturnedBooks.pages, 
        createReturnedBooks.link, 
        createReturnedBooks.date, 
        createReturnedBooks.important, 
        createReturnedBooks.active, 
        createReturnedBooks.activeReturnedBook,
        createReturnedBooks.finishDate ]
    ];

    connection.query(sql,[values], function(err, result){
      if (err) throw err;
        console.log("records inserted:", result.affectedRows);
    })
});


router.get('/returnedBooks',authenticateToken, (req, res) => {
    connection.query(
      "SELECT * FROM project_book.returnedbooks",
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

       console.log("borrowedBooooooks:",updatedResults)
      res.send(updatedResults);
    });


});


router.delete('/returnedBooks/:id', (req, res) => {
    const bookId = req.params.id

    let sql = `DELETE FROM returnedbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;
        console.log("records deleted:", result.affectedRows);
        res.send("ReturnedBooks deleted successfully");
    })
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
      return res.status(401).json({warning:'No token provided'})
  
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    if(err){
          console.log('Error verifying JWT:', err);
          res.status(401).json({ warning: 'Invalid token',code: "EXPIRED"
          }); 
    }
    req.user = user;
  next()
  })
}

module.exports = router;
