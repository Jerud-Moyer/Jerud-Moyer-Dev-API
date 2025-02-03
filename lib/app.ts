import express, {  Express, Request, Response } from 'express'
import factsController from './portfolio/controllers/fact'
import mailController from './mailer/controllers/email'
import cors from 'cors';


export const app: Express = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('WE GOT AN EXPRESS TS APP!')
})

app.use('/api/v1/facts', factsController)

app.use('/api/v1/mail', mailController)
