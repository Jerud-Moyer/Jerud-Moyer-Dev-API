import { Router, Request, Response } from 'express'
import Fact from '../models/Fact'

export default Router()
.post('/', (req: Request, res: Response, next) => {
  Fact
    .insert(req.body)
    .then(fact => res.send(fact))
    .catch(next);
})

.get('/', (req: Request, res: Response, next) => {
  Fact
    .find()
    .then(facts => res.send(facts))
    .catch(next);
})

.get('/:id', (req: Request, res: Response, next) => {
  Fact
    .findById(Number(req.params.id))
    .then(fact => res.send(fact))
    .catch(next);
})

.delete('/:id', (req: Request, res: Response, next) => {
  Fact
    .delete(Number(req.params.id))
    .then(fact => res.send(fact))
    .catch(next);
})

.put('/:id', (req: Request, res: Response, next) => {
  Fact
    .update(Number(req.params.id), req.body)
    .then(fact => res.send(fact))
    .catch(next);
});
