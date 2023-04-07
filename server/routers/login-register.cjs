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

const connection = require('../database.cjs')


app.use(passport.initialize())
app.use(passport.session())

const { v4: uuidv4 } = require('uuid');


routerRegister.post('/register', jsonParser, async (req, res) => {
    const {registerUser, passwordUser} = req.body;

    const hashedPassword = await bcrypt.hash(passwordUser, 10)

    const newRegister = {
        id: uuidv4(),
        email: registerUser,
        password: hashedPassword
    }

    const sqlCheck = 'SELECT * FROM register WHERE email = ?';

    connection.query(sqlCheck, [registerUser], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send('Error checking user');
    } else if (result.length > 0) {
        res.status(400).send('User already exists with this email');
    } else {
        const sqlInsert = 'INSERT INTO register (id, email, password) VALUES (?, ?, ?)';

        const values = [
            newRegister.id, 
            newRegister.email, 
            newRegister.password
        ];
        
        connection.query(sqlInsert, values, (err, result) => {
            if (err) {
            console.log(err);
            res.status(500).send('Error adding user');
            } else {
            console.log('User added successfully');
            res.status(200).send('User added successfully');
            }
        });
    }
  });


    // try {
    //     const {registerUser, passwordUser} = req.body;

    //     const hashedPassword = await bcrypt.hash(passwordUser, 10)

        // const userRegister = db.get('register');
    //     const existingUser = await userRegister.find(user => user.email === registerUser);
                                                   
    //    if(existingUser == !null ) {
    //              res.send('User already exists with this login')
    //    } 
       
    //    else {
    //         userRegister.push({
    //             id: uuidv4(),
    //             email: registerUser,
    //             password: hashedPassword
    //         }).write();

    //         res.status(200).json("User registered")
            
    //    }         
    // } catch(err) {
    //     res.json("User already exists")
    // }
    })


module.exports = routerRegister;
