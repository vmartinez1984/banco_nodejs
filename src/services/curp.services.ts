import { SolicitudDeCurp } from "../dtos/solicitudDeCurp.dto"
import { baseUrlUtilerias } from '../helpers/config'

export class CurpService {

    async generarCurp(solicitud: SolicitudDeCurp) {
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(solicitud);

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        let curp
        const url = baseUrlUtilerias + "/api/Curp" 
        const response = await fetch(url, requestOptions)
        if (response.ok)
            curp = await response.json()
        else
            throw response.json()
        console.log(curp)

        return curp.curp
    }
}