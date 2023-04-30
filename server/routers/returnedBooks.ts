import { RowDataPacket } from 'mysql2';
import express from 'express';
const router = express.Router();
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
import  authenticateToken from '../authToken';
import connection from '../database';


router.post('/returnedBooks', authenticateToken, jsonParser, (req, res) => {

    const { id, cover, price, title, author, 
            pages, link, date, important, active,
            activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;

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
        console.log("records inserted:", result);
    })
});


router.get('/returnedBooks',authenticateToken, (req, res) => {
    connection.query(
      "SELECT * FROM project_book.returnedbooks",
    (err, results: RowDataPacket[]) => {
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


router.delete('/returnedBooks/:id',authenticateToken, (req, res) => {
    const bookId = req.params.id

    let sql = `DELETE FROM returnedbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;
        // console.log("records deleted:", result.affectedRows);
        res.send("ReturnedBooks deleted successfully");
    })
});

export default router;
