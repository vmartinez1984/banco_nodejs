import express, { Router } from "express"
import { ClientesController } from "../controllers/clientes.controller"

export class ClienteRouter{
    private cliente: ClientesController
    router: Router

    constructor(){
        this.cliente = new ClientesController()
        this.router = express.Router()
        this.setUpRoute()
    }

    private setUpRoute(){
        this.router.post("/Clientes", this.cliente.agregarAsync)
        //this.router.post("/iniciarSesiones", this.cliente.iniciarSesionAsync)
        //this.router.get("/", this.cliente.obtenerAsync)
    }
}
