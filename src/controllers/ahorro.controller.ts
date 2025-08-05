import { AhorroBl } from "../bl/deposito.bl"
import { DepositoDto, DepositoDtoIn, MovimientoDtoIn } from "../dtos/ahorro.dto"
import { Request, Response } from "express"
import { IdDto } from "../dtos/Id.dto"

export class AhorroController {
    private ahorroBl: AhorroBl

    constructor() {
        this.ahorroBl = new AhorroBl()
    }

    obtenerAsync = async (req: Request, res: Response) => {
        let clienteId
        let ahorros

        clienteId = req.params.clienteId
        ahorros = await this.ahorroBl.obtenerPorClienteIdAsync(clienteId)

        res.status(200).json(ahorros)
    }

    depositarAsync= async (req: Request, res: Response) => {
        let deposito = new MovimientoDtoIn(req.body)
        let depositoId = await this.ahorroBl.depositarAsync(req.params.ahorroId, deposito)
        let idDto = new IdDto("Datos registrados")
        idDto.encodedkey = deposito.encodedKey
        idDto.id = depositoId.toString()
        
        res.status(202).json(idDto)
    }

    retirarAsync(depositoId: string, movimiento: MovimientoDtoIn) {

    }
}