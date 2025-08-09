import {Request, Response } from "express";
import { SpeiUpdDto } from "../dtos/spei.dto";

export class SpeiController{
    actualizarEstadoDelSpei = async (req: Request, res: Response)=>{
        let speiUpdDto = new SpeiUpdDto(req.body)
        console.log(speiUpdDto)

        res.status(201)
    }
}