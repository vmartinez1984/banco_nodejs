import { MongoClient } from "mongodb";
import { ClienteEntity } from "../entities/cliente.entity";
import { url, dataBaseName } from "../helpers/config"

export class ClienteRepository {
    private client: MongoClient
    private collection: any
    private collectionName = "clientes"

    constructor() {
        this.client = new MongoClient(url)
    }

    async obtenerPorCorreoAsync(correo: string): Promise<ClienteEntity | undefined> {
        let entities

        await this.connectAsync()
        entities = await this.collection.find({ correo: correo }).toArray()
        console.log(entities)
        if (entities.length == 0)
            return undefined
        return entities[0]
    }

    async existeAsync(curp: string): Promise<boolean> {
        await this.connectAsync()
        const numero = await this.collection.countDocuments({ curp: curp })

        return numero == 0 ? false : true
    }

    async obtenerPorIdAsync(clienteGuid: string): Promise<ClienteEntity> {
        let entities

        await this.connectAsync()
        const regex = /^[0-9]*$/
        if (regex.test(clienteGuid))
            entities = await this.collection.find({ id: Number(clienteGuid) }).toArray()
        else
            entities = await this.collection.find({ guid: clienteGuid }).toArray()
        //console.log(entities)

        return entities[0]
    }

    private async connectAsync() {
        await this.client.connect()
        let db = this.client.db(dataBaseName)
        this.collection = db.collection(this.collectionName)
    }

    async agregarAsync(cliente: ClienteEntity): Promise<number> {
        await this.connectAsync()
        cliente.id = (await this.collection.countDocuments()) + 1;
        console.log("clienteId", cliente.id)
        await this.collection.insertOne(cliente)

        return cliente.id
    }
}