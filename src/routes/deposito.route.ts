import express, { Router } from "express";
import { DepositoController } from "../controllers/deposito.controller";

export class DepositoRoute{
    private deposito: DepositoController
    router: Router

    constructor(){
        this.deposito = new DepositoController()
        this.router = express.Router()
        this.setUpRoute()
    }

    private setUpRoute(){
        this.router.get("/depositos/:clienteId", this.deposito.obtenerAsync)
    }
}