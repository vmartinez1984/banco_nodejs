import express, { NextFunction, Request, Response } from 'express'
import { IdDto } from './dtos/Id.dto'
import { ClienteRouter } from './routes/cliente.route'
import { AhorroRoute } from './routes/ahorro.route'
import { SpeiRoute } from './routes/spei.route'
import { port } from './helpers/config'
import { requestLogger } from './middlewares/log.middleware'
import { errorHandler } from './middlewares/error.middleware'

const app = express()
const clienteRouter = new ClienteRouter()
const depositoRouter = new AhorroRoute()
const speiRouter = new SpeiRoute()

app.use(express.json())
app.use(requestLogger); // Usar middleware de logging
// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log(new Date(), req.method, req.url)
//     next()
// })

app.get('/', (req: Request, res: Response) => {
    let id = new IdDto("Hola mundo")

    res.status(200).json({ mensaje: "Hola mundo" })
})

app.get("/error", (req: Request, res: Response) => {
  throw new Error("Algo salió mal");
});

app.use("/api", clienteRouter.router)
app.use("/api", depositoRouter.router)
app.use("/api", speiRouter.router)
app.use(errorHandler)

app.listen(port, () => {
    console.log("http://localhost:" + port)
    console.log("It's alive")
})