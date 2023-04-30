import express from 'express';
import { RowDataPacket, OkPacket } from 'mysql2';
import { Request, Response } from 'express';
const router = express.Router();
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
import  authenticateToken from '../authToken';
import connection from '../database';

router.post('/boughtBooks',authenticateToken, jsonParser, (req: Request, res: Response) => {

    const {  cover, price, title, author, 
            pages, link, date, important, active,
            activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;
  
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

    connection.query(sql,[values], function(err, result:OkPacket | OkPacket[]){
      if (err) throw err;
        console.log("Records inserted !!!!!:", result);
    })

});


router.get('/boughtBooks',authenticateToken, (req: Request, res: Response) => {
    connection.query(
        "SELECT * FROM project_book.boughtbooks",
      (err, results: RowDataPacket[]) => {
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


router.delete('/boughtBooks/:id',authenticateToken, (req: Request, res: Response) => {
    const bookId = req.params.id;

    console.log("boughtBooks ID:", req.params.id)

    let sql = `DELETE FROM boughtbooks WHERE id = ${bookId}`;

    connection.query(sql, function(err, result){
      if (err) throw err;

        console.log("delete ID:::",result)
        res.send("BoughtBooks deleted successfully");
    })
});

export default router;