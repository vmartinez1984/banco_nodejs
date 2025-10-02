import { ClienteDtoIn } from "../dtos/cliente.dto";
import { IdDto } from "../dtos/Id.dto";
import { InicioDeSesionDto } from "../dtos/inicioDeSesion.dto";
import { SolicitudDeCurp } from "../dtos/solicitudDeCurp.dto";
import { TokenDto } from "../dtos/token.dto";
import { AhorroEntity } from "../entities/ahorro.entity";
import { ClienteRepository } from "../repositories/cliente.repository";
import { AhorroRepository } from "../repositories/ahorro.repository";
import { Repositorio } from "../repositories/repositorio.repository";
import { BanxicoService } from "../services/banxico.services";
import { CurpService } from "../services/curp.services";
import  jwt  from "jsonwebtoken"
const secret = "VineAComalaABuscarAMiPadreUnTalPedroParamo"

export class ClienteBl {

    async generarTokenAsync(inicioDeSesion: InicioDeSesionDto): Promise<TokenDto | undefined> {
        var cliente = await this.repositorio.cliente.obtenerPorCorreoAsync(inicioDeSesion.correo)
        if(cliente == undefined)
            return undefined
        if(cliente.contrasenia != inicioDeSesion.contrasenia)
            return undefined
        const payload={
            nombre: cliente.nombre + " " +cliente.primerApellido,
            encodedkey : cliente.guid
        }
        const token = jwt.sign(payload,secret, {expiresIn: "20m"} )
        const tokenDto: TokenDto = {
            token,
            fecha: new Date()
        }
        return tokenDto
    }

    private clienteRepository: ClienteRepository
    private ahorroRepository: AhorroRepository
    private curpService: CurpService
    private clabeService: BanxicoService
    private repositorio: Repositorio

    constructor() {
        this.clienteRepository = new ClienteRepository()
        this.ahorroRepository = new AhorroRepository()
        this.curpService = new CurpService()
        this.clabeService = new BanxicoService()
        this.repositorio = new Repositorio()
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