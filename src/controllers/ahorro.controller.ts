import { AhorroBl } from "../bl/ahorro.bl"
import { MovimientoDtoIn } from "../dtos/ahorro.dto"
import { Request, Response } from "express"
import { IdDto } from "../dtos/Id.dto"
import { TranferenciaPorSpeiDto } from "../dtos/transferenciaPorClabe.dto"
import { BanxicoService } from "../services/banxico.services"
import { SpeiOutDto } from "../dtos/spei.dto"

export class AhorroController {
    private ahorroBl: AhorroBl
    private banxicoService: BanxicoService

    constructor() {
        this.ahorroBl = new AhorroBl()
        this.banxicoService = new BanxicoService()
    }

    obtenerAsync = async (req: Request, res: Response) => {
        let clienteId
        let ahorros

        clienteId = req.params.clienteId
        ahorros = await this.ahorroBl.obtenerPorClienteIdAsync(clienteId)

        res.status(200).json(ahorros)
    }

    depositarAsync = async (req: Request, res: Response) => {
        let deposito = new MovimientoDtoIn(req.body)
        let depositoId = await this.ahorroBl.depositarAsync(req.params.ahorroId, deposito)
        let idDto = new IdDto("Datos registrados")
        idDto.encodedkey = deposito.encodedKey
        idDto.id = depositoId.toString()

        res.status(202).json(idDto)
    }

    retirarAsync(depositoId: string, movimiento: MovimientoDtoIn) {

    }

    transferirPorSpeiAsync = async (req: Request, res: Response) => {
        let transferencia
        let clabeInfoDto
        let ahorroDto        

        transferencia = new TranferenciaPorSpeiDto(req.body)
        //Verificamos que no sea una clabe propia
        if("009" == transferencia.clabeDestino.substring(0,3))
            return res.status(400).json({ mensaje: "Nel, clabe destino es de aqui, haga una tranferencia local" })
        
        //Verificar la existencia de la clabe
        clabeInfoDto = await this.banxicoService.obtenerClabeInfoAsync(transferencia.clabeDestino)
        if (clabeInfoDto == null)
            return res.status(400).json({ mensaje: "Nel, clabe destino no encontrada" })

        // Se verifica que cuente con saldo
        ahorroDto = await this.ahorroBl.obtenerPorIdAsync(req.params.ahorroId)
        console.log(ahorroDto)
        if (transferencia.monto > Number(ahorroDto.total))
            return res.status(400).json({ mensaje: "Ni camarón tienes carnal" })        

        //Se pide la tranferencia a banxico
        const data = await this.ahorroBl.trasferirPorSpeiAsync(transferencia, clabeInfoDto.banco, ahorroDto.clabe, ahorroDto.clienteGuid + "")

        res.status(201).json(transferencia)
    }
}