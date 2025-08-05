import { ClienteEntity } from "../entities/cliente.entity"

export class ClabeService {

    obtenerClabeAsync(ahorroId: number, cliente: ClienteEntity): string {
        const myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "plaza": "180",
            "numeroAbm": "166",
            "numeroDeCuenta": ahorroId,
            "telefono": cliente.telefono,
            "correo": cliente.correo,
            "personaFisica": {
                "nombre": cliente.nombre,
                "primerApellido": cliente.primerApellido,
                "segundoApellido": cliente.segundoApellido,
                "fechaDeNacimiento": cliente.fechaDeNacimiento,
                "curp": "MABV841205HHGR",
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
            "rfc": "mabv8412056ta"
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:5112/api/Speis/Clabes/PersonasFisicas", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        return ''
    }
}