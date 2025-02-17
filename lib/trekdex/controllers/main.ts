import { Router } from "express"
import charactersController from './character'
import docsController from './docs'

export default Router()
  .use('/characters', charactersController)
  .use('/docs', docsController)
