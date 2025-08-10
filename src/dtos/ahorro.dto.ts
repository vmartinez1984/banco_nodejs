export class AhorroDto {
    numeroDeCuenta: string
    nombre: string
    clienteGuid?: string
    total?: number
    clabe: string

    constructor(
        numeroDeCuenta: string,
        clabe: string,
        nombre: string,
        clienteGuid?: string,
        total?: number
    ) {
        this.numeroDeCuenta = numeroDeCuenta,
        this.nombre = nombre,
        this.clienteGuid = clienteGuid,
        this.total = total
        this.clabe = clabe
    }

}

export interface AhorroDtoIn {
    nombre: string
    clienteGuid: string
}

export interface MovimientoDto {
    cantidad: number
    cantidadIncial: number
    cantidadFinal: number
    depositoEncodedKey: string
    depositoId: number
    canalEncodedkey: string
    referencia: string
    concepto: string
    encodedKey: string
    fechaDeRegistro: string
}

export class MovimientoDtoIn {
    monto: number        
    referencia: string
    concepto: string
    encodedKey: string

    constructor(body: any){
        this.monto = body.monto        
        this.referencia = body.referencia
        this.concepto = body.concepto
        this.encodedKey = body.encodedKey
    }
}