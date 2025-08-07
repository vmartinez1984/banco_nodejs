export interface SolicitudDeCurp{
    nombres: string
    primerApellido:string
    segundoApellido:string
    fechaDeNacimiento: Date
    sexo: string
    estado: string
}

export const Sexo = {
    Mujer: "m",
    Hombre: "h"
}