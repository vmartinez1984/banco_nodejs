import { MongoClient } from "mongodb";
import { AhorroEntity } from "../entities/ahorro.entity";

export class DepositoRepository {

    async obtenerPorIdAsync(depositoId: string): Promise<AhorroEntity> {
        let entities

        await this.connectAsync()
        if (parseInt(depositoId))
            entities = await this.collection.find({ id: Number(depositoId) }).toArray()
        else
            entities = await this.collection.find({ guid: depositoId }).toArray()

        return entities[0]
    }

    private client: MongoClient
    private collection: any
    private dataBase = "BancoNode"
    private collectionName = "depositos"

    constructor() {
        let uri = "mongodb://root:123456@localhost:27017/"
        this.client = new MongoClient(uri)
        //this.connectAsync()
    }

    private async connectAsync() {
        await this.client.connect()
        let db = this.client.db(this.dataBase)
        this.collection = db.collection(this.collectionName)
    }

    async obtenerPorClienteIdAsync(clienteId: string): Promise<AhorroEntity[]> {
        let entities

        await this.connectAsync()
        if (parseInt(clienteId))
            entities = await this.collection.find({ clienteId: Number(clienteId) }).toArray()
        else
            entities = await this.collection.find({ clienteGuid: clienteId }).toArray()
        //console.log("entities", entities)

        return entities
    }

    async actualizarAsync(entity: AhorroEntity) {
        let query = {id: entity.id}
        await this.collection.updateOne(query,{$set: entity})
    }

    async agregarAsync(deposito: AhorroEntity): Promise<number> {
        await this.connectAsync()

        deposito.id = (await this.collection.countDocuments()) + 1;
        console.log("depositoID", deposito.id)
        this.collection.insertOne(deposito)

        return deposito.id
    }
}