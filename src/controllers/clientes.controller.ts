import { ClienteDtoIn } from "../dtos/cliente.dto";
import { Request, Response } from "express";

export class ClientesController {
  async agregarAsync(req: Request, res: Response) {
    let cliente: ClienteDtoIn = {
      contrasenia: req.body.contrasenia,
      correo: req.body.correo,
      direccion: req.body.direccion,
      estadoDeNacimiento: req.body.estadoDeNacimiento,
      fechaDeNacimiento: req.body.fechaDeNacimiento,
      nombre: req.body.nombre,
      primerApellido: req.body.primerApellido,
      segundoApellido: req.body.segundoApellido,
      telefono: req.body.telefono
    };
    res.status(202).json(cliente);
  }
}
