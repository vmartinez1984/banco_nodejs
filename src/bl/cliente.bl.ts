import { ClienteDtoIn } from "../dtos/cliente.dto";
import { IdDto } from "../dtos/Id.dto";
import { SolicitudDeCurp } from "../dtos/solicitudDeCurp.dto";
import { AhorroEntity } from "../entities/ahorro.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { DepositoRepository } from "../repositories/deposito.repository";
import { CurpService } from "../services/curp.services";

export class ClienteBl {
    private clienteRepository: ClienteRepository
    private depositoRepository: DepositoRepository
    private curpService: CurpService

    constructor() {
        this.clienteRepository = new ClienteRepository()
        this.depositoRepository = new DepositoRepository()
        this.curpService = new CurpService()
    }

    async agregarAsync(cliente: ClienteDtoIn): Promise<number> {
        let clienteId =0
        let solicitudDeCurp
        let curp
        // let deposito = new AhorroEntity()

        // clienteId = await this.clienteRepository.agregarAsync(cliente.toEntity())        
        // deposito.clienteId = clienteId
        // deposito.clienteGuid = cliente.guid
        // deposito.nombre = "Ahorro chido"
        // await this.depositoRepository.agregarAsync(deposito)
        //Obtener el curp
        solicitudDeCurp = this.obtenerSolicitudDeCurp(cliente)
        curp = await this.curpService.generarCurp(solicitudDeCurp)
        //Generar la clabe

        return clienteId
    }

    private obtenerSolicitudDeCurp(cliente: ClienteDtoIn): SolicitudDeCurp{
        let solicitudDeCurp: SolicitudDeCurp = {
            estado: cliente.estadoDeNacimiento,
            fechaDeNacimiento: cliente.fechaDeNacimiento,
            nombres : cliente.nombre,
            primerApellido: cliente.primerApellido,
            segundoApellido: cliente.segundoApellido,
            sexo : cliente.sexo
        }

        return solicitudDeCurp
    }
}