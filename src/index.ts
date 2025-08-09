import express, { Request, Response } from 'express'
import { IdDto } from './dtos/Id.dto'
import { ClienteRouter } from './routes/cliente.route'
import { AhorroRoute } from './routes/ahorro.route'
import { SpeiRoute } from './routes/spei.route'

const app = express()
const port = 8000
const clienteRouter = new ClienteRouter()
const depositoRouter = new AhorroRoute()
const speiRouter = new SpeiRoute()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    let id = new IdDto("Hola mundo")

    res.status(200).json({ mensaje: "Hola mundo" })
})

app.use("/api", clienteRouter.router)
app.use("/api", depositoRouter.router)
app.use("/api", speiRouter.router)

app.listen(port, () => {
    console.log("http://localhost:" + port)
    console.log("It's alive")
})