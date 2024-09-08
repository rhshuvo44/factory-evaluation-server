import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'
import router from './app/route'
const app: Application = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// application routes
app.use('/api', router)

// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Factory Evaluation')
})
//Not Found
app.use(notFound)
export default app