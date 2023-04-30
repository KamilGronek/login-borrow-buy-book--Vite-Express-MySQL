import express, { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
const router = express.Router();
import  authenticateToken from '../authToken';
import connection from '../database';


router.get('/books', authenticateToken, (req: Request, res: Response) => {
    connection.query(
      "SELECT * FROM project_book.books",
    (err, results: RowDataPacket[] ) => {
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
  
  
router.post('/books', authenticateToken, (req, res) => {
    const { id, cover, price, title, author, 
        pages, link, date, important, active,
        activeReturnedBook,finishDate } = req.body;
  
    const {large,small} = cover;
  
    const createItemsdBooks = {
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

    let sql = "INSERT INTO books(id, cover, price, title, author, pages, link,date, important,active, activeReturnedBook,finishDate) VALUES ?";
    let values = [ 
      [ createItemsdBooks.id, 
        JSON.stringify(createItemsdBooks.cover), 
        createItemsdBooks.price, 
        createItemsdBooks.title, 
        createItemsdBooks.author, 
        createItemsdBooks.pages, 
        createItemsdBooks.link, 
        createItemsdBooks.date, 
        createItemsdBooks.important, 
        createItemsdBooks.active, 
        createItemsdBooks.activeReturnedBook,
        createItemsdBooks.finishDate ]
    ];
  
      connection.query(sql,[values], function(err, result){
        if (err) throw err;
          console.log("records inserted:", result);
      })
})
  
  
router.delete('/books/:id', authenticateToken, (req, res) => {
      const bookId = req.params.id;
  
      let sql = `DELETE FROM books WHERE id = ${bookId}`;
  
      connection.query(sql, function(err, result){
        if (err) throw err;
          console.log("records deleted:", result);
          res.send("Book deleted successfully");
      })
})
  
export default router;