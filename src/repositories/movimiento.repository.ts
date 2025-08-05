import { MongoClient } from "mongodb"
import { MovimientoEntity } from "../entities/movimiento.entity"

export class MovimientoRepository {

    private client: MongoClient
    private collection: any
    private dataBase = "BancoNode"
    private collectionName = "movimientos"

    constructor() {
        let uri = "mongodb://root:123456@localhost:27017/"
        this.client = new MongoClient(uri)
    }

    private async connectAsync() {
        await this.client.connect()
        let db = this.client.db(this.dataBase)
        this.collection = db.collection(this.collectionName)
    }

    async agregarAsync(movimiento: MovimientoEntity): Promise<number>{
        await this.connectAsync()
        movimiento.id = (await this.collection.countDocuments()) + 1;
        this.collection.insertOne(movimiento)

        return movimiento.id
    }
}