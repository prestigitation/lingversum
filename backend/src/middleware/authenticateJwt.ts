import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; 

export default function authenticateJwt(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        
        if (err) return response.sendStatus(403);

        request.user = user

        next()
    })
}