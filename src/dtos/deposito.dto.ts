export interface DepositoDto{
    numeroDeCuenta:string
    nombre: string
    clienteGuid:string
    total:number
}

export interface MovimientoDto{
    cantidad: number
    cantidadIncial: number
    cantidadFinal: number
    depositoEncodedKey: string
    depositoId: number
    canalEncodedkey: string
    referencia:string
    concepto:string
    encodedKey:string
    fechaDeRegistro:string
}