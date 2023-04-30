require('dotenv').config()

import express from 'express';
const app = express();
app.use(express.json())
import cors from 'cors';
import connection from './database';


app.use(
  cors({
    origin: "http://127.0.0.1:5173"
  })
)

import routesBorrowedBooks from './routers/borrowedBooks';
import routesReturnedBooks from './routers/returnedBooks';
import routesBoughtBooks  from './routers/boughtBooks';
import routerRegister from './routers/register';
import routerLogin from './routers/login';
import routerBooks from './routers/books';


app.use('/',
  routesBorrowedBooks,
  routesReturnedBooks,
  routesBoughtBooks,
  routerRegister,
  routerLogin,
  routerBooks
);


app.listen(4000, () => {
    console.log('Server is running on port 4000');
    connection.connect(function(err:any){
      if(err) throw err;
      console.log('Database connected!');
    })
});