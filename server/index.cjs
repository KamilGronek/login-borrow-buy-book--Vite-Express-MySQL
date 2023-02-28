if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./db.json");
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

app.use(
  cors({
    origin: "http://127.0.0.1:5173"
  })
)

const routesReturnedBooks = require('./routers/returnedBooks.cjs');
const routesBoughtBooks = require('./routers/boughtBooks.cjs');
const routerLogin = require('./routers/login-register.cjs');
const routerRegister = require('./routers/login-register.cjs');

app.use('/', routesReturnedBooks, routesBoughtBooks,routerLogin, routerRegister);


// var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/books', (req, res) => {
    res.send(data.books);
});

app.post('/books', (res, req) => {
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

    const book = db.get('books')
    // returnedBooks.find({id : createItemsdBooks.id}).value();
    book.push(createItemsdBooks).write();
})


app.get('/borrowedBooks', (req, res) => {
    const borrowedBooks = db.get('borrowedBooks');
    res.send(borrowedBooks);
});


app.delete('/borrowedBooks/:id', (req, res) => {
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



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

