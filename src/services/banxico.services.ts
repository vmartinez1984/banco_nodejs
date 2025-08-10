import { SpeiOutDto } from "../dtos/spei.dto"
import { ClabeInfoDto } from "../dtos/transferenciaPorClabe.dto"
import { ClienteEntity } from "../entities/cliente.entity"
import { baseUrlBanxico, numeroAbm, plaza } from '../helpers/config'

export class BanxicoService {
    private urlBase: string

    constructor() {
        this.urlBase = baseUrlBanxico
    }

    async obtenerClabeAsync(ahorroId: number, cliente: ClienteEntity): Promise<string> {
        console.log("Generando clabe")
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "plaza": plaza,
            "numeroAbm": numeroAbm,
            "numeroDeCuenta": ahorroId.toString(),
            "telefono": cliente.telefono,
            "correo": cliente.correo,
            "personaFisica": {
                "nombre": cliente.nombre,
                "primerApellido": cliente.primerApellido,
                "segundoApellido": cliente.segundoApellido,
                "fechaDeNacimiento": cliente.fechaDeNacimiento,
                "curp": cliente.curp,
                "tipoDeIdentificacion": "INE",
                "numeroDeIdentificacion": "2530",
                "direccion": {
                    "calle_Numero": "Bolivar 438 204",
                    "colonia": "Obrera",
                    "codigoPostal": "06800",
                    "municipio": "Cuauhtemoc",
                    "entidadFederativa": "Ciudad de México",
                    "coordenadasGps": "4564,4564"
                }
            },
            "rfc": cliente.rfc
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let response = await fetch(this.urlBase + "/api/Speis/Clabes/PersonasFisicas", requestOptions)
        if (response.ok) {
            const clabeDto = await response.json()
            console.log(clabeDto)

            return clabeDto.clabe
        }
        else {
            const result = await response.text()
            console.log(response.status)
            console.log(result)

            throw result
        }

    }

    async obtenerClabeInfoAsync(clabeDestino: string): Promise<ClabeInfoDto | null> {
        const url = this.urlBase + "/api/Speis/" + clabeDestino
        const myHeaders = new Headers();
        myHeaders.append("accept", "text/plain");

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(url, requestOptions)
        if (response.ok) {
            const clabeInfoDto = await response.json()

            return clabeInfoDto
        }

        return null
    }

    async SpeiOutAsync(spei: SpeiOutDto) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(spei);
        console.log("SpeiOutDto", raw)
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(this.urlBase + "/api/Speis/Transferencias", requestOptions)
        if (response.ok) {
            const data = await response.json()
            console.log("Respuesta banxico", data)

            //return clabeDto.clabe
        }
        else {
            const result = await response.json()
            console.log(response.status)
            console.log(result)

            throw result
        }
    }
}