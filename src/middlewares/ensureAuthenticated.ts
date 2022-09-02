import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"


export function ensureAuthenticated( req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({
            message: "Token de acesso não declarado."
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, "821356fa-3ac1-4e99-9570-3266c65d07b8")
        
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido."
        })
    }
}