import express, { Router } from "express";
import { SpeiController } from "../controllers/speis.controller";

export class SpeiRoute{
    private speiController: SpeiController
    router: Router

    constructor(){
        this.speiController = new SpeiController()
        this.router = express.Router()
        this.setUpRoute()
    }

    private setUpRoute(){
        this.router.put("/speis/", this.speiController.actualizarEstadoDelSpei)        
    }
}