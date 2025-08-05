export class DepositoEntity{
    clienteId?: number
    clabe?: string
    clienteGuid?: string 
    guid: string
    total: number
    nombre?: string
    id: any
    estado?: string

    constructor(clabe?: string, clienteId?: number, clienteGuid?: string, nombre? : string){
        this.clabe = clabe
        this.clienteId = clienteId
        this.clienteGuid = clienteGuid
        this.total =0
        this.guid = this.generateGUID()
        this.nombre = nombre
        this.estado = "Activo"
    }

    generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}