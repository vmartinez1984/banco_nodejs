import express, {Request, Response} from 'express'
import { IdDto } from './dtos/Id.dto'
import { ClienteRouter } from './routes/cliente.route'
import { DepositoRoute } from './routes/deposito.route'

const app = express()
const port = 8000
const clienteRouter = new ClienteRouter()
const depositoRouter = new DepositoRoute()

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    let id = new IdDto("Hola mundo")
    
    res.status(200).json({mensaje: "Hola mundo"})
})

app.use("/api", clienteRouter.router)
app.use("/api", depositoRouter.router)

app.listen(port,()=>{
    console.log("It's alive")
})