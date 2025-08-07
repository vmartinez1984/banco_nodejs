import { SolicitudDeCurp } from "../dtos/solicitudDeCurp.dto";

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
        let response = await fetch("http://localhost:8081/api/Curp", requestOptions)
        if (response.ok)
            curp = await response.json()
        else
            throw response.json()
        console.log(curp)

        return curp.curp
    }
}