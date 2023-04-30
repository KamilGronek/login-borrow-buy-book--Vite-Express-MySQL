import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction  } from 'express';

interface UserRequest extends Request {
    user?: any;
}

function authenticateToken(req: UserRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({warning:'No token provided'})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        console.log("Show error:", err)
        console.log("Token !!!!:", token)

        if (err){
            console.log('Error verifying JWT:', err);
            res.status(401).json({ warning: 'Invalid token', code: "EXPIRED" });
            return;
        }
        req.user = user;
        console.log("dane4000 authToken:", user)
         next();
    })
}

export default authenticateToken;