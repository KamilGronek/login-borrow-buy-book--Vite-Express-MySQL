require('dotenv').config()

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');

const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

const routerLogin = express.Router();

const routerRegister = express.Router();
// const routerPost = express.Router();

const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


// const initializePassport = require('../passport-config.cjs')

// const userLogin = db.get('register');
// console.log(userLogin)

// initializePassport(
//     passport, 
//     login =>  userLogin.find(user => user.login === login),
//     id =>     userLogin.find(user => user.id === id),
// )



// routerLogin.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))


//============================================================]

// const posts = [ 
//     {
//         username: 'Kyle',
//         title: 'Post 1'
//     },
//     {
//         username: 'Jim',
//         title: 'Post 2'
//     }
// ]

// routerPost.get('/posts', (req, res) => {
//     res.json(posts)
// })



// app.post('/login',jsonParser, (req, res) => {

// const username = req.body.username
//   const user = { name: username }

//   const accessToken = jwt.sign(user,
//   process.env.ACCESS_TOKEN_SECRET)
//   res.json( {accessToken: accessToken })
// })


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader.split()[1]
//     if (token == null) {
//         return res.sendStatus(401)
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if(err) {
//             return res.sendStatus(403)
//         } else{
//             req.user = user
//             next()
//         }
//     })
// }

// routerLogin.post('/login',jsonParser, (req, res) => {
//     console.log(req.body.loginUser);
      
// })


routerRegister.post('/register', jsonParser, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.passwordUser, 10)
        const userRegister = db.get('register');
        userRegister.push({
            id: Date.now().toString(),
            registerUser: req.body.registerUser,
            passwordUser: hashedPassword
            }).write();
            res.redirect('/login')
    } catch {
            res.redirect('/register')
    }
})

module.exports = routerLogin;
module.exports = routerRegister;
// module.exports = routerPost;