import { ClienteDtoIn } from "../dtos/cliente.dto";
import { IdDto } from "../dtos/Id.dto";
import { SolicitudDeCurp } from "../dtos/solicitudDeCurp.dto";
import { AhorroEntity } from "../entities/ahorro.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { DepositoRepository } from "../repositories/deposito.repository";
import { BanxicoService } from "../services/banxico.services";
import { CurpService } from "../services/curp.services";

export class ClienteBl {

    private clienteRepository: ClienteRepository
    private ahorroRepository: DepositoRepository
    private curpService: CurpService
    private clabeService: BanxicoService

    constructor() {
        this.clienteRepository = new ClienteRepository()
        this.ahorroRepository = new DepositoRepository()
        this.curpService = new CurpService()
        this.clabeService = new BanxicoService()
    }

    async agregarAsync(cliente: ClienteDtoIn): Promise<number> {
        let clienteId = 0
        let ahorroId
        let clabe
        let clienteEntity = cliente.toEntity()
        let ahorro = new AhorroEntity()

        //Obtener el curp
        clienteEntity.curp = await this.generarCurpAsync(cliente)
        clienteEntity.rfc = clienteEntity.curp.substring(0, 13) //mabv8412056ta
        //Registrar cliente
        clienteId = await this.clienteRepository.agregarAsync(clienteEntity)
        //Registrar el ahorro
        ahorro.clienteId = clienteId
        ahorro.clienteGuid = cliente.guid
        ahorro.nombre = "Ahorro chido"
        ahorroId = await this.ahorroRepository.agregarAsync(ahorro)
        //Generar la clabe
        clabe = await this.clabeService.obtenerClabeAsync(ahorroId, clienteEntity)
        ahorro.clabe = clabe
        console.log("Agregando clabe al ahorro")
        await this.ahorroRepository.actualizarAsync(ahorro)

        return clienteId
    }

    async generarCurpAsync(cliente: ClienteDtoIn): Promise<string> {
        const solicitudDeCurp: SolicitudDeCurp = {
            estado: cliente.estadoDeNacimiento,
            fechaDeNacimiento: cliente.fechaDeNacimiento,
            nombres: cliente.nombre,
            primerApellido: cliente.primerApellido,
            segundoApellido: cliente.segundoApellido,
            sexo: cliente.sexo
        }
        const curp = await this.curpService.generarCurp(solicitudDeCurp)

        return curp
    }

    async existeClientePorCurpAsync(cliente:ClienteDtoIn){
        const curp = await this.generarCurpAsync(cliente)

        return await this.clienteRepository.existeAsync(curp)
    }
}