import { SpeiOutDto } from "../dtos/spei.dto"
import { ClabeInfoDto } from "../dtos/transferenciaPorClabe.dto"
import { ClienteEntity } from "../entities/cliente.entity"

export class BanxicoService {
    private plaza: string
    private numero: string
    private urlBase: string

    constructor() {
        this.plaza = "180" //Ciudad de México
        this.numero = "009" //Banobras
        this.urlBase = "http://localhost:83"
    }

    async obtenerClabeAsync(ahorroId: number, cliente: ClienteEntity): Promise<string> {
        console.log("Generando clabe")
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "plaza": this.plaza,
            "numeroAbm": this.numero,
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

        let response = await fetch("http://localhost:83/api/Speis/Clabes/PersonasFisicas", requestOptions)
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
        const myHeaders = new Headers();
        myHeaders.append("accept", "text/plain");

        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(this.urlBase + "/api/Speis/" + clabeDestino, requestOptions)
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

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(this.urlBase + "/api/Speis/Transferencias", requestOptions)
        if (response.ok) {
            const data = await response.json()
            console.log("Respuesta banxico",data)

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