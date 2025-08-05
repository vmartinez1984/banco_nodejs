export interface DepositoDto{
    numeroDeCuenta:string
    nombre: string
    clienteGuid:string
    total:number
}

export interface DepositoDtoIn{    
    nombre: string
    clienteGuid:string    
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

export interface MovimientoDtoIn{
    cantidad: number   
    depositoEncodedKey: string
    depositoId: number
    canalEncodedkey: string
    referencia:string
    concepto:string
    encodedKey:string    
}