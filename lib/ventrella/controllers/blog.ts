import { Router } from 'express';
import { Blog } from '../models/Blog';


export default Router()
  .get('/', (req, res) => {
    Blog
      .find()
      .then(blogs => res.send(blogs));
  });
