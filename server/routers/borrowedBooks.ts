import express, { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
const createError = require('http-errors')
const router = express.Router();
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
import  authenticateToken from '../authToken';
import connection from '../database';


router.post('/borrowedBooks',authenticateToken, jsonParser, (req: Request, res: Response) => {

  const { id, cover, price, title, author, 
          pages, link, date, important, active,
          activeReturnedBook,finishDate } = req.body;

  const {large,small} = cover;

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

    connection.query(sql,[values], function(err:any, result){
      if (err) throw err;
        console.log("borrowed results:", result);
        // console.log("records inserted:", result.affectedRows);
    })
});



router.get('/borrowedBooks', authenticateToken,  (req: Request, res: Response) => {
    connection.query(
      "SELECT * FROM project_book.borrowedbooks",
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
      // console.log("borroweDBooks:", updatedResults)
      res.send(updatedResults);
    });
});


router.put('/borrowedBooks/:id', authenticateToken, (req: Request, res: Response) => {
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
      // console.log("records inserted:", result.affectedRows);
      res.send(result);
  })

});


router.delete('/borrowedBooks/:id', authenticateToken, (req: Request, res: Response) => {
    const bookId = req.params.id;
  
    let sql = `DELETE FROM borrowedbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;
        // console.log("records deleted:", result.affectedRows);
        res.status(200).send("BorrowedBook deleted successfully");
    })

});

export default router;