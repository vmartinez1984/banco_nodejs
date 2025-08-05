import { MongoClient } from "mongodb";
import { ClienteEntity } from "../entities/cliente.entity";

export class ClienteRepository {
    private client: MongoClient
    private collection: any
    private dataBase = "BancoNode"
    private collectionName = "clientes"

    constructor() {
        let uri = "mongodb://root:123456@localhost:27017/"
        this.client = new MongoClient(uri)
    }

    private async connectAsync(){
        await this.client.connect()
        let db = this.client.db(this.dataBase)
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