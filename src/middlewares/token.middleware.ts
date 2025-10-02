import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken"
import { secret } from "../helpers/config"

export class TokenMiddleware {

    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        const header = req.header("Authorization") || ""
        const token = header.split(" ")[1]
        if (!token) {
            return res.status(401).json({ message: "Token not provied" });
        }
        try {
            const payload = Jwt.verify(token, secret);
            //console.log("payload", payload)
            (req as any).user = payload
            next()
        } catch (error) {
            return res.status(403).json({ message: "Token not valid" });
        }
    }
}