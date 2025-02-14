import { Router } from 'express';
import imageUpload from '../middleware/image-upload';
import deleteJpg from '../middleware/jpg-delete';
import updatePublicId from '../middleware/image-name-update';
import Artwork from'../models/Artwork';
import ArtWorkService from'../services/artwork-service';

export default Router()
  .get('/', (req, res, next) => {

    Artwork.getAllWorks()
      .then(works => res.send(works))
      .catch(next);
  })

  .put('/featured', (req, res, next) => {

    const updatedFeatured = ArtWorkService.updateFeatured(req.body.featureUpdateImages);
    res.send({
      updatedFeatured
    })
  })

  .post('/', imageUpload, (req, res) => {

    const imageData = req.body.imageData;
    Artwork.insert(imageData)
      .then(val => res.send(val))
      .catch(err => console.log(err));
  })

  .put('/:id', updatePublicId, (req, res) => {

    const imageInfo = req.body.data.image;
    const id = Number(req.params.id);
    Artwork.updateArtWork(id, imageInfo)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  })

  .delete('/', deleteJpg,  (req, res) => {

    ArtWorkService.deleteArtWorks(req.body.images)
      .then(deletedImages => res.send(deletedImages))
      .catch(err => console.log(err));
  });
