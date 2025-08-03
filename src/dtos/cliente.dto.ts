export interface ClienteDtoIn {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaDeNacimiento: string;
  estadoDeNacimiento: string;
  telefono: string;
  correo: string;
  contrasenia: string;
  direccion: DireccionDto;
}

export interface DireccionDto {
  calle_numero: string;
  referencia: string;
  colonia: string;
  municipio: string;
  estado: string;
  coordenadasGps: string;
}
