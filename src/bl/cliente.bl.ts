import { ClienteDtoIn } from "../dtos/cliente.dto";
import { IdDto } from "../dtos/Id.dto";
import { DepositoEntity } from "../entities/deposito.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { DepositoRepository } from "../repositories/deposito.repository";

export class ClienteBl {
    private clienteRepository: ClienteRepository
    private depositoRepository: DepositoRepository

    constructor() {
        this.clienteRepository = new ClienteRepository()
        this.depositoRepository = new DepositoRepository()
    }

    async agregarAsync(cliente: ClienteDtoIn): Promise<number> {
        let clienteId
        let deposito = new DepositoEntity()

        clienteId = await this.clienteRepository.agregarAsync(cliente.toEntity())        
        deposito.clienteId = clienteId
        deposito.clienteGuid = cliente.guid
        deposito.nombre = "Ahorro chido"
        await this.depositoRepository.agregarAsync(deposito)
        //Generar la clabe

        return clienteId
    }
}