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
        this.clabeDeOrigen = body.clabeDeOrigen
        this.nombreDelOrdente = body.nombreDelOrdente
        this.bancoOrdenante = body.bancoOrdenante
        this.clabeDestino = body.clabeDestino
        this.nombreDelBeneficiario = body.nombreDelBeneficiario
        this.bancoDestino = body.bancoDestino
        this.monto = body.monto
        this.referencia = body.referencia
        this.concepto = body.concepto
        this.encodedKey = body.encodedKey
        this.fechaDeTransferencia = body.fechaDeTransferencia
        this.estado = body.estado
        this.mensaje = body.mensaje
    }
}