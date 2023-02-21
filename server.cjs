const express = require("express");
const cors = require("cors");
const app = express();
const data = require("./db.json");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


app.use(
  cors({
    origin: "http://127.0.0.1:5173"
  })
)


var jsonParser = bodyParser.json()
 

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/books', (req, res) => {
    res.send(data.books);
});

// app.post('/books', (res, req) => {



//     res.send(data.books)
// })


app.get('/borrowedBooks', (req, res) => {
    res.send(data.borrowedBooks);
});

app.delete('/borrowedBooks/:id', (req, res) => {
    const bookId = req.params.id
    const borrowedBooks = db.get('borrowedBooks');

    borrowedBooks.remove({ id: bookId }).write();
    // res.send(`Szczegóły użytkownika o id ${userId}`);
});




const adapter = new FileSync('./db.json');
const db = low(adapter);


app.post('/returnedBooks', jsonParser, (req, res) => {

    // console.log(req)
    console.log(req.body)

    const {id, large,small, price, title, author, 
           pages, link, date, important, active,
           activeReturnedBook,finishDate } = req.body;
    
    const createReturnedBooks = {
        id:  id,
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

    const returnedBooks = db.get('returnedBooks')
    returnedBooks.push(createReturnedBooks).write();


});


app.get('/returnedBooks', (req, res) => {
    res.send(data.returnedBooks);
});



app.delete('/returnedBooks/:id', (req, res) => {
    const userId = req.params.id
    res.send(userId);
});


app.get('/boughtBooks', (req, res) => {
    res.send(data.boughtBooks);
});

app.delete(`/boughtBooks/:id`, (req, res) => {
    const userId = req.params.id

    res.send(userId);
});




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

