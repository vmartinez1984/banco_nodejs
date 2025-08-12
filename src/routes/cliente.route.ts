import express, { Router } from "express"
import { ClientesController } from "../controllers/clientes.controller"
import { ClienteMiddleware } from "../middlewares/cliente.middleware"

export class ClienteRouter {
    private cliente: ClientesController
    private clienteMiddleware: ClienteMiddleware
    router: Router

    constructor() {
        this.cliente = new ClientesController()
        this.clienteMiddleware = new ClienteMiddleware()
        this.router = express.Router()
        this.setUpRoute()
    }

    private setUpRoute() {
        this.router.post("/Clientes", this.cliente.agregarAsync)
        this.router.post("/IniciarSesiones", this.clienteMiddleware.validarInicioDeSesion, this.cliente.iniciarSesionAsync.bind(this.cliente))
        //this.router.post("/IniciarSesiones", this.cliente.iniciarSesionAsync)
        //this.router.get("/", this.cliente.obtenerAsync)
    }
}
