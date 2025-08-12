import { NextFunction, Request, Response } from "express";
import { InicioDeSesionDto } from "../dtos/inicioDeSesion.dto";

export class ClienteMiddleware {
    validarInicioDeSesion = async (req: Request, res: Response, next: NextFunction) => {
        const inicioDeSesionDto = new InicioDeSesionDto(req.body)
        const error = inicioDeSesionDto.getErrors()
        if (error)
            return res.status(400).json(error)
        next()
    }
}