import { Router } from 'express';
import Content from '../models/Content';
import { randomizer } from '../utils/randomizer';
import ImageService from '../../services/s3-image-service';
import jpgDelete from '../middleware/jpg-delete';
import { MemeContentType } from '../types.types';

module.exports = Router()
  .get('/', async(req, res, next) => {
    try {
      const memeArr = randomizer();
      
      const { setting } = await Content.getSetting(memeArr[0]);
      const { image } = await Content.getImage(memeArr[1]);
      const { quote } = await Content.getQuote(memeArr[2]);
      const { author } = await Content.getAuthor(memeArr[3]);
      
      const meme = {
        setting,
        image,
        quote,
        author
      };

      res.send(meme);

    } catch(error) {
      next(error);
    }

  })

  .get('/custom/:memeArr', (req, res) => {
    const { memeArr } = req.params;
    Content.getCustomMeme(JSON.parse(memeArr))
      .then(meme => {
        res.send(meme);
      });
  })

  .get('/content/:content', (req, res) => {
    Content.getContent(req.params.content as MemeContentType)
      .then(content => res.send(content))
      .catch(err => res.json(err));
  })

  .delete('/content/:contentType/:id/:oldImageKey', 
    jpgDelete, 
    (req, res) => {
      const { contentType, id } = req.params;
      Content.deleteContent(contentType as MemeContentType, Number(id))
        .then(content => res.send(content));
    })

  .put('/content/:contentType/:id/:oldImageKey', 
    jpgDelete,  
    (req, res) => {
      const { contentType, id } = req.params;
      const updatedContent = req.body;
      if(contentType === 'images') {
        ImageService.uploadImage(updatedContent.content, 'nerdmeme')
          .then((img: string) => {
            Content.updateContent(
              'images',
              Number(id),
              { ...updatedContent, content: img }
            );
          });
      } else {
        Content.updateContent(contentType as MemeContentType, Number(id), updatedContent)
          .then(content => res.send(content));
      }
    })

  .post('/content/:contentType', (req, res) => {
    const contentType = req.params.contentType;
    if(contentType === 'images') {
      ImageService.uploadImage(req.body.content, 'nerdmeme')
        .then((img: string) => {
          Content.insert(
            'images',
            { ...req.body, content: img } 
          );
        });
    } else {
      Content.insert(contentType as MemeContentType, req.body)
        .then(content => res.send(content));
    }
  });
