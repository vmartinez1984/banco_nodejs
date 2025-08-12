import express, { Router } from "express";
import { AhorroController } from "../controllers/ahorro.controller";

export class AhorroRoute{
    private ahorroController: AhorroController
    router: Router

    constructor(){
        this.ahorroController = new AhorroController()
        this.router = express.Router()
        this.setUpRoute()
    }

    private setUpRoute(){
        this.router.get("/ahorros/:clienteId", this.ahorroController.obtenerAsync)
        this.router.post("/ahorros/:ahorroId/depositos", this.ahorroController.depositarAsync)
        this.router.post("/ahorros/:ahorroId/retiros", this.ahorroController.retirarAsync)
        this.router.post("/ahorros/:ahorroId/transferenciasSpei", this.ahorroController.transferirPorSpeiAsync)
    }
}