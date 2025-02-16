import express, {  Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import mailController from './mailer/controllers/email'
import authController from './auth/controllers/auth'
import factsController from './portfolio/controllers/fact'
import announcementsController from './amphead/controllers/announcements'
import artworksController from './eskart/controllers/artwork'
import seriesController from './eskart/controllers/series'
import memeController from './nerdmeme/controllers/meme'

export const app: Express = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: true,
  credentials: true
}))

app.get('/', (req: Request, res: Response) => {
  res.send('WE GOT AN EXPRESS TS APP!')
})

// mega API for J.M.Dev
app.use('/api/v1/mail', mailController)
app.use('/api/v1/auth', authController)

// portfolio site
app.use('/api/v1/facts', factsController)

// amphead
app.use('/api/v1/amphead/announcements', announcementsController)

// eskart
app.use('/api/v1/eskart/art-works', artworksController)
app.use('/api/v1/eskart/series', seriesController)

// nerdmeme
app.use('/api/v1/nerdmeme/meme', memeController)
