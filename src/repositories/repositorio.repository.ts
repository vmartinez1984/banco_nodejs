import { ClienteRepository } from "./cliente.repository";

export class Repositorio{
    cliente : ClienteRepository

    constructor(){
        this.cliente = new ClienteRepository()
    }
}