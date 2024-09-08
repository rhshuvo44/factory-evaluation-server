import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
import router from './app/route'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// application routes
app.use('/api', router)

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Factory Evaluation')
})
//Not Found
app.use(notFound)

app.use(globalErrorHandler)
export default app
