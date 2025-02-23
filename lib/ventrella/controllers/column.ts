import { Router } from 'express';
import { Column } from '../models/Column';
import paginateResults from '../../utils/paginate-results';

export default Router()
  .get('/count/:blogId', (req, res) => {
    Column
      .getCount(Number(req.params.blogId))
      .then(count => res.send(count));
  })
  
  .get('/count-published/:blogId', (req, res) => {
    Column
      .getCountPublished(Number(req.params.blogId))
      .then(count => res.send(count));

  })

  .get('/published', (req, res) => {
    const { page, limit, blogId } = req.query;
    
    Column
      .findPublished(Number(blogId))
      .then(cols => paginateResults(cols, Number(page), Number(limit)))
      .then(cols => res.send(cols));
  })

  .get('/', (req, res) => {
    const { page, limit } = req.query;
    Column
      .find()
      .then(columns => paginateResults(columns, Number(page), Number(limit)))
      .then(cols => res.send(cols));
  })

  .get('/blog', (req, res) => {
    const { page, limit, blogId } = req.query;
    Column
      .findByBlogId(Number(blogId))
      .then(columns => paginateResults(columns, Number(page), Number(limit)))
      .then(cols => res.send(cols));
  })

  .get('/:id', (req, res) => {
    Column
      .findById(Number(req.params.id))
      .then(col => res.send(col));
  })

  .post('/', (req, res) => {
    const column = req.body;
    Column
      .insert(column)
      .then(col => res.send(col));
  })

  .put('/', (req, res) => {
    const column = req.body;
    Column
      .update(column)
      .then(col => res.send(col));
  })

  .delete('/:id', (req, res) => {
    const id = req.params.id;
    Column
      .delete(Number(id))
      .then(col => res.send(col));
  });
