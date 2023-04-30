// require('dotenv').config();
import { RowDataPacket } from 'mysql2';

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import express from 'express';
const app = express()
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
app.use(express.json())
const router = express.Router();
import authenticateToken from '../authToken';
import connection from '../database';


let refreshTokens: string[] = []

router.post('/token', (req: Request, res: Response) => {
  const refreshToken = req.body.token
  if (refreshToken == null) {
    return res.status(401).json({warming:'You are not authenticated'});
  }
  if (!refreshTokens.includes(refreshToken as string)){
    return res.status(403).json({warming:'Refresh token is not valid!'});
  } 
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})



router.delete('/logout',authenticateToken, (req: Request, res: Response) => {

if(refreshTokens = refreshTokens.filter((token: string) => token !== req.body.token)){
   res.status(200).send({ info: "User logged out"}) 
}
else{
    console.log("Token expired!!:")
    res.status(401).send({ error: "Token expired" });
}

 
  // if (err){
  //   console.log('Error verifying JWT:', err);
  //   res.status(401).send({ error: "Token has expired or is invalid" });
  //   return;
// }

  // if (refreshTokens.includes(req.body.token)) {
  //     refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  //     res.send({ info: "User logged out"}) 
  // }else {
  //   console.log("TokenExpired!!!!!")
  //   res.status(401).send({ error: "Token has expired or is invalid" });
  // }
})


router.post('/login' ,(req, res) => {
 
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
    }else if (!Array.isArray(result) || result.length == 0){
        res.status(401).send({warning:'User with this email does not exist'})
    }else{
      const userFromDb = result[0] as RowDataPacket;
      bcrypt.compare(user.password, userFromDb.password, (err, isMatch) =>{
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



function generateAccessToken(user: any) {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '60m' })
  return token;
}

function generateRefreshToken(user: any) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)
  return refreshToken;
}

export default router;
