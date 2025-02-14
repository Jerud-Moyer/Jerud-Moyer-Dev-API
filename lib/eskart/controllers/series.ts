import { Router } from 'express';
import Series from '../models/Series';
import deleteJpg from '../middleware/jpg-delete';
import ArtWorkService from '../services/artwork-service';

module.exports = Router()
  .get('/', (req, res, next) => {
    Series.getAllSeries()
      .then(series => res.send(series))
      .catch(next);
  })

  .post('/', (req, res) => {
    Series.insert(req.body.series)
      .then(series => res.send(series))
      .catch(err => res.status(500).json(err));
  })

  .post('/update', (req, res) => {
    Series.updateSeries(req.body.series)
      .then(series => res.send(series))
      .catch(err => res.status(500).json(err));
  })

  .delete('/', deleteJpg, (req, res) => {
    ArtWorkService.deleteArtWorks(req.body.images)
      .then(images => {
        Series.deleteSeries((req.body as any).series.id)
          .then(series => res.send({
            series,
            images
          }));
      });
  });
