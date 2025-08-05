import { DepositoDto, DepositoDtoIn, MovimientoDtoIn } from "../dtos/deposito.dto";
import { DepositoEntity } from "../entities/deposito.entity";
import { DepositoRepository } from "../repositories/deposito.repository";
import { ClabeService } from "../services/clabe.services";

export class DepositoBl {
    private depositoRepository: DepositoRepository
    private clabeService: ClabeService

    constructor(){
        this.depositoRepository = new DepositoRepository()
        this.clabeService = new ClabeService()
    }

    agregarAsync(deposito: DepositoDtoIn): number {
        let depositoId
        let depositoEntity : DepositoEntity = {
            clienteGuid : deposito.clienteGuid,
            clabe: ''
        }
        depositoId = this.depositoRepository.agregarAsync(depositoEntity)
        depositoEntity.clabe = this.clabeService.obtenerClabeAsync(depositoId.toString())
        this.depositoRepository.actualizarAsync(depositoEntity)
        
        return 0
    }

    obtenerPorClienteIdAsync(clienteId: string): DepositoDto[] {
        let depositos: DepositoDto[] = []

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

    depositarAsync(depositoId: string, deposito: MovimientoDtoIn): number {
        return 0
    }

    retirarAsync(depositoId: string, deposito: MovimientoDtoIn): number {
        return 0
    }
}