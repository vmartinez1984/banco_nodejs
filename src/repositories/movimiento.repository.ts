import { MongoClient } from "mongodb"
import { MovimientoEntity } from "../entities/movimiento.entity"
import { url, dataBaseName } from "../helpers/config"

export class MovimientoRepository {

    private client: MongoClient
    private collection: any
    private collectionName = "movimientos"

    constructor() {        
        this.client = new MongoClient(url)
    }

    private async connectAsync() {
        await this.client.connect()
        let db = this.client.db(dataBaseName)
        this.collection = db.collection(this.collectionName)
    }

    async agregarAsync(movimiento: MovimientoEntity): Promise<number>{
        await this.connectAsync()
        movimiento.id = (await this.collection.countDocuments()) + 1;
        this.collection.insertOne(movimiento)

        return movimiento.id
    }
}