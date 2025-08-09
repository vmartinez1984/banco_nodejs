export interface SpeiOutDto {
    clabeDeOrigen: string
    nombreDelOrdente: string
    bancoOrdenante: string
    clabeDestino: string
    nombreDelBeneficiario: string
    bancoDestino: string
    monto: number
    referencia: string
    concepto: string
    encodedKey: string
}

export class SpeiUpdDto {
    clabeDeOrigen: string
    nombreDelOrdente: string
    bancoOrdenante: string
    clabeDestino: string
    nombreDelBeneficiario: string
    bancoDestino: string
    monto: number
    referencia: string
    concepto: string
    encodedKey: string
    fechaDeTransferencia: Date
    estado: string
    mensaje: string

    constructor(body: any){
        this.clabeDeOrigen = body.clabeDeOrigen || body.ClabeDeOrigen
        this.nombreDelOrdente = body.nombreDelOrdente || body.NombreDelOrdente
        this.bancoOrdenante = body.bancoOrdenante || body.BancoOrdenante
        this.clabeDestino = body.clabeDestino || body.ClabeDestino
        this.nombreDelBeneficiario = body.nombreDelBeneficiario || body.NombreDelBeneficiario
        this.bancoDestino = body.bancoDestino || body.BancoDestino
        this.monto = body.monto || body.Monto
        this.referencia = body.referencia || body.Referencia
        this.concepto = body.concepto   || body.Concepto
        this.encodedKey = body.encodedKey || body.EncodedKey
        this.fechaDeTransferencia = body.fechaDeTransferencia || body.FechaDeTransferencia
        this.estado = body.estado || body.Estado
        this.mensaje = body.mensaje || body.Mensaje
    }
}