import { ClienteEntity } from "../entities/cliente.entity";
import { generateGUID } from "../helpers/guid";

export class ClienteDtoIn {

  nombre: string
  primerApellido: string
  segundoApellido: string
  fechaDeNacimiento: Date
  estadoDeNacimiento: string
  telefono: string
  correo: string
  contrasenia: string
  guid: string
  sexo: string
  //direccion: DireccionDto;

  constructor(body: any) {
    this.contrasenia = body.contrasenia
    this.correo = body.correo
    this.estadoDeNacimiento = body.estadoDeNacimiento
    this.fechaDeNacimiento = body.fechaDeNacimiento
    this.nombre = body.nombre
    this.primerApellido = body.primerApellido
    this.segundoApellido = body.segundoApellido
    this.telefono = body.telefono
    this.contrasenia = body.contrasenia
    this.sexo = body.sexo
    this.guid = generateGUID()
  }

  toEntity(): ClienteEntity {
    let entity: ClienteEntity = {
      contrasenia: this.contrasenia,
      correo: this.correo,
      estadoDeNacimiento: this.estadoDeNacimiento,
      fechaDeNacimiento: this.fechaDeNacimiento,
      id: 0,
      nombre: this.nombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      telefono: this.telefono,
      guid: this.guid
    }

    return entity
  }
}

export interface DireccionDto {
  calle_numero: string;
  referencia: string;
  colonia: string;
  municipio: string;
  estado: string;
  coordenadasGps: string;
}