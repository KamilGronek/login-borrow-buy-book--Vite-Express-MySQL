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

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);


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

try { 
  
  const user = { 
     loginUser, 
     passwordUser
  }

  const userRegister = db.get('register')

  console.log("userRegister:::", userRegister);

  const existingUser = await userRegister
  .find({ email: user.loginUser , password: user.passwordUser}).value();
  
  console.log("existingUser 5000:::", existingUser);


  if(existingUser == undefined ) {
     return  res.status(401).json({warning:'User with this email does not exist'})
  }

  else{
      const accessToken = generateAccessToken(user);
      console.log("accessToken 5000:::::", accessToken)

      const refreshToken = generateRefreshToken(user)

      refreshTokens.push(refreshToken)
      
      res.json({ accessToken: accessToken, refreshToken: refreshToken, info: "User is logged"})
  }

  } catch(err) {
    res.send("User undefined") 
  }

})

function generateAccessToken(user) {

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
  return token;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  return refreshToken;
}

app.listen(5000)
