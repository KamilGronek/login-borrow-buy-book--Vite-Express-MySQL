require('dotenv').config()
const bcrypt = require('bcrypt');
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5173"
  })
)

const connection = require('./database.cjs')


let refreshTokens = [] 

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) {
    return res.status(401).json({warming:'You are not authenticated'});
  }
  if (!refreshTokens.includes(refreshToken)){
    return res.status(403).json({warming:'Refresh token is not valid!'});
  } 
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})



app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.send({ info: "User logged out"}) 
})


app.post('/login', async (req, res) => {
 
  const { loginUser,passwordUser } = req.body;

  const user = { 
    email:loginUser, 
    password:passwordUser
  }

  const sqlCheck = 'SELECT * FROM register WHERE email = ?';


  connection.query(sqlCheck, [user.email], (err, result) => {
    if(err){
      console.log(err);
      res.status(500).send('Error checking user');
    }else if(result.length == 0){
      console.log("result Login:",result)
        res.status(401).send({warning:'User with this email does not exist'})
    }else{
      bcrypt.compare(user.password, result[0].password, (err, isMatch) =>{
        if (err) {
          console.log(err);
          res.status(500).send('Error comparing passwords');
        } else if (!isMatch) {
          res.status(401).send({ warning: 'Incorrect password' });
        }else{ 
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user)
          refreshTokens.push(refreshToken)
          res.json({ accessToken: accessToken, refreshToken: refreshToken, info: "User is logged"});
        } 
      });
    }
  });
});



function generateAccessToken(user) {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
  return token;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  return refreshToken;
}

app.listen(5000)
