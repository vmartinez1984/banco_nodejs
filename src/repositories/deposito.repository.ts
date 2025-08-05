import { MongoClient } from "mongodb";
import { DepositoEntity } from "../entities/deposito.entity";

export class DepositoRepository {
    
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

    actualizarAsync(depositoEntity: DepositoEntity) {
        throw new Error("Method not implemented.");
    }

    async agregarAsync(deposito: DepositoEntity): Promise<number> {
        await this.connectAsync()

        deposito.id = (await this.collection.countDocuments()) + 1;
        console.log("depositoID",deposito.id)
        this.collection.insertOne(deposito)

        return deposito.id
    }
}