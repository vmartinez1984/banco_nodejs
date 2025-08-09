import { AhorroDto, MovimientoDtoIn } from "../dtos/ahorro.dto";
import { SpeiOutDto } from "../dtos/spei.dto";
import { TranferenciaPorSpeiDto } from "../dtos/transferenciaPorClabe.dto";
import { MovimientoEntity } from "../entities/movimiento.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { DepositoRepository } from "../repositories/deposito.repository";
import { MovimientoRepository } from "../repositories/movimiento.repository";
import { BanxicoService } from "../services/banxico.services";

export class AhorroBl {

    async trasferirPorSpeiAsync(transferencia: TranferenciaPorSpeiDto, bancoDestino: string, clabeDeOrigen: string, clienteGuid: string) {
        let spei: SpeiOutDto

        const clienteEntity = await this.clienteRepository.obtenerPorIdAsync(clienteGuid)
        spei = {
            clabeDestino: transferencia.clabeDestino,
            bancoDestino: bancoDestino,
            bancoOrdenante: "Banobras",
            clabeDeOrigen: clabeDeOrigen,
            concepto: transferencia.concepto,
            encodedKey: transferencia.encodedkey,
            monto: transferencia.monto,
            nombreDelBeneficiario: transferencia.nombreDelBenificiario,
            nombreDelOrdente: clienteEntity.nombre + " " + clienteEntity.primerApellido + " " + clienteEntity.segundoApellido,
            referencia: transferencia.referencia,
        }
        console.log("SpeiOutDto",spei)
        //await this.banxicoService.SpeiOutAsync(spei)
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

    async obtenerPorClienteIdAsync(clienteId: string): Promise<AhorroDto[]> {
        let depositos: AhorroDto[] = []
        let entities

        entities = await this.ahorroRepository.obtenerPorClienteIdAsync(clienteId)
        //console.log(entities)
        entities.forEach(item => {
            depositos.push(new AhorroDto(
                item.id,
                item.clabe,
                item.nombre,
                item.clienteGuid,
                Number(item.total)
            ))
        })

        return depositos
    }

    async obtenerPorIdAsync(depositoId: string): Promise<AhorroDto> {
        let ahorroEntity

        ahorroEntity = await this.ahorroRepository.obtenerPorIdAsync(depositoId)
        //console.log(ahorroEntity)

        return new AhorroDto(ahorroEntity.id, ahorroEntity.clabe, ahorroEntity.nombre, ahorroEntity.clienteGuid, ahorroEntity.total)
    }

    async depositarAsync(ahorroId: string, deposito: MovimientoDtoIn): Promise<number> {
        let ahorro = await this.ahorroRepository.obtenerPorIdAsync(ahorroId)
        let movimientoEntity: MovimientoEntity = {
            canalEncodedkey: "cash",
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

    private ahorroRepository: DepositoRepository
    private movimientoRepository: MovimientoRepository
    private banxicoService: BanxicoService
    private clienteRepository: ClienteRepository

    constructor() {
        this.ahorroRepository = new DepositoRepository()
        this.movimientoRepository = new MovimientoRepository()
        this.banxicoService = new BanxicoService()
        this.clienteRepository = new ClienteRepository()
    }

}