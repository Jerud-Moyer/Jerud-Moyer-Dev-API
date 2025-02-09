import { Router } from 'express';
import Announcement from '../models/Announcement';
import { PublicAnnouncement } from '../types/types';


module.exports = Router()
  .post('/', (req, res, next) => {
    Announcement
      .insert(req.body)
      .then((announcement: PublicAnnouncement) => res.send(announcement))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Announcement
      .find()
      .then(announcements => res.send(announcements))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Announcement
      .findById(req.params.id)
      .then(announcement => res.send(announcement))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Announcement
      .update(req.params.id, req.body)
      .then(announcement => res.send(announcement))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Announcement
      .delete(req.params.id)
      .then(announcement => res.send(announcement))
      .catch(next);
  });
