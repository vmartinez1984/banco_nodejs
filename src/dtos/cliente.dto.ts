import { ClienteEntity } from "../entities/cliente.entity";

export class ClienteDtoIn { 

  nombre: string
  primerApellido: string
  segundoApellido: string
  fechaDeNacimiento: string
  estadoDeNacimiento: string
  telefono: string
  correo: string
  contrasenia: string
  guid: string
  //direccion: DireccionDto;

  constructor(body: any) {
    this.contrasenia = body.contrasenia,
      this.correo = body.correo,
      //this.direccion= body.direccion,
      this.estadoDeNacimiento = body.estadoDeNacimiento,
      this.fechaDeNacimiento = body.fechaDeNacimiento,
      this.nombre = body.nombre,
      this.primerApellido = body.primerApellido,
      this.segundoApellido = body.segundoApellido,
      this.telefono = body.telefono
    this.contrasenia = body.contrasenia
    this.guid = this.generateGUID()
  }  

  toEntity(): ClienteEntity {
    let entity: ClienteEntity = {
      contrasenia : this.contrasenia,
      correo: this.correo,
      estadoDeNacimiento: this.estadoDeNacimiento,
      fechaDeNacimiento: this.fechaDeNacimiento,
      id:0,
      nombre: this.nombre,
      primerApellido: this.primerApellido,
      segundoApellido: this.segundoApellido,
      telefono: this.telefono,
      guid: this.guid
    }

    return entity
  }

  generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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