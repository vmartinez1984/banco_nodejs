import { DepositoBl } from "../bl/deposito.bl"
import { DepositoDto, MovimientoDtoIn } from "../dtos/deposito.dto"
import { Request, Response } from "express"

export class DepositoController {
    private depositoBl: DepositoBl

    constructor() {
        this.depositoBl = new DepositoBl()
    }

    obtenerAsync = async (req: Request, res: Response) => {
        let clienteId
        let depositos

        clienteId = req.params.clienteId
        depositos = await this.depositoBl.obtenerPorClienteIdAsync(clienteId)

        res.status(200).json(depositos)
    }

    depositarAsync(depositoId: string, movimiento: MovimientoDtoIn) {

    }

    retirarAsync(depositoId: string, movimiento: MovimientoDtoIn) {

    }
}