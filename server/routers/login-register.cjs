require('dotenv').config()

const express = require("express");
const app = express();


const passport = require('passport');
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

const routerRegister = express.Router();

const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()



app.use(passport.initialize())
app.use(passport.session())

const { v4: uuidv4 } = require('uuid');


routerRegister.post('/register', jsonParser, async (req, res) => {
    try {

        const {registerUser, passwordUser} = req.body;

        const hashedPassword = await bcrypt.hash(passwordUser, 10)
        const userRegister = db.get('register');
        const existingUser = await userRegister.find(user => user.email === registerUser);
                                                   
       if(existingUser == !null ) {
                 res.send('User already exists with this login')
       } 
       
       else {
            userRegister.push({
                id: uuidv4(),
                email: registerUser,
                password: hashedPassword
            }).write();

            res.status(200).json("User registered")
            
       }         
    } catch(err) {
        res.json("User already exists")
    }
})


module.exports = routerRegister;
