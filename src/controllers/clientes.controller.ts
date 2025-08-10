import { ClienteBl } from "../bl/cliente.bl";
import { ClienteDtoIn } from "../dtos/cliente.dto";
import { Request, Response } from "express"

export class ClientesController {
  private clienteBl: ClienteBl

  constructor() {
    this.clienteBl = new ClienteBl()
  }

  agregarAsync = async (req: Request, res: Response) => {
    let cliente = new ClienteDtoIn(req.body)
    const existeCliente = await this.clienteBl.existeClientePorCurpAsync(cliente)
    if(existeCliente)
      return res.status(208).json({mensaje: "Carnalito con Curp registrada previamente"})

    this.clienteBl.agregarAsync(cliente)

    res.status(202).json(cliente);
  }

  // obtenerAsync(arg0: string, obtenerAsync: any) {
  //   throw new Error("Method not implemented.");
  // }

  // iniciarSesionAsync(arg0: string, iniciarSesionAsync: any) {
  //   throw new Error("Method not implemented.");
  // }

}
