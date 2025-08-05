import { DepositoDto, DepositoDtoIn, MovimientoDtoIn } from "../dtos/ahorro.dto";
import { AhorroEntity } from "../entities/ahorro.entity";
import { MovimientoEntity } from "../entities/movimiento.entity";
import { DepositoRepository } from "../repositories/deposito.repository";
import { MovimientoRepository } from "../repositories/movimiento.repository";
import { ClabeService } from "../services/clabe.services";

export class AhorroBl {
    private ahorroRepository: DepositoRepository
    private movimientoRepository: MovimientoRepository
    private clabeService: ClabeService

    constructor() {
        this.ahorroRepository = new DepositoRepository()
        this.movimientoRepository = new MovimientoRepository()
        this.clabeService = new ClabeService()
    }

    // agregarAsync(deposito: DepositoDtoIn): number {
    //     let depositoId
    //     let depositoEntity : DepositoEntity = {
    //         clienteGuid : deposito.clienteGuid,
    //         clabe: ''
    //     }
    //     depositoId = this.depositoRepository.agregarAsync(depositoEntity)
    //     depositoEntity.clabe = this.clabeService.obtenerClabeAsync(depositoId.toString())
    //     this.depositoRepository.actualizarAsync(depositoEntity)

    //     return 0
    // }

    async obtenerPorClienteIdAsync(clienteId: string): Promise<DepositoDto[]> {
        let depositos: DepositoDto[] = []
        let entities

        entities = await this.ahorroRepository.obtenerPorClienteIdAsync(clienteId)
        //console.log(entities)
        entities.forEach(item => {           
            depositos.push(new DepositoDto(
                item.id,
                item.nombre,
                item.clienteGuid,
                item.total                
            ))
        })

        return depositos
    }

    obtenerPorIdAsync(depositoId: string): DepositoDto {
        let deposito: DepositoDto = {
            clienteGuid: "",
            nombre: "",
            numeroDeCuenta: "",
            total: 0
        }

        return deposito
    }

    async depositarAsync(ahorroId: string, deposito: MovimientoDtoIn): Promise<number> {
        let ahorro = await this.ahorroRepository.obtenerPorIdAsync(ahorroId)
        let movimientoEntity : MovimientoEntity ={
            canalEncodedkey : "cash",
            cantidad: deposito.cantidad,
            cantidadInicial: ahorro.total,
            cantidadFinal: ahorro.total + deposito.cantidad,
            concepto: deposito.concepto,
            depositoEncodedKey: ahorro.guid,
            depositoId: ahorro.id,
            encodedKey: deposito.encodedKey,
            referencia: deposito.referencia,
            tipo: "deposito",
            id: 0
        }
        ahorro.total = movimientoEntity.cantidadFinal
        await this.ahorroRepository.actualizarAsync(ahorro)
        let movimientoId = await this.movimientoRepository.agregarAsync(movimientoEntity)

        return movimientoId
    }

    retirarAsync(depositoId: string, deposito: MovimientoDtoIn): number {
        return 0
    }
}