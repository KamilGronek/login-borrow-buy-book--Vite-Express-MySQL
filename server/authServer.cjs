require('dotenv').config()

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


let refreshTokens = []  // table

app.post('/token', (req, res) => {
  const refreshToken = req.body.token

  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User


  const { loginUser,passwordUser } = req.body;

  // const username = req.body.username
  console.log(req.body.loginUser);
  console.log(req.body.passwordUser);
  // const user = { name: username }

  const user = { 
    registerUser: loginUser, 
    passwordUser: passwordUser
  }

  const accessToken = generateAccessToken(user)

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  refreshTokens.push(refreshToken)
  
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
}



app.listen(5000)