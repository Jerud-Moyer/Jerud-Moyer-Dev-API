import { Router } from 'express';
import paginateResults from '../../utils/paginate-results';
import Character from '../models/Character';
import jpgDelete from '../middleware/jpg-delete';
import ImageService from '../../services/s3-image-service';


export default Router()

  .get('/', (req, res) => {
    Character
      .find()
      .then(characters => res.send(characters));
  })

  .get('/paginated', (req, res) => {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    Character
      .find()
      .then(characters => paginateResults(characters, page, limit))
      .then(characters => res.send(characters));
  })

  .get('/filter', (req, res) => {
    const  [entries] = Object.entries(req.query);
    Character
      .findByColumn(entries[0] as string, entries[1] as string)
      .then(characters => res.send(characters));
  })

  .get('/:id', (req, res) => {
    Character
      .findById(Number(req.params.id))
      .then(character => res.send(character));
  })

  .get('/name/:name', (req, res) => {
    const searchName = req.params.name;
    Character
      .findByName(searchName)
      .then(character => res.send(character));
  })

  .post('/', (req, res) => {
    Character
      .insert(req.body)
      .then(newCharacter => res.send(newCharacter));
  })

  .put('/:secretWord/:id/:oldImageKey', jpgDelete, (req, res) => {
    if(req.params.secretWord === process.env.SECRET_WORD) {
      const { imageUrl, name } = req.body;
      if((req as any).s3Response) {
        ImageService.uploadImage(imageUrl, name)
          .then(newUrl => {
            Character.update(Number(req.params.id), {
              ...req.body,
              imageUrl: newUrl
            })
              .then(updatedCharacter => res.send(updatedCharacter));
          });
      } else {
        Character
          .update(Number(req.params.id), req.body)
          .then(character => res.send(character));
      }
    } else {
      throw new Error('ERROR - I am Nomad');
    }

  })

  .delete('/secretWord/:id', (req, res) => {
    if((req.params as any).secretWord === process.env.SECRET_WORD as string) {
      Character
        .delete(Number(req.params.id))
        .then((character: Character) => res.send(character));
    } else {
      throw new Error('ERROR - You are imperfect, I am Nomad');
    }
  });
