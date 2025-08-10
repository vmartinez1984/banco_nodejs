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

    async existeAsync(curp: string) {
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