require('dotenv').config()
import express, { Request, Response } from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json()
import connection from '../database';
const { v4: uuidv4 } = require('uuid');

router.post('/register', jsonParser, async (req: Request, res: Response) => {
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
    } else if (!Array.isArray(result) || result.length > 0) {
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
})

export default router;




