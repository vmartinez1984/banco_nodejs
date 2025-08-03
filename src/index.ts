import express, {Request, Response} from 'express'
import { IdDto } from './dtos/Id.dto'
import { ClienteRouter } from './routes/cliente.route'

const app = express()
const port = 3000
const clienteRouter = new ClienteRouter()

app.get('/', (req: Request, res: Response)=>{
    let id = new IdDto("Hola mundo")
    
    res.status(200).json({mensaje: "Hola mundo"})
})

app.use("/api", clienteRouter.router)

app.listen(port,()=>{
    console.log("It's alive")
})