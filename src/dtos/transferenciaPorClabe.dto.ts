export class TranferenciaPorSpeiDto {
    monto: number
    clabeDestino: string
    nombreDelBenificiario: string
    referencia: string
    concepto: string
    encodedkey: string

    constructor(body: any) {
        this.clabeDestino = body.clabeDestino
        this.monto = body.monto
        this.nombreDelBenificiario = body.nombreDelBeneficiario
        this.referencia = body.referencia
        this.concepto = body.concepto
        this.encodedkey = body.encodedKey
    }
}

export interface ClabeInfoDto {
    clabe: string
    banco: string
}