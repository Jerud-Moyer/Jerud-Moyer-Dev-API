import { NextFunction, Request, Response } from 'express';
import ImageService from '../../services/s3-image-service';

export default function(req: Request, res: Response, next: NextFunction) {
  const oldImageUrl = `${req.params.oldImageKey}.jpg`;
  if(
    req.params.contentType === 'images' && 
    oldImageUrl !== req.body.content
  ) {
    ImageService.deleteImage(oldImageUrl, 'nerdmeme')
      .then(res => {
        (req as any).s3Response = res;
        next();
      });
  } else {
    next();
  }
};
