const express = require("express");
const app = express();

const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

const routerLogin = express.Router();
const routerRegister = express.Router();

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


const initializePassport = require('../passport-config.cjs')

const userLogin = db.get('register');
console.log(userLogin)

initializePassport(
    passport, 
    login =>  userLogin.find(user => user.login === login),
    id =>     userLogin.find(user => user.id === id),
)


routerLogin.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


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