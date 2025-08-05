import { generateGUID } from "../helpers/guid"

export class AhorroEntity {
  clienteId?: number
  clabe?: string
  clienteGuid?: string
  guid: string
  total: number
  nombre?: string
  id: any
  estado?: string

  constructor(clabe?: string, clienteId?: number, clienteGuid?: string, nombre?: string) {
    this.clabe = clabe
    this.clienteId = clienteId
    this.clienteGuid = clienteGuid
    this.total = 0
    this.guid = generateGUID()
    this.nombre = nombre
    this.estado = "Activo"
  }
}