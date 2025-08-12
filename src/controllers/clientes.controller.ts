import { ClienteBl } from "../bl/cliente.bl";
import { ClienteDtoIn } from "../dtos/cliente.dto";
import { Request, Response } from "express"
import { InicioDeSesionDto } from "../dtos/inicioDeSesion.dto";

export class ClientesController {
  iniciarSesionAsync = async (req: Request, res: Response) => {
    const inicioDeSesionDto = new InicioDeSesionDto(req.body)    

    const token = await this.clienteBl.generarTokenAsync(inicioDeSesionDto)
    if(token)
      res.status(200).json()
    else
      res.status(404).json({mensaje:"Andas buscando, rogandole a Dios no encontrar" })
  }

  agregarAsync = async (req: Request, res: Response) => {
    let cliente = new ClienteDtoIn(req.body)
    const existeCliente = await this.clienteBl.existeClientePorCurpAsync(cliente)
    if (existeCliente)
      return res.status(208).json({ mensaje: "Carnalito con Curp registrada previamente" })

    this.clienteBl.agregarAsync(cliente)

    res.status(202).json(cliente);
  }

  // obtenerAsync(arg0: string, obtenerAsync: any) {
  //   throw new Error("Method not implemented.");
  // }

  private clienteBl: ClienteBl

  constructor() {
    this.clienteBl = new ClienteBl()
  }
}
