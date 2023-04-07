// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

require('dotenv').config()

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');

const connection = require('./database.cjs')

app.use(express.json())
const cors = require("cors");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
const data = require("./db.json");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

app.use(
  cors({
    origin: "http://127.0.0.1:5173"
  })
)

const routesBorrowdBooks = require('./routers/borrowedBooks.cjs');
const routesReturnedBooks = require('./routers/returnedBooks.cjs');
const routesBoughtBooks = require('./routers/boughtBooks.cjs');
const routerRegister = require('./routers/login-register.cjs');


app.use('/',
  routesBorrowdBooks,
  routesReturnedBooks,
  routesBoughtBooks,
  routerRegister,
);



// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/books', (req,res) => {
  connection.query(
    "SELECT * FROM project_book.books",
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



// app.get('/books', (req, res) => {
//   res.send(data.books);
// });



// app.delete('/books/:id', jsonParser, (req, res) => {
//   const bookId = req.params.id

//   const deleteBook = db.get('books');
//   const bookToDelete = deleteBook.find({ id: bookId });
//   deleteBook.remove(bookToDelete).write();

// });

app.post('/books', upload.single('image'), jsonParser, (req, res) => {
    const { id, cover, price, title, author, 
        pages, link, date, important, active,
        activeReturnedBook,finishDate } = req.body;

    const {large,small} = cover;
    const file = req.file
    console.log(file);


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
        console.log("records inserted:", result.affectedRows);
    })


    // const book = db.get('books')
    // returnedBooks.find({id : createItemsdBooks.id}).value();
    // book.push(createItemsdBooks).write();
})

app.delete('/books/:id', jsonParser, (req, res) => {
    // const bookId = req.params.id;

    let sql = `DELETE FROM books WHERE id = ${req.params.id}`;

    connection.query(sql, function(err, result){
      if (err) throw err;
        console.log("records deleted:", result.affectedRows);
        res.send("Book deleted successfully");
    })


})



app.listen(4000, () => {
    console.log('Server is running on port 4000');
    connection.connect(function(err){
      if(err) throw err;
      console.log('Database connected!');
    })
});

