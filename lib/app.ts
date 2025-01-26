import express, {  Express, Request, Response } from 'express'
import factsController from './portfolio/controllers/fact'


export const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('WE GOT AN EXPRESS TS APP!')
})

app.use('/api/v1/facts', factsController)
