// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

require('dotenv').config()


const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

const cors = require("cors");
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
const routerLogin = require('./routers/login-register.cjs');
const routerRegister = require('./routers/login-register.cjs');
const routergetPosts = require('./routers/getPosts.cjs');


app.use('/',
  routesBorrowdBooks,
  routesReturnedBooks,
  routesBoughtBooks,
  routerLogin,
  routerRegister,
  routergetPosts
  );


// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// const posts = [ 
//   {
//       username: 'Kyle',
//       title: 'Post 1'
//   },
//   {
//       username: 'Jim',
//       title: 'Post 2'
//   }
// ]

// app.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
// })



// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split('')[1]
//     if (token == null)  return res.sendStatus(401)
       
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err)  return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }


app.get('/books', (req, res) => {
    res.send(data.books);
});

// app.delete('/books/:id', jsonParser, (req, res) => {
//   const bookId = req.params.id

//   const deleteBook = db.get('books');
//   const bookToDelete = deleteBook.find({ id: bookId });
//   deleteBook.remove(bookToDelete).write();

// });

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




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

