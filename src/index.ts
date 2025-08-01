import express, {Request, Response} from 'express'
import { IdDto } from './Id.dto'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response)=>{
    let id = new IdDto("Hola mundo")
    
    res.status(200).json({mensaje: "Hola mundo"})
})

app.listen(port,()=>{
    console.log("It's alive")
})