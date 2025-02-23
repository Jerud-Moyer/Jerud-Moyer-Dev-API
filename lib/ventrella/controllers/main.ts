import { Router } from "express";
import blogController from '../controllers/blog'
import columnController from '../controllers/column'

export default Router()
  .use('/blogs', blogController)
  .use('/columns', columnController)
