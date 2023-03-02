require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const router = express.Router();
app.use(express.json())

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../db.json');
const db = low(adapter);

// const posts = [
//   {
//     username: 'Kyle',
//     title: 'Post 1'
//   },
//   {
//     username: 'Jim',
//     title: 'Post 2'
//   }
// ]


router.get('/register', authenticateToken, (req, res) => {
    // console.log(req.user)
    const registerArray = db.get('register')

  res.json(registerArray.filter(register => register.registerUser === req.user))
})


// router.get('/posts', authenticateToken, (req, res) => {
//     res.json()
//   res.json(posts.filter(post => post.username === req.user.name))
// })

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = router;