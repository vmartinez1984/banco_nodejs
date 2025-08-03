import express, { Router } from "express"
import { ClientesController } from "../controllers/clientes.controller"

export class ClienteRouter{
    private cliente: ClientesController
    router: Router

    constructor(){
        this.cliente = new ClientesController()
        this.router = express.Router()
    }

    private setUpRoute(){
        this.router.post("/", this.cliente.agregarAsync)
    }
}
