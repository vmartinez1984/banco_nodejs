import {Request, Response } from "express";
import { SpeiUpdDto } from "../dtos/spei.dto";
import { AhorroBl } from "../bl/ahorro.bl";

export class SpeiController{
    private ahorroBl: AhorroBl

    constructor() {
        this.ahorroBl = new AhorroBl()
    }

    actualizarEstadoDelSpei = async (req: Request, res: Response)=>{
        let speiUpdDto = new SpeiUpdDto(req.body)
        console.log(speiUpdDto)
        await this.ahorroBl.actualizarEstadoDelSpeiAsync(speiUpdDto)

        res.status(201).json({mendajse: "Estado del SPEI actualizado"})
    }
}