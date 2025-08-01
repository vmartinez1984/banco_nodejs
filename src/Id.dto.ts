export class IdDto {

    constructor(mensaje: string) {
        this.mensaje = mensaje
    }

    public id: string
    public encodedkey: string
    public mensaje: string
}